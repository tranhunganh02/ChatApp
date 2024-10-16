package ChatBackend.ChatBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "read_receipts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReadReceipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "message_id")
    private Message message;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "read_at")
    private LocalDateTime readAt;
}
