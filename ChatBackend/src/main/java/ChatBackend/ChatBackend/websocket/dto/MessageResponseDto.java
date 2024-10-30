package ChatBackend.ChatBackend.websocket.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageResponseDto {
    private int chatId;
    private String senderUsername;
    private String recipientUsername;
    private String content;
    private LocalDateTime createdAt;
}

