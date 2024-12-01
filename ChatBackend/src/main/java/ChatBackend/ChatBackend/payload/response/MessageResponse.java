package ChatBackend.ChatBackend.payload.response;

import ChatBackend.ChatBackend.entity.Message;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<FileResponse> fileResponses;
    private CallResponse callResponse;

    public MessageResponse fromMessage(Message message) {
        MessageResponse messageResponse = new MessageResponse();

        messageResponse.setId(message.getId());
        messageResponse.setContent(message.getContent());
        messageResponse.setSenderId(message.getSender().getId());
        messageResponse.setChatId(message.getChat().getId());
        messageResponse.setType(message.getType());
        messageResponse.setTimestamp(message.getCreatedAt());

        return messageResponse;
    }
}
