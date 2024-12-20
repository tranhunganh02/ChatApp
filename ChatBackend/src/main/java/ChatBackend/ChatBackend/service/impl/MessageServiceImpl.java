package ChatBackend.ChatBackend.service.impl;

import ChatBackend.ChatBackend.entity.*;
import ChatBackend.ChatBackend.exception.DataNotFoundException;
import ChatBackend.ChatBackend.exception.InvalidParamException;
import ChatBackend.ChatBackend.payload.response.CallResponse;
import ChatBackend.ChatBackend.payload.response.FileResponse;
import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.repository.*;
import ChatBackend.ChatBackend.security.JwtTokenProvider;
import ChatBackend.ChatBackend.service.MessageService;
import ChatBackend.ChatBackend.websocket.dto.GroupTextSendDTO;
import ChatBackend.ChatBackend.websocket.dto.SingleTextSendDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    ChatRepository chatRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    FileRepository fileRepository;

    @Autowired
    CallRepository callRepository;

    private final String UPLOAD_DIR = "uploads";

    private static final Logger logger = LoggerFactory.getLogger(MessageServiceImpl.class);

    @Override
    public MessageResponse getMessageById(Integer id) {
        
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Tin nhắn không tồn tại!"));
        MessageResponse response = new MessageResponse();
        response = response.fromMessage(message);
        switch (message.getType()) {
            case TEXT:
                response.setContent(message.getContent());
                return response;
            case FILE:
                List<File> files = fileRepository.findByMessageId(message.getId());
                List<FileResponse> fileResponses = new ArrayList<>();
                for (File file : files) {
                    FileResponse fileResponse = new FileResponse().fromFile(file);
                    fileResponses.add(fileResponse);
                }
                response.setFileResponses(fileResponses);
                return response;
            case CALL:
                Call call = callRepository.findByMessageId(message.getId());
                CallResponse callResponse = new CallResponse().fromCall(call);
                response.setCallResponse(callResponse);
        }
        return response;
    }

    @Override
    public MessageResponse sendSingleTextMessage(SingleTextSendDTO msg, String senderId) {
        User user1 = userRepository.findById(Integer.parseInt(senderId))
                .orElseThrow(() -> new DataNotFoundException("Người gửi không tồn tại!"));
        User user2 = userRepository.findById(msg.getRecipientId())
                .orElseThrow(() -> new DataNotFoundException("Người nhận không tồn tại!"));
        if (user1.getId().equals(user2.getId())) {
            throw new InvalidParamException("Không thể nhắn tin với chính mình!");
        }

        Chat chat = chatRepository.findSingleChatByUser(user1, user2);
        if (chat == null) {
            chat = new Chat();
            chat.setUser(user1);

            Set<User> members = new HashSet<>();
            members.add(user1);
            members.add(user2);

            chat.setMembers(members);
            chat.setIsGroup(false);

            chat = chatRepository.save(chat);
        }

        Message message = new Message();
        message.setChat(chat);
        message.setContent(msg.getContent());
        message.setSender(user1);
        message.setType(Message.MessageType.TEXT);

        messageRepository.save(message);

        MessageResponse response = new MessageResponse().fromMessage(message);
        response.setContent(msg.getContent());

        return response;
    }

    @Override
    public MessageResponse sendSingleFileMessage(List<MultipartFile> files, Integer recipientId, String token) {
        
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User sender = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người gửi không tồn tại!"));
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new DataNotFoundException("Người nhận không tồn tại!"));
        Chat chat = chatRepository.findSingleChatByUser(sender, recipient);

        if (chat == null) {
            chat = new Chat();
            chat.setUser(sender);

            Set<User> members = new HashSet<>();
            members.add(sender);
            members.add(recipient);

            chat.setMembers(members);
            chat.setIsGroup(false);

            chat = chatRepository.save(chat);
        }

        Message message = new Message();
        message.setChat(chat);
        message.setSender(sender);
        message.setType(Message.MessageType.FILE);

        messageRepository.save(message);

        List<FileResponse> fileResponses = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                File savedFile = new File();
                String filePath;

                String contentType = file.getContentType();
                logger.info("Content type received: {}", contentType);
                if (contentType != null) {
                    if (contentType.startsWith("image/")) {
                        savedFile.setFileType(File.FileType.IMAGE);
                        filePath = storeFile(file, UPLOAD_DIR + "/images");
                    } else if (contentType.startsWith("video/")) {
                        savedFile.setFileType(File.FileType.VIDEO);
                        filePath = storeFile(file, UPLOAD_DIR + "/videos");
                    } else if (contentType.startsWith("audio/")) {
                        savedFile.setFileType(File.FileType.AUDIO);
                        filePath = storeFile(file, UPLOAD_DIR + "/files");
                    } else {
                        savedFile.setFileType(File.FileType.DOCUMENT);
                        filePath = storeFile(file, UPLOAD_DIR + "/files");
                    }
                } else {
                    savedFile.setFileType(File.FileType.DOCUMENT);
                    filePath = storeFile(file, UPLOAD_DIR + "/files");
                }

                savedFile.setFileUrl(filePath);
                savedFile.setMessage(message);
                savedFile.setFileName(file.getOriginalFilename());
                savedFile.setFileSize(file.getSize());

                fileRepository.save(savedFile);
//                savedFile.setFileType(File.FileType.AUDIO);
//                filePath = storeFile(file, UPLOAD_DIR + "/files");
                FileResponse fileResponse = new FileResponse().fromFile(savedFile);
                fileResponses.add(fileResponse);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        MessageResponse response = new MessageResponse().fromMessage(message);
        response.setFileResponses(fileResponses);

        return response;
    }

//    @Override
//    public List<MessageTextResponse> getSingleChatMessages(Integer senderId, Integer recipientId) {
//        User user1 = userRepository.findById(senderId)
//                .orElseThrow(() -> new DataNotFoundException("Người gửi không tồn tại!"));
//        User user2 = userRepository.findById(recipientId)
//                .orElseThrow(() -> new DataNotFoundException("Người nhận không tồn tại!"));
//
//        Chat chat = chatRepository.findSingleChatByUser(user1, user2);
//        if (chat == null) {
//            return List.of();
//        }
//
//        List<Message> messages = messageRepository.findAllMessagesByChatId(chat.getId());
//        List<MessageTextResponse> responses = messages.stream()
//                .map(message -> new MessageTextResponse().fromMessage(message))
//                .toList();
//
//        return responses;
//    }

    @Override
    public List<MessageResponse> getSingleChatMessages(String token, Integer recipientId) {
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user1 = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người gửi không tồn tại!"));
        User user2 = userRepository.findById(recipientId)
                .orElseThrow(() -> new DataNotFoundException("Người nhận không tồn tại!"));

        Chat chat = chatRepository.findSingleChatByUser(user1, user2);
        if (chat == null) {
            return List.of();
        }

        List<Message> messages = messageRepository.findAllMessagesByChatId(chat.getId());

        List<MessageResponse> responses = new ArrayList<>();
        for (Message message : messages) {
            MessageResponse response = new MessageResponse().fromMessage(message);
            switch (message.getType()) {
                case TEXT -> {
                    response.setContent(message.getContent());
                }
                case FILE -> {
                    List<File> files = fileRepository.findByMessageId(message.getId());
                    List<FileResponse> fileResponses = new ArrayList<>();
                    for (File file : files) {
                        FileResponse fileResponse = new FileResponse().fromFile(file);
                        fileResponses.add(fileResponse);
                    }
                    response.setFileResponses(fileResponses);
                }
                case CALL -> {
                    Call call = callRepository.findByMessageId(message.getId());
                    CallResponse callResponse = new CallResponse().fromCall(call);
                    response.setCallResponse(callResponse);
                }
            }
            responses.add(response);
        }

        return responses;
    }

    @Override
    public List<Integer> getListRecipientId(Integer messageId, Integer senderId) {
        List<Integer> recipientIds = userRepository.findRecipientIdByMessageIdAndSenderId(messageId, senderId);
        return recipientIds;
    }

    @Override
    public List<MessageResponse> getGroupChatMessages(Integer chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));

        List<Message> messages = messageRepository.findAllMessagesByChatId(chat.getId());
        List<MessageResponse> responses = new ArrayList<>();

        for (Message message : messages) {
            MessageResponse response = new MessageResponse().fromMessage(message);
            response.setContent(message.getContent());
            responses.add(response);
        }

        return responses;
    }

    @Override
    public MessageResponse sendGroupTextMessage(GroupTextSendDTO msg, String senderId) {
        Chat chat = chatRepository.findById(msg.getChatId())
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));
        User sender = userRepository.findById(Integer.parseInt(senderId))
                .orElseThrow(() -> new DataNotFoundException("Người gửi không tồn tại!"));

        Message message = new Message();
        message.setChat(chat);
        message.setContent(msg.getContent());
        message.setSender(sender);
        message.setType(Message.MessageType.TEXT);

        messageRepository.save(message);

        MessageResponse response = new MessageResponse().fromMessage(message);
        response.setContent(msg.getContent());

        return response;
    }

    @Override
    public List<MessageResponse> getGroupChatMessages(String token, Integer chatId) {
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người dùng không tồn tại!"));
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));

        if (!chat.getMembers().contains(user)) {
            throw new InvalidParamException("Bạn không phải là thành viên của nhóm này!");
        }

        List<Message> messages = messageRepository.findAllMessagesByChatId(chat.getId());

        List<MessageResponse> responses = new ArrayList<>();
        for (Message message : messages) {
            MessageResponse response = new MessageResponse().fromMessage(message);
            response.setContent(message.getContent());
            responses.add(response);
        }

        return responses;
    }

    @Override
    public MessageResponse sendGroupFileMessage(List<MultipartFile> files, Integer chatId, String token) {
        String email = jwtTokenProvider.getEmail(token.substring(7));
        User sender = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Người gửi không tồn tại!"));
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));
        if (!chat.getMembers().contains(sender)) {
            throw new InvalidParamException("Bạn không phải là thành viên của nhóm này!");
        }

        Message message = new Message();
        message.setChat(chat);
        message.setSender(sender);
        message.setType(Message.MessageType.FILE);

        messageRepository.save(message);

        List<FileResponse> fileResponses = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                File savedFile = new File();
                String filePath;

                String contentType = file.getContentType();
                if (contentType != null) {
                    if (contentType.startsWith("image/")) {
                        savedFile.setFileType(File.FileType.IMAGE);
                        filePath = storeFile(file, UPLOAD_DIR + "/images");
                    } else if (contentType.startsWith("video/")) {
                        savedFile.setFileType(File.FileType.VIDEO);
                        filePath = storeFile(file, UPLOAD_DIR + "/videos");
                    } else if (contentType.startsWith("audio/")) {
                        savedFile.setFileType(File.FileType.AUDIO);
                        filePath = storeFile(file, UPLOAD_DIR + "/files");
                    } else {
                        savedFile.setFileType(File.FileType.DOCUMENT);
                        filePath = storeFile(file, UPLOAD_DIR + "/files");
                    }
                } else {
                    savedFile.setFileType(File.FileType.DOCUMENT);
                    filePath = storeFile(file, UPLOAD_DIR + "/files");
                }

                savedFile.setFileUrl(filePath);
                savedFile.setMessage(message);
                savedFile.setFileName(file.getOriginalFilename());
                savedFile.setFileSize(file.getSize());

                fileRepository.save(savedFile);

                FileResponse fileResponse = new FileResponse().fromFile(savedFile);
                fileResponses.add(fileResponse);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        MessageResponse response = new MessageResponse().fromMessage(message);
        response.setFileResponses(fileResponses);

        return response;
    }

    @Override
    public List<Integer> getListRecipientId(GroupTextSendDTO msg, String senderId) {
        Chat chat = chatRepository.findById(msg.getChatId())
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));

        List<Integer> recipientIds = chat.getMembers().stream()
                .map(user -> user.getId())
                .filter(id -> !id.equals(senderId))
                .toList();

        return recipientIds;
    }

    public String storeFile(MultipartFile file, String path) throws IOException {
        if (file.getOriginalFilename() == null) {
            throw new InvalidParamException("File không hợp lệ!");
        }

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String uniqueFilename = UUID.randomUUID().toString() + "_" + fileName;

        java.nio.file.Path uploadDir = Paths.get(path);
        if(!Files.exists(uploadDir)){
            Files.createDirectories(uploadDir);
        }
        java.nio.file.Path destination = Paths.get(uploadDir.toString(),uniqueFilename);
        Files.copy(file.getInputStream(),destination, StandardCopyOption.REPLACE_EXISTING);
        return  path + "/" + uniqueFilename;
    }
}
