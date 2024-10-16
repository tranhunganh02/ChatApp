package ChatBackend.ChatBackend.repository;

import ChatBackend.ChatBackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByUsername(String username);
  Boolean existsByEmail(String email);
  Optional<User> findByUsernameOrEmail(String username, String email);
  boolean existsByUsername(String username);
}