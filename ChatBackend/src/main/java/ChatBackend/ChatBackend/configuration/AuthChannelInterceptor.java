package ChatBackend.ChatBackend.configuration;

import ChatBackend.ChatBackend.entity.User;
import ChatBackend.ChatBackend.exception.DataNotFoundException;
import ChatBackend.ChatBackend.repository.UserRepository;
import ChatBackend.ChatBackend.security.JwtTokenProvider;
import ChatBackend.ChatBackend.security.StompPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
public class AuthChannelInterceptor implements ChannelInterceptor {
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserRepository userRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authorizationHeader = accessor.getFirstNativeHeader("Authorization");

            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String token = authorizationHeader.substring(7);
//                String token = authorizationHeader;

                if (jwtTokenProvider.validateToken(token)) {
                    String username = jwtTokenProvider.getEmail(token);
                    User user = userRepository.findByEmail(username)
                                    .orElseThrow(() -> new DataNotFoundException("Người dùng không tồn tại"));

                    accessor.setUser(new StompPrincipal(user.getId().toString()));
                } else {
                    throw new IllegalArgumentException("Invalid JWT token");
                }
            } else {
                throw new IllegalArgumentException("Missing or invalid Authorization header");
            }
        }

        return message;
    }
}