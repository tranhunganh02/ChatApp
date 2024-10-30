package ChatBackend.ChatBackend.service.impl;

import ChatBackend.ChatBackend.entity.Chat;
import ChatBackend.ChatBackend.entity.Message;
import ChatBackend.ChatBackend.entity.User;
import ChatBackend.ChatBackend.exception.DataNotFoundException;
import ChatBackend.ChatBackend.exception.InvalidParamException;
import ChatBackend.ChatBackend.repository.ChatRepository;
import ChatBackend.ChatBackend.repository.MessageRepository;
import ChatBackend.ChatBackend.repository.UserRepository;
import ChatBackend.ChatBackend.service.MessageService;
import ChatBackend.ChatBackend.websocket.dto.SingleMessageSendDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    ChatRepository chatRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @Override
    public Message sendMessage(SingleMessageSendDto msg, String senderId) {
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

        return message;
    }
}
