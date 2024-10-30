package ChatBackend.ChatBackend.service;

import java.util.List;

public interface UserService {
    List<String> findRecipientEmails(Integer chatId, String senderEmail);
}
