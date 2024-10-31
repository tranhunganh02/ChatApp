package ChatBackend.ChatBackend.repository;

import ChatBackend.ChatBackend.entity.Chat;
import ChatBackend.ChatBackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    @Query("SELECT c FROM Chat c WHERE c.isGroup = false AND :user1 MEMBER OF c.members AND :user2 MEMBER OF c.members")
    Chat findSingleChatByUser(User user1, User user2);

    @Query("SELECT c FROM Chat c WHERE :user MEMBER OF c.members")
    List<Chat> findChatByMembers(User user);

    @Query("SELECT u.email " +
            "FROM Chat c " +
            "JOIN c.members u " +
            "WHERE c.id = :chatId " +
            "AND u.email <> :senderEmail")
    List<String> findRecipientEmailsByChatIdAndSenderEmail(@Param("chatId") Integer chatId,
                                                           @Param("senderEmail") String senderEmail);
}