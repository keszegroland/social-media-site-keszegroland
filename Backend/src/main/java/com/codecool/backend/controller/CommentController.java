package com.codecool.backend.controller;

import com.codecool.backend.controller.dto.NewCommentDTO;
import com.codecool.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create")
    public UUID createComment(@RequestBody NewCommentDTO comment) {
        return commentService.createComment(comment);
    }
}
