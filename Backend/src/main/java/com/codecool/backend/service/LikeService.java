package com.codecool.backend.service;

import com.codecool.backend.model.Like;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Post;
import com.codecool.backend.repository.LikeRepository;
import com.codecool.backend.repository.MemberRepository;
import com.codecool.backend.repository.PostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository, PostRepository postRepository, MemberRepository memberRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public UUID likePost(UUID postPublicId, String username) {
        Member member = findMemberByUsername(username);

        Optional<Like> existingLike = likeRepository.findByPostPublicIdAndMemberPublicId(postPublicId, member.getPublicId());
        if (existingLike.isPresent()) {
            throw new RuntimeException("Member has already liked this post.");
        }

        Like newLike = new Like();
        newLike.setMember(member);
        Post likedPost = postRepository.findByPublicId(postPublicId);
        newLike.setPost(likedPost);
        likeRepository.save(newLike);
        return newLike.getLikePublicId();
    }

    @Transactional
    public UUID unlikePost(UUID postPublicId, String username) {
        Member member = findMemberByUsername(username);
        Optional<Like> like = likeRepository.findByPostPublicIdAndMemberPublicId(postPublicId, member.getPublicId());
        if (like.isPresent()) {
            likeRepository.delete(like.get());
            return like.get().getLikePublicId();
        } else {
            throw new RuntimeException("No like found for this post by user: " + username);
        }
    }

    private Member findMemberByUsername(String username) {
        return memberRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Member not found with username: " + username));
    }

    @Transactional
    public String getTheUsernameOfTheFirstLikerForPost(UUID postPublicId) {
        return likeRepository.findFirstByPostPublicId(postPublicId)
                .map(like -> like.getMember().getUsername())
                .orElse("No likes yet.");
    }

    @Transactional
    public boolean isPostLikedByLoggedInMember(UUID postPublicId, String username) {
        Member member = findMemberByUsername(username);
        return likeRepository.findByPostPublicIdAndMemberPublicId(postPublicId, member.getPublicId()).isPresent();
    }

    public int getTotalNumberOfLikes(UUID postPublicId) {
        return likeRepository.findByPostPublicId(postPublicId).size();
    }
}
