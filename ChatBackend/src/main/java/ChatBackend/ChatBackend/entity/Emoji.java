package ChatBackend.ChatBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "emojis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Emoji {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String unicode;

    @Column(nullable = false)
    private String description;
}
