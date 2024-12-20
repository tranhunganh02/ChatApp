package ChatBackend.ChatBackend.service;

import ChatBackend.ChatBackend.payload.response.UserResponse;

import java.util.List;

public interface UserService {
    List<String> findRecipientEmails(Integer chatId, String senderEmail);

    List<UserResponse> searchUsersByName(String name);
}
