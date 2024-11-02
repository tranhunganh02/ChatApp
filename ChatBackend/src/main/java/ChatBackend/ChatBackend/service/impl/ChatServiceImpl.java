package ChatBackend.ChatBackend.service.impl;

import ChatBackend.ChatBackend.entity.Chat;
import ChatBackend.ChatBackend.entity.Message;
import ChatBackend.ChatBackend.entity.User;
import ChatBackend.ChatBackend.exception.DataNotFoundException;
import ChatBackend.ChatBackend.exception.InvalidParamException;
import ChatBackend.ChatBackend.payload.request.AddUserToGroupRequest;
import ChatBackend.ChatBackend.payload.request.GroupChatRequest;
import ChatBackend.ChatBackend.payload.request.RenameGroupRequest;
import ChatBackend.ChatBackend.payload.response.ChatResponse;
import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.repository.ChatRepository;
import ChatBackend.ChatBackend.repository.MessageRepository;
import ChatBackend.ChatBackend.repository.UserRepository;
import ChatBackend.ChatBackend.security.JwtTokenProvider;
import ChatBackend.ChatBackend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @Override
    public ChatResponse createGroup(GroupChatRequest req, String token) {
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người dùng không tồn tại!"));

        Chat chat = new Chat();
        chat.setName(req.getName());
        chat.setIsGroup(true);

        Set<User> members = new HashSet<>();
        members.add(user);
        for (Integer userId : req.getUserIds()) {
            Optional<User> member = userRepository.findById(userId);
            if (member.isPresent()) {
                members.add(member.get());
            }
        }
        if (members.size() < 3) {
            throw new InvalidParamException("Nhóm phải có ít nhất 3 thành viên!");
        }

        chat.setMembers(members);
        chat.setUser(user);
        chatRepository.save(chat);

        ChatResponse response = new ChatResponse().fromChat(chat);
        List<Message> messages = messageRepository.findLastMessagesByChatId(chat.getId());
        response.setLastMessage(messages.isEmpty() ? null : new MessageResponse().fromMessage(messages.get(0)));
        return response;
    }

//    @Override
//    public Chat createSingleChat(String token, SingleChatRequest request) {
//        String email = jwtTokenProvider.getEmail(token.substring(7));
//        User user1 = userRepository.findByEmail(email)
//                .orElseThrow(() -> new DataNotFoundException("Người nhắn không tồn tại!"));
//
//        User user2 = userRepository.findById(request.getUserId())
//                .orElseThrow(() -> new DataNotFoundException("Người nhận không tồn tại!"));
//
//        if (user1.getId().equals(user2.getId())) {
//            throw new InvalidParamException("Không thể tạo chat với chính mình!");
//        }
//
//        Chat existingChat = chatRepository.findSingleChatByUser(user1, user2);
//
//        if (existingChat != null) {
//            return existingChat;
//        }
//
//        Chat chat = new Chat();
//        chat.setUser(user1);
//
//        Set<User> members = new HashSet<>();
//        members.add(user1);
//        members.add(user2);
//
//        chat.setMembers(members);
//        chat.setIsGroup(false);
//
//        return chatRepository.save(chat);
//    }

    @Override
    public ChatResponse findChatById(Integer chatId, String token) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Chat không tồn tại!"));
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người dùng không tồn tại!"));

        if (!chat.getMembers().contains(user)) {
            throw new InvalidParamException("Bạn không phải là thành viên của chat!");
        }

        ChatResponse response = new ChatResponse().fromChat(chat);
        List<Message> messages = messageRepository.findLastMessagesByChatId(chat.getId());
        response.setLastMessage(messages.isEmpty() ? null : new MessageResponse().fromMessage(messages.get(0)));
        return response;
    }

    @Override
    public List<ChatResponse> findAllChats(String token) {
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người dùng không tồn tại!"));

        List<Chat> chats = chatRepository.findChatByMembers(user);
        List<ChatResponse> chatResponses = new ArrayList<>();
        for (Chat chat : chats) {
            ChatResponse response = new ChatResponse().fromChat(chat);
            List<Message> messages = messageRepository.findLastMessagesByChatId(chat.getId());
            response.setLastMessage(messages.isEmpty() ? null : new MessageResponse().fromMessage(messages.get(0)));
            chatResponses.add(response);
        }

        return chatResponses;
    }

    @Override
    public ChatResponse addUserToGroup(String token, AddUserToGroupRequest request, Integer chatId) {
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người dùng không tồn tại!"));

        Chat existingChat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));

        if (!existingChat.getMembers().contains(user)) {
            throw new InvalidParamException("Bạn không phải là thành viên của nhóm!");
        }

        if (!existingChat.getIsGroup()) {
            throw new InvalidParamException("Chat không phải là nhóm!");
        }

        Set<User> members = existingChat.getMembers();
        for (Integer userId : request.getUserIds()) {
            Optional<User> member = userRepository.findById(userId);
            if (member.isPresent()) {
                members.add(member.get());
            }
        }

        if (members.size() < 3) {
            throw new InvalidParamException("Nhóm phải có ít nhất 3 thành viên!");
        }

        chatRepository.save(existingChat);

        ChatResponse response = new ChatResponse().fromChat(existingChat);
        List<Message> messages = messageRepository.findLastMessagesByChatId(existingChat.getId());
        response.setLastMessage(messages.isEmpty() ? null : new MessageResponse().fromMessage(messages.get(0)));

        return response;
    }

    @Override
    public ChatResponse renameGroup(Integer chatId, RenameGroupRequest request, String token) {
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người nhắn không tồn tại!"));
        Chat existingChat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));
        if (!existingChat.getMembers().contains(user)) {
            throw new InvalidParamException("Bạn không phải là thành viên của nhóm!");
        }

        existingChat.setName(request.getGroupName());

        chatRepository.save(existingChat);
        ChatResponse response = new ChatResponse().fromChat(existingChat);
        List<Message> messages = messageRepository.findLastMessagesByChatId(existingChat.getId());
        response.setLastMessage(messages.isEmpty() ? null : new MessageResponse().fromMessage(messages.get(0)));

        return response;
    }

    @Override
    public ChatResponse removeFromGroup(Integer chatId, Integer userId, String token) {
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người nhắn không tồn tại!"));
        Chat existingChat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));
        if (!existingChat.getUser().equals(user)) {
            throw new InvalidParamException("Bạn không phải là chủ nhóm!");
        }

        Set<User> members = existingChat.getMembers();
        User userToRemove = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Người dùng không tồn tại!"));
        if (members.size() < 4) {
            throw new InvalidParamException("Nhóm phải có ít nhất 3 thành viên!");
        }
        members.remove(userToRemove);

        chatRepository.save(existingChat);
        ChatResponse response = new ChatResponse().fromChat(existingChat);
        List<Message> messages = messageRepository.findLastMessagesByChatId(existingChat.getId());
        response.setLastMessage(messages.isEmpty() ? null : new MessageResponse().fromMessage(messages.get(0)));
        return response;
    }

    @Override
    public void deleteChat(Integer chatId, String token) {
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người dùng không tồn tại!"));
        Chat existingChat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));

        if ((existingChat.getUser().getId().equals(user.getId()) && !existingChat.getIsGroup())) {
            chatRepository.delete(existingChat);
        }

        throw new InvalidParamException("Không thể xoá nhóm!");
    }

    @Override
    public ChatResponse uploadGroupChatImage(Integer chatId, String token, MultipartFile file) throws IOException {
        Chat existingChat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));

        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người dùng không tồn tại!"));

        if (!existingChat.getMembers().contains(user)) {
            throw new InvalidParamException("Bạn không phải là thành viên của nhóm!");
        }

        if (file.getSize() > 10 * 1024 * 1024) {
            throw new InvalidParamException("Kích thước file cần nhỏ hơn 10MB!");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new InvalidParamException("File không phải là ảnh!");
        }

        if (existingChat.getChatImage() != null) {
            deleteOldImage(existingChat.getChatImage());
        }

        String fileName = storeFile(file);

        existingChat.setChatImage(fileName);
        chatRepository.save(existingChat);

        ChatResponse response = new ChatResponse().fromChat(existingChat);
        List<Message> messages = messageRepository.findLastMessagesByChatId(existingChat.getId());
        response.setLastMessage(messages.isEmpty() ? null : new MessageResponse().fromMessage(messages.get(0)));

        return response;
    }

    private String storeFile(MultipartFile file) throws IOException {
        if (!isImageFile(file) || file.getOriginalFilename() == null) {
            throw new InvalidParamException("File không phải là ảnh!");
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String uniqueFilename = UUID.randomUUID().toString() + "_" + fileName;

        java.nio.file.Path uploadDir = Paths.get("uploads/groups");
        if(!Files.exists(uploadDir)){
            Files.createDirectories(uploadDir);
        }
        java.nio.file.Path destination = Paths.get(uploadDir.toString(),uniqueFilename);
        Files.copy(file.getInputStream(),destination, StandardCopyOption.REPLACE_EXISTING);
        return  "uploads/groups/" + uniqueFilename;
    }

    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    private void deleteOldImage(String imagePath) {
        java.nio.file.Path oldImagePath = Paths.get(imagePath);
        try {
            if (Files.exists(oldImagePath)) {
                Files.delete(oldImagePath);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
