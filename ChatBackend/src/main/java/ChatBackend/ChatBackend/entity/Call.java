package ChatBackend.ChatBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "calls")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Call {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "call_type")
    private CallType callType;

    @ManyToOne
    @JoinColumn(name = "message_id")
    private Message message;

    private LocalDateTime startedTime;

    private LocalDateTime endedTime;

    public enum CallType {
        VIDEO,
        AUDIO
    }
}
