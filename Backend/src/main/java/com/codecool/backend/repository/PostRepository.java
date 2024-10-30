package com.codecool.backend.repository;

import com.codecool.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Post findByPostPublicId(UUID postPublicId);

    List<Post> findAllByMemberMemberPublicId(UUID memberPublicId);

    List<Post> findByNumOfReportGreaterThan(int numOfReports);

    void deleteByPostPublicId(UUID postPublicId);
}
