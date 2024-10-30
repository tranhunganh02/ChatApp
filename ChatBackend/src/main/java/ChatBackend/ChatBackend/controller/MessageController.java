package ChatBackend.ChatBackend.controller;

import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {
    @Autowired
    MessageService messageService;

    @GetMapping("/users/{recipientId}")
    public List<MessageResponse> getMessages(@PathVariable("recipientId") Integer recipientId, @RequestHeader("Authorization") String token) {
        List<MessageResponse> messages = messageService.getSingleChatMessages(token, recipientId);

        return messages;
    }
}
