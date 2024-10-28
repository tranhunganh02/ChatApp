package ChatBackend.ChatBackend.payload.request;

import ChatBackend.ChatBackend.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddUserToGroupRequest {
    @JsonProperty("user_ids")
    private Set<Integer> userIds;
}
