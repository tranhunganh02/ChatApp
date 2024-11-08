package ChatBackend.ChatBackend.repository;

import ChatBackend.ChatBackend.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Integer> {
    @Query("SELECT f FROM File f WHERE f.message.id = :messageId")
    List<File> findByMessageId(Integer messageId);
}