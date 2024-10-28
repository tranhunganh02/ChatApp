package ChatBackend.ChatBackend.service;

import ChatBackend.ChatBackend.entity.Chat;
import ChatBackend.ChatBackend.payload.request.AddUserToGroupRequest;
import ChatBackend.ChatBackend.payload.request.GroupChatRequest;
import ChatBackend.ChatBackend.payload.request.RenameGroupRequest;
import ChatBackend.ChatBackend.payload.request.SingleChatRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface ChatService {
    Chat createGroup(GroupChatRequest req, String token);
    Chat createSingleChat(String token, SingleChatRequest request);
    Chat findChatById(Integer chatId, String token);
    List<Chat> findAllChats(String token);
    Chat addUserToGroup(String token, AddUserToGroupRequest request, Integer chatId);
    Chat renameGroup(Integer chatId, RenameGroupRequest request, String token);
    Chat removeFromGroup(Integer chatId, Integer userId, String token);
    void deleteChat(Integer chatId, String token);
    Chat uploadGroupChatImage(Integer chatId, String token, MultipartFile file) throws IOException;
}
