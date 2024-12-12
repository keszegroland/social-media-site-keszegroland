package com.codecool.backend.controller;

import com.codecool.backend.controller.dto.CommentDTO;
import com.codecool.backend.controller.dto.NewCommentDTO;
import com.codecool.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create/{postPublicId}")
    public UUID createComment(@RequestBody NewCommentDTO newComment, @PathVariable UUID postPublicId, Principal principal) {
        return commentService.createComment(newComment, postPublicId, principal.getName());
    }

    @GetMapping("/{postPublicId}/all")
    public List<CommentDTO> getAllCommentsForPost(@PathVariable UUID postPublicId) {
        return commentService.getAllCommentsForPost(postPublicId);
    }
}
