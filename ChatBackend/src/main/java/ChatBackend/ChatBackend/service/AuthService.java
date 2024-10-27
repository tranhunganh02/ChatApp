package ChatBackend.ChatBackend.service;

import ChatBackend.ChatBackend.dto.LoginDTO;
import ChatBackend.ChatBackend.dto.LoginGGDTO;
import ChatBackend.ChatBackend.dto.SignUpDTO;
import ChatBackend.ChatBackend.exception.AuthenticationException;
import ChatBackend.ChatBackend.response.JWTAuthResponse;

public interface AuthService {
   JWTAuthResponse login(LoginDTO loginDTO) throws AuthenticationException, org.springframework.security.core.AuthenticationException;
    JWTAuthResponse loginGG(LoginGGDTO loginGGDTO) throws AuthenticationException, org.springframework.security.core.AuthenticationException;
    String register(SignUpDTO signUpDTO) throws AuthenticationException;
}
