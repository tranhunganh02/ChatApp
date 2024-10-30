package ChatBackend.ChatBackend.service.impl;

import ChatBackend.ChatBackend.repository.ChatRepository;
import ChatBackend.ChatBackend.repository.UserRepository;
import ChatBackend.ChatBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<String> findRecipientEmails(Integer chatId, String senderEmail) {
        List<String> recipientEmails = chatRepository.findRecipientEmailsByChatIdAndSenderEmail(chatId, senderEmail);
        return recipientEmails;
    }
}
