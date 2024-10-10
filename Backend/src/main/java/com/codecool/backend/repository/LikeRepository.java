package com.codecool.backend.repository;

import com.codecool.backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Like deleteLikeByPostPublicIdAndMemberPublicId(UUID postPublicId, UUID memberPublicId);
}
