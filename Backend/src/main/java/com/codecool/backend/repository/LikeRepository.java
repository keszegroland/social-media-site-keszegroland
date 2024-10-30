package com.codecool.backend.repository;

import com.codecool.backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByPostPostPublicIdAndMemberMemberPublicId(UUID postPublicId, UUID memberPublicId);

    Set<Like> findByPostPostPublicId(UUID postPublicId);

    Optional<Like> findFirstByPostPostPublicId(UUID postPublicId);
}
