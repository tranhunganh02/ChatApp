package ChatBackend.ChatBackend.repository;

import ChatBackend.ChatBackend.entity.Call;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CallRepository extends JpaRepository<Call, Integer> {
    @Query(value = "SELECT c FROM Call c WHERE c.message.id = :messageId")
    Call findByMessageId(Integer messageId);
}