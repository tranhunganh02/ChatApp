package ChatBackend.ChatBackend.controller;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    public String hello() {
        return "Hello World!";
    }
}
