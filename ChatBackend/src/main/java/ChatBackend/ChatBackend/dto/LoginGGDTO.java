package ChatBackend.ChatBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginGGDTO {
    private String email;
    private String familyName;
    private String givenName;
    private String photo;
}
