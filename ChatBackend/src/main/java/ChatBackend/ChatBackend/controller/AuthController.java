package ChatBackend.ChatBackend.controller;

import ChatBackend.ChatBackend.dto.LoginDTO;
import ChatBackend.ChatBackend.dto.LoginGGDTO;
import ChatBackend.ChatBackend.dto.SignUpDTO;
import ChatBackend.ChatBackend.exception.AuthenticationException;
import ChatBackend.ChatBackend.payload.response.JWTAuthResponse;
import ChatBackend.ChatBackend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("http://localhost:8081")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> authenticate(@RequestBody LoginDTO loginDto) throws AuthenticationException {
        JWTAuthResponse jwtAuthResponse = authService.login(loginDto);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<JWTAuthResponse> register(@RequestBody SignUpDTO signUpDTO) throws AuthenticationException {
        String token = authService.register(signUpDTO);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }


    @PostMapping("/login-gg")
    public ResponseEntity<JWTAuthResponse> authenticateGG(@RequestBody LoginGGDTO loginGGDto) throws AuthenticationException {
        JWTAuthResponse jwtAuthResponse = authService.loginGG(loginGGDto);

//        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
//        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }
}
