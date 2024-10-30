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
public class SingleMessageSendDto {
    @JsonProperty("recipient_id")
    private Integer recipientId;
    private String content;
}
