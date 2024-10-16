package com.codecool.backend.repository;

import com.codecool.backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByPostPublicIdAndMemberPublicId(UUID postPublicId, UUID memberPublicId);

    Set<Like> findByPostPublicId(UUID postPublicId);

    Optional<Like> findFirstByPostPublicId(UUID postPublicId);
}
