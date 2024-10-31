package ChatBackend.ChatBackend.payload.response;

import ChatBackend.ChatBackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Integer id;
    private String name;
    private String email;
    private String avatar;

    public UserResponse fromUser(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getAvatar());
    }
}
