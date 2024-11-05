package com.codecool.backend.service;

import com.codecool.backend.controller.dto.LikeDTO;
import com.codecool.backend.model.Like;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Post;
import com.codecool.backend.repository.LikeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class LikeService {
    private final LikeRepository likeRepository;
    private final MemberService memberService;
    private final PostService postService;

    @Autowired
    public LikeService(LikeRepository likeRepository, MemberService memberService, PostService postService) {
        this.likeRepository = likeRepository;
        this.memberService = memberService;
        this.postService = postService;
    }

    @Transactional
    public UUID likePost(UUID postPublicId, String username) {
        Member member = memberService.getMemberByUsername(username);

        Optional<Like> existingLike = likeRepository.findByPostPostPublicIdAndMemberMemberPublicId(postPublicId, member.getMemberPublicId());
        if (existingLike.isPresent()) {
            throw new RuntimeException("Member has already liked this post.");
        }

        Like newLike = new Like();
        newLike.setMember(member);
        Post likedPost = postService.getPostByPublicId(postPublicId);
        newLike.setPost(likedPost);
        likeRepository.save(newLike);
        return newLike.getLikePublicId();
    }

    @Transactional
    public UUID unlikePost(UUID postPublicId, String username) {
        Member member = memberService.getMemberByUsername(username);
        Optional<Like> like = likeRepository.findByPostPostPublicIdAndMemberMemberPublicId(postPublicId, member.getMemberPublicId());
        if (like.isPresent()) {
            likeRepository.delete(like.get());
            return like.get().getLikePublicId();
        } else {
            throw new RuntimeException("No like found for this post by user: " + username);
        }
    }

    private boolean isPostLikedByLoggedInMember(UUID postPublicId, String username) {
        Member member = memberService.getMemberByUsername(username);
        return likeRepository.findByPostPostPublicIdAndMemberMemberPublicId(postPublicId, member.getMemberPublicId()).isPresent();
    }

    private String getTheUsernameOfTheFirstLikerForPost(UUID postPublicId) {
        return likeRepository.findFirstByPostPostPublicId(postPublicId).map(like -> like.getMember().getUsername()).orElse("No likes yet.");
    }

    private int getTotalNumberOfLikes(UUID postPublicId) {
        return likeRepository.findByPostPostPublicId(postPublicId).size();
    }

    @Transactional
    public LikeDTO getLikesDataForPost(UUID postPublicId, String username) {
        return new LikeDTO(isPostLikedByLoggedInMember(postPublicId, username), getTheUsernameOfTheFirstLikerForPost(postPublicId), getTotalNumberOfLikes(postPublicId));
    }
}
