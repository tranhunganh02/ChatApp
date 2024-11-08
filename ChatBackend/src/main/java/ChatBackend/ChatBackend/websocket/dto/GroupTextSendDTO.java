package ChatBackend.ChatBackend.websocket.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GroupTextSendDTO {
    @JsonProperty("chat_id")
    private Integer chatId;
    private String content;
    @JsonProperty("message_type")
    private String messageType;
}
