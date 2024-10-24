package ChatBackend.ChatBackend.service;

import ChatBackend.ChatBackend.dto.LoginDTO;
import ChatBackend.ChatBackend.dto.SignUpDTO;
import ChatBackend.ChatBackend.exception.AuthenticationException;

public interface AuthService {
    String login(LoginDTO loginDTO) throws AuthenticationException, org.springframework.security.core.AuthenticationException;
    String register(SignUpDTO signUpDTO) throws AuthenticationException;
}
