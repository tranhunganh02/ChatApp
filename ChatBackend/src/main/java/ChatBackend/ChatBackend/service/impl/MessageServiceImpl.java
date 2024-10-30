package ChatBackend.ChatBackend.service.impl;

import ChatBackend.ChatBackend.entity.Chat;
import ChatBackend.ChatBackend.entity.Message;
import ChatBackend.ChatBackend.entity.User;
import ChatBackend.ChatBackend.exception.DataNotFoundException;
import ChatBackend.ChatBackend.exception.InvalidParamException;
import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.repository.ChatRepository;
import ChatBackend.ChatBackend.repository.MessageRepository;
import ChatBackend.ChatBackend.repository.UserRepository;
import ChatBackend.ChatBackend.security.JwtTokenProvider;
import ChatBackend.ChatBackend.service.MessageService;
import ChatBackend.ChatBackend.websocket.dto.SingleMessageSendDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Override
    public MessageResponse sendMessage(SingleMessageSendDto msg, String senderId) {
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

        return response;
    }

    @Override
    public List<MessageResponse> getSingleChatMessages(Integer senderId, Integer recipientId) {
        User user1 = userRepository.findById(senderId)
                .orElseThrow(() -> new DataNotFoundException("Người gửi không tồn tại!"));
        User user2 = userRepository.findById(recipientId)
                .orElseThrow(() -> new DataNotFoundException("Người nhận không tồn tại!"));

        Chat chat = chatRepository.findSingleChatByUser(user1, user2);
        if (chat == null) {
            return List.of();
        }

        List<Message> messages = messageRepository.findAllMessagesByChatId(chat.getId());
        List<MessageResponse> responses = messages.stream()
                .map(message -> new MessageResponse().fromMessage(message))
                .toList();

        return responses;
    }

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
        List<MessageResponse> responses = messages.stream()
                .map(message -> new MessageResponse().fromMessage(message))
                .toList();

        return responses;
    }

    @Override
    public List<MessageResponse> getGroupChatMessages(Integer chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new DataNotFoundException("Nhóm không tồn tại!"));

        List<Message> messages = messageRepository.findAllMessagesByChatId(chat.getId());
        List<MessageResponse> responses = messages.stream()
                .map(message -> new MessageResponse().fromMessage(message))
                .toList();

        return responses;
    }
}
