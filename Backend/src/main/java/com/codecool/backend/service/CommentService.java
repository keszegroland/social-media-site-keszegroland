package com.codecool.backend.service;

import com.codecool.backend.controller.dto.CommentDTO;
import com.codecool.backend.controller.dto.MemberIdentityDTO;
import com.codecool.backend.controller.dto.NewCommentDTO;
import com.codecool.backend.model.Comment;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Post;
import com.codecool.backend.repository.CommentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    @Transactional
    public List<CommentDTO> getAllCommentsForPost(UUID postPublicId) {
        return commentRepository.findAllByPostPostPublicId(postPublicId).stream()
                .map((this::convertCommentToDTO))
                .toList()
                .reversed();
    }

    @Transactional
    public UUID createComment(NewCommentDTO newCommentDTO, UUID postPublicId, String username) {
        try {
            Comment newComment = new Comment();
            newComment.setComment(newCommentDTO.comment());
            newComment.setMember(getMemberForComment(username));
            newComment.setPost(getPostForComment(postPublicId));
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

    private CommentDTO convertCommentToDTO(Comment comment) {
        MemberIdentityDTO memberIdentityDTO = memberService.getMemberIdentity(comment.getMember().getUsername());
        return new CommentDTO(comment.getCommentPublicId(), comment.getComment(), comment.getCreationDate(), memberIdentityDTO);
    }
}
