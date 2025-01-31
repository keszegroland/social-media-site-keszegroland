package com.codecool.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "pictures")
@Getter
@Setter
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pictureId;
    @UuidGenerator
    private UUID picturePublicId;
    @Lob
    private byte[] picture;
    @ManyToOne
    private Post post;

}
