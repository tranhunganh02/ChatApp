package ChatBackend.ChatBackend.websocket;

import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.service.MessageService;
import ChatBackend.ChatBackend.websocket.dto.GroupTextSendDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.List;

@Controller
public class GroupChat {
    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Autowired
    MessageService messageService;

    @MessageMapping("/group.sendMessage")
    @SendToUser("/queue/reply")
    @Transactional
    public MessageResponse sendMessage(@Payload GroupTextSendDTO msg, Principal principal) {
        MessageResponse message = messageService.sendGroupTextMessage(msg, principal.getName());
        List<Integer> recipientIds = messageService.getListRecipientId(msg, principal.getName());

        recipientIds.forEach(recipientId -> {
            if (!recipientId.equals(Integer.parseInt(principal.getName()))) {
                messagingTemplate.convertAndSendToUser(
                        recipientId.toString(),
                        "/queue/messages",
                        message
                );
            }
        });

        return message;
    }
}
