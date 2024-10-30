package ChatBackend.ChatBackend.controller;

import ChatBackend.ChatBackend.payload.request.AddUserToGroupRequest;
import ChatBackend.ChatBackend.payload.request.GroupChatRequest;
import ChatBackend.ChatBackend.entity.Chat;
import ChatBackend.ChatBackend.payload.request.RenameGroupRequest;
import ChatBackend.ChatBackend.payload.request.SingleChatRequest;
import ChatBackend.ChatBackend.payload.response.ChatResponse;
import ChatBackend.ChatBackend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/groups")
    public ResponseEntity<ChatResponse> createGroupChat(
            @RequestBody GroupChatRequest groupChatRequest,
            @RequestHeader("Authorization") String jwt
    ) {
        ChatResponse chat = chatService.createGroup(groupChatRequest, jwt);
        return ResponseEntity.ok(chat);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatResponse> findChatById(
            @PathVariable("id") Integer id,
            @RequestHeader("Authorization") String token
    ) {
        ChatResponse chat = chatService.findChatById(id, token);
        return ResponseEntity.ok(chat);
    }

    @GetMapping("/user")
    public ResponseEntity<List<ChatResponse>> findAllChatsByUser(
            @RequestHeader("Authorization") String jwt
    ) {
        List<ChatResponse> chats = chatService.findAllChats(jwt);
        return ResponseEntity.ok(chats);
    }

    @PutMapping("/groups/{chatId}/add")
    public ResponseEntity<ChatResponse> addUserToGroup(
            @PathVariable("chatId") Integer chatId,
            @RequestBody AddUserToGroupRequest request,
            @RequestHeader("Authorization") String jwt
    ) {
        ChatResponse chat = chatService.addUserToGroup(jwt, request, chatId);
        return ResponseEntity.ok(chat);
    }

    @PutMapping("/groups/{chatId}/rename")
    public ResponseEntity<ChatResponse> renameGroup(
            @PathVariable("chatId") Integer chatId,
            @RequestBody RenameGroupRequest request,
            @RequestHeader("Authorization") String jwt
    ) {
        ChatResponse chat = chatService.renameGroup(chatId, request, jwt);
        return ResponseEntity.ok(chat);
    }

    @PutMapping("/groups/{chatId}/remove/{userId}")
    public ResponseEntity<ChatResponse> removeFromGroup(
            @PathVariable("chatId") Integer chatId,
            @PathVariable("userId") Integer userId,
            @RequestHeader("Authorization") String jwt
    ) {
        ChatResponse chat = chatService.removeFromGroup(chatId, userId, jwt);
        return ResponseEntity.ok(chat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChat(
            @PathVariable("id") Integer id,
            @RequestHeader("Authorization") String jwt
    ) {chatService.deleteChat(id, jwt);
        return ResponseEntity.ok("Xoá thành công!");
    }

    @PostMapping(value = "/groups/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ChatResponse> uploadGroupChatImage(
            @PathVariable("id") Integer id,
            @RequestHeader("Authorization") String token,
            @RequestPart("file") MultipartFile file
    ) {
        ChatResponse chat;
        try {
            chat = chatService.uploadGroupChatImage(id, token, file);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(chat);
    }
}
