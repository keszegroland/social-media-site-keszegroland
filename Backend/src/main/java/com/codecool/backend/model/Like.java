package com.codecool.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "likes", uniqueConstraints = {
        @UniqueConstraint(name="unique_post_member_like",
                columnNames = {"postId", "memberId"})
})
@Getter
@Setter
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @UuidGenerator
    private UUID likePublicId;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
}
