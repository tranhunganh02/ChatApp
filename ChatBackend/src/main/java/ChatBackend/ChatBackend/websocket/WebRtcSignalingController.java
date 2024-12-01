package ChatBackend.ChatBackend.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import ChatBackend.ChatBackend.websocket.dto.SignalingMessageDTO;

@Controller
public class WebRtcSignalingController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebRtcSignalingController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/signal") // Lắng nghe từ "/app/signal"
    public void handleSignalingMessage(SignalingMessageDTO message) {
        // Gửi tín hiệu đến người nhận qua đích đích cá nhân ("/user/{to}/queue/signals")
        messagingTemplate.convertAndSendToUser(
                message.getTo(),
                "/queue/signals",
                message
        );
    }
}
