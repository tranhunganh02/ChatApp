package ChatBackend.ChatBackend.payload.response;

import ChatBackend.ChatBackend.entity.Chat;
import ChatBackend.ChatBackend.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {
    private Integer id;
    private String name;
    @JsonProperty("is_group")
    private Boolean isGroup;
    @JsonProperty("chat_image")
    private String chatImage;
    @JsonProperty("last_message")
    private MessageResponse lastMessage;
    @JsonProperty("users")
    private List<UserResponse> userResponses;

    public ChatResponse fromChat(Chat chat) {
        ChatResponse response = new ChatResponse();
        response.setId(chat.getId());
        response.setName(chat.getName());
        response.setIsGroup(chat.getIsGroup());
        response.setChatImage(chat.getChatImage());
        response.userResponses = new ArrayList<>();
        for (User user : chat.getMembers()) {
            if (user != null) {
                response.userResponses.add(new UserResponse().fromUser(user));
            }
        }
        return response;
    }
}
