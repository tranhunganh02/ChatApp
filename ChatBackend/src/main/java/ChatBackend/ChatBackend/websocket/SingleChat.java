package ChatBackend.ChatBackend.websocket;

import ChatBackend.ChatBackend.entity.Message;
import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.service.MessageService;
import ChatBackend.ChatBackend.websocket.dto.SingleMessageSendDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class SingleChat {
    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Autowired
    MessageService messageService;

    @MessageMapping("/user.sendMessage")
    @SendToUser("/queue/reply")
    @Transactional
    public MessageResponse sendMessage(@Payload SingleMessageSendDto msg, Principal principal) {
        MessageResponse message = messageService.sendMessage(msg, principal.getName());

        messagingTemplate.convertAndSendToUser(
                msg.getRecipientId().toString(),
                "/queue/messages",
                message
        );

        return message;
    }
}
