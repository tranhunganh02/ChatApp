package ChatBackend.ChatBackend.payload.response;

import ChatBackend.ChatBackend.entity.Call;
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
public class CallResponse {
    @JsonProperty("started_time")
    private LocalDateTime startedTime;
    @JsonProperty("ended_time")
    private LocalDateTime endedTime;
    @JsonProperty("caller_type")
    private Call.CallType callType;

    public CallResponse fromCall(Call call) {
        return new CallResponse(call.getStartedTime(), call.getEndedTime(), call.getCallType());
    }
}