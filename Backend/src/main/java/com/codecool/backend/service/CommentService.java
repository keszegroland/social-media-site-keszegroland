package com.codecool.backend.service;

import com.codecool.backend.controller.dto.NewCommentDTO;
import com.codecool.backend.model.Comment;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Post;
import com.codecool.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final PostService postService;

    @Autowired
    public CommentService(CommentRepository commentRepository, MemberService memberService, PostService postService) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
        this.postService = postService;
    }

    public UUID createComment(NewCommentDTO commentDTO) {
        try {
            Comment newComment = new Comment();
            newComment.setComment(commentDTO.comment());
            newComment.setMember(getMemberForComment(commentDTO.username()));
            newComment.setPost(getPostForComment(commentDTO.postPublicId()));
            commentRepository.save(newComment);
            return newComment.getCommentPublicId();
        } catch (RuntimeException e) {
            throw new RuntimeException("Error creating comment" + e.getMessage());
        }
    }

    private Member getMemberForComment(String username) {
        return memberService.getMemberByUsername(username);
    }

    private Post getPostForComment(UUID postPublicId) {
        return postService.getPostByPublicId(postPublicId);
    }
}
