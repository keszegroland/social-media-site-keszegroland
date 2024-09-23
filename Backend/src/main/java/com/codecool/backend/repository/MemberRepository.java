package com.codecool.backend.repository;

import com.codecool.backend.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String username);

    Optional<Member> findByPublicId(UUID memberId);

    void deleteByPublicId(UUID publicId);
}
