package ChatBackend.ChatBackend.repository;

import ChatBackend.ChatBackend.entity.Chat;
import ChatBackend.ChatBackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    @Query("SELECT c FROM Chat c WHERE c.isGroup = false AND :user1 MEMBER OF c.members AND :user2 MEMBER OF c.members")
    Chat findSingleChatByUserId(User user1, User user2);

    @Query("SELECT c FROM Chat c WHERE c.user.id = :userId")
    List<Chat> findByUserId(Integer userId);
}