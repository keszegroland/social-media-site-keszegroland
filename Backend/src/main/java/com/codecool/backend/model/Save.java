package com.codecool.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "saves", uniqueConstraints = {
        @UniqueConstraint(name = "unique_post_member_save",
                columnNames = {"postId", "memberId"})
})
@Getter
@Setter
public class Save {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long saveId;

    @UuidGenerator
    private UUID savePublicId;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
}
