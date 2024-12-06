package ChatBackend.ChatBackend.repository;

import ChatBackend.ChatBackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("SELECT u.id\n" +
            "FROM User u\n" +
            "JOIN Chat c ON u MEMBER OF c.members\n" +
            "JOIN Message m ON c.id = m.chat.id\n" +
            "WHERE m.id = :messageId\n" +
            "  AND u.id != :senderId\n")
    List<Integer> findRecipientIdByMessageIdAndSenderId(Integer messageId, Integer senderId);

    @Query("SELECT u FROM User u WHERE u.name LIKE :pattern")
    List<User> searchUserByName(@Param("pattern") String pattern);
}