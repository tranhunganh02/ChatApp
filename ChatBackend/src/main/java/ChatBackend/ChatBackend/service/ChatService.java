package ChatBackend.ChatBackend.service;

import ChatBackend.ChatBackend.entity.Chat;
import ChatBackend.ChatBackend.payload.request.AddUserToGroupRequest;
import ChatBackend.ChatBackend.payload.request.GroupChatRequest;
import ChatBackend.ChatBackend.payload.request.RenameGroupRequest;
import ChatBackend.ChatBackend.payload.request.SingleChatRequest;
import ChatBackend.ChatBackend.payload.response.ChatResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface ChatService {
    ChatResponse createGroup(GroupChatRequest req, String token);
//    Chat createSingleChat(String token, SingleChatRequest request);
    ChatResponse findChatById(Integer chatId, String token);
    List<ChatResponse> findAllChats(String token);
    ChatResponse addUserToGroup(String token, AddUserToGroupRequest request, Integer chatId);
    ChatResponse renameGroup(Integer chatId, RenameGroupRequest request, String token);
    ChatResponse removeFromGroup(Integer chatId, Integer userId, String token);
    void deleteChat(Integer chatId, String token);
    ChatResponse uploadGroupChatImage(Integer chatId, String token, MultipartFile file) throws IOException;
}
