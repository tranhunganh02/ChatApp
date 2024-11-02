package ChatBackend.ChatBackend.controller;

import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {
    @Autowired
    MessageService messageService;

    @GetMapping("/users/{recipientId}")
    public ResponseEntity<List<MessageResponse>> getSingleChatMessages(@PathVariable("recipientId") Integer recipientId, @RequestHeader("Authorization") String token) {
        List<MessageResponse> messages = messageService.getSingleChatMessages(token, recipientId);

        return ResponseEntity.ok(messages);
    }

    @PostMapping(value = "users/files/{recipientId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MessageResponse> sendSingleFileMessage(
            @PathVariable("recipientId") Integer recipientId,
            @RequestHeader("Authorization") String token,
            @RequestParam("files") List<MultipartFile> files
    ) {
        MessageResponse message = messageService.sendSingleFileMessage(files, recipientId, token);

        return ResponseEntity.ok(message);
    }

    @GetMapping("/groups/{chatId}")
    public ResponseEntity<List<MessageResponse>> getGroupChatMessages(@PathVariable("chatId") Integer chatId, @RequestHeader("Authorization") String token) {
        List<MessageResponse> messages = messageService.getGroupChatMessages(token, chatId);

        return ResponseEntity.ok(messages);
    }

    @PostMapping(value = "users/files/{chatId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MessageResponse> sendGroupFileMessage(
            @PathVariable("chatId") Integer chatId,
            @RequestHeader("Authorization") String token,
            @RequestParam("files") List<MultipartFile> files
    ) {
        MessageResponse message = messageService.sendGroupFileMessage(files, chatId, token);

        return ResponseEntity.ok(message);
    }

//    @PostMapping("groups/files/{chatId}")
//    public MessageResponse sendFileMessageToGroup(@PathVariable("chatId") Integer chatId, @RequestHeader("Authorization") String token, @RequestBody String file) {
//
//        return message;
//    }

}
