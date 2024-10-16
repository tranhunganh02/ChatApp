package ChatBackend.ChatBackend.service;

import ChatBackend.ChatBackend.dto.LoginDto;

public interface AuthService {
    String login(LoginDto loginDto);
}
