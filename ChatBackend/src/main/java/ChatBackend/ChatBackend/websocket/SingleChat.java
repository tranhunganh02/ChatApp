package ChatBackend.ChatBackend.websocket;

import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.service.MessageService;
import ChatBackend.ChatBackend.websocket.dto.SingleTextSendDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
public class SingleChat {
    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Autowired
    MessageService messageService;

    @MessageMapping("/user.sendTextMessage")
    @SendToUser("/queue/reply")
    @Transactional
    public MessageResponse sendTextMessage(@Payload SingleTextSendDTO msg, Principal principal) {
        MessageResponse message = messageService.sendSingleTextMessage(msg, principal.getName());

        messagingTemplate.convertAndSendToUser(
                msg.getRecipientId().toString(),
                "/queue/messages",
                message
        );
        return message;
    }

    @MessageMapping("/sendFileMessage")
    @SendToUser("/queue/reply")
    @Transactional
    public MessageResponse sendFileMessage(@Payload MessageResponse messageResponse, Principal principal) {
        List<Integer> recipientIds = messageService.getListRecipientId(messageResponse.getId(), Integer.parseInt(principal.getName()));

        recipientIds.forEach(recipientId -> {
            messagingTemplate.convertAndSendToUser(
                    recipientId.toString(),
                    "/queue/messages",
                    messageResponse
            );
        });

        return messageResponse;
    }
}
