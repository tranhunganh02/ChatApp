package ChatBackend.ChatBackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalException {
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ExceptionResponse> handleAuthenticationException(AuthenticationException ex, WebRequest request) {

        ExceptionResponse response = new ExceptionResponse();
        response.setTimestamp(new java.util.Date());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setError(HttpStatus.UNAUTHORIZED.getReasonPhrase());
        response.setMessage(ex.getMessage());
        response.setPath(request.getDescription(false));

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}
