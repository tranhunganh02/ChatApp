package ChatBackend.ChatBackend.controller;


import ChatBackend.ChatBackend.payload.response.UserResponse;
import ChatBackend.ChatBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
@CrossOrigin("http://localhost:8081")
public class SearchController {

    @Autowired
    private UserService userService;


    @GetMapping()
    public ResponseEntity<List<UserResponse>> searchUsersByName(
            @RequestParam String name
    ) {

        return ResponseEntity.ok(userService.searchUsersByName(name));
    }
}
