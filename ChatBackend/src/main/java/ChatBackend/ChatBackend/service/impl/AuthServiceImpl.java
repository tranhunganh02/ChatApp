package ChatBackend.ChatBackend.service.impl;

import ChatBackend.ChatBackend.dto.LoginDTO;
import ChatBackend.ChatBackend.dto.LoginGGDTO;
import ChatBackend.ChatBackend.dto.SignUpDTO;
import ChatBackend.ChatBackend.entity.User;
import ChatBackend.ChatBackend.exception.AuthenticationException;
import ChatBackend.ChatBackend.repository.UserRepository;
import ChatBackend.ChatBackend.payload.response.JWTAuthResponse;
import ChatBackend.ChatBackend.security.JwtTokenProvider;
import ChatBackend.ChatBackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
    public JWTAuthResponse login(LoginDTO loginDto) throws AuthenticationException {

        if (!userRepository.existsByEmail(loginDto.getEmail())) {
            throw new AuthenticationException("Tài khoản không tồn tại!");
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new AuthenticationException("Tài khoản không tồn tại!"));
        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setUserId(user.getId());
        jwtAuthResponse.setAvatar(user.getAvatar());
        return jwtAuthResponse;
    }

    @Override
    public JWTAuthResponse register(SignUpDTO signUpDTO) throws AuthenticationException {
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
        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setUserId(user.getId());
        jwtAuthResponse.setAvatar(user.getAvatar());
        return jwtAuthResponse;
    }

    @Override
    public JWTAuthResponse loginGG(LoginGGDTO loginGGDTO)
            throws AuthenticationException, org.springframework.security.core.AuthenticationException {

        User user;
        if (!userRepository.existsByEmail(loginGGDTO.getEmail())) {
            // Nếu chưa có, tạo tài khoản mới
            user = new User();
            user.setEmail(loginGGDTO.getEmail());
            user.setName(loginGGDTO.getGivenName() + " " + loginGGDTO.getFamilyName());
            user.setGoogle(true); // Đánh dấu người dùng là đăng nhập qua Google
            user.setAvatar(loginGGDTO.getPhoto());
            userRepository.save(user);
        } else {
            // Nếu đã có người dùng, lấy thông tin người dùng từ cơ sở dữ liệu
            user = userRepository.findByEmail(loginGGDTO.getEmail())
                    .orElseThrow(() -> new AuthenticationException("Tài khoản không tồn tại!"));
        }

        // Tạo token mà không cần mật khẩu
        String token = jwtTokenProvider.generateToken(new UsernamePasswordAuthenticationToken(user.getEmail(), null));
        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setUserId(user.getId());
        jwtAuthResponse.setAvatar(user.getAvatar());
        return jwtAuthResponse;
    }


}