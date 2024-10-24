package ChatBackend.ChatBackend.service.impl;

import ChatBackend.ChatBackend.dto.LoginDTO;
import ChatBackend.ChatBackend.dto.SignUpDTO;
import ChatBackend.ChatBackend.entity.User;
import ChatBackend.ChatBackend.repository.UserRepository;
import ChatBackend.ChatBackend.security.JwtTokenProvider;
import ChatBackend.ChatBackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import ChatBackend.ChatBackend.exception.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String login(LoginDTO loginDto) throws AuthenticationException {

        if (!userRepository.existsByEmail(loginDto.getEmail())) {
            throw new AuthenticationException("Tài khoản không tồn tại!");
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public String register(SignUpDTO signUpDTO) throws AuthenticationException {
        if (userRepository.existsByEmail(signUpDTO.getEmail())) {
            throw new AuthenticationException("Email đã tồn tại!");
        }

        User user = new User();
        user.setName(signUpDTO.getName());
        user.setEmail(signUpDTO.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDTO.getPassword()));

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signUpDTO.getEmail(), signUpDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }
}
