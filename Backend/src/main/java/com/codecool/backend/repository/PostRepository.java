package com.codecool.backend.repository;

import com.codecool.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Post findByPublicId(UUID publicId);

    List<Post> findAllByMemberPublicId(UUID memberPublicId);

    List<Post> findByNumOfReportGreaterThan(int numOfReports);

    void deleteByPublicId(UUID publicId);
}
