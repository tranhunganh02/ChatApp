package ChatBackend.ChatBackend.repository;

import ChatBackend.ChatBackend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    @Query("SELECT m FROM Message m WHERE m.chat.id = :chatId ORDER BY m.createdAt DESC LIMIT 1")
    List<Message> findLastMessagesByChatId(Integer chatId);

    @Query("SELECT m FROM Message m WHERE  m.chat.id = :chatId ORDER BY m.createdAt DESC")
    List<Message> findAllMessagesByChatId(Integer chatId);
}