package com.codecool.backend.service;

import com.codecool.backend.model.Like;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Post;
import com.codecool.backend.repository.LikeRepository;
import com.codecool.backend.repository.PostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository, PostRepository postRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
    }

    public UUID likePost(UUID postPublicId, Member member) {
        try {
            Like newLike = new Like();
            newLike.setMember(member);
            Post likedPost = postRepository.findByPublicId(postPublicId);
            newLike.setPost(likedPost);
            likeRepository.save(newLike);
            return newLike.getLikePublicId();
        } catch (RuntimeException e) {
            throw new RuntimeException("Error like post!", e);
        }
    }

    @Transactional
    public UUID unlikePost(UUID postPublicId, UUID memberPublicId) {
        try {
            Like deletedLike = likeRepository.deleteLikeByPostPublicIdAndMemberPublicId(postPublicId, memberPublicId);
            return deletedLike.getLikePublicId();
        } catch (RuntimeException e) {
            throw new RuntimeException("Error unlike post!", e);
        }
    }
}
