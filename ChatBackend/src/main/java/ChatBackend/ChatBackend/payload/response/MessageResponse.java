package ChatBackend.ChatBackend.payload.response;

import ChatBackend.ChatBackend.entity.Message;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
    private Integer id;
    @JsonProperty("sender_id")
    private Integer senderId;
    @JsonProperty("chat_id")
    private Integer chatId;
    private Message.MessageType type;
    private String content;
    private LocalDateTime timestamp;

    public MessageResponse fromMessage(Message message) {
        return new MessageResponse(message.getId(), message.getSender().getId(), message.getChat().getId(), message.getType(), message.getContent(), message.getCreatedAt());
    }
}
