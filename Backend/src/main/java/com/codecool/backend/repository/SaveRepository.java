package com.codecool.backend.repository;

import com.codecool.backend.model.Save;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SaveRepository extends JpaRepository<Save, Long> {
    Optional<Save> findByPostPublicIdAndMemberPublicId(UUID postPublicId, UUID memberPublicId);

}
