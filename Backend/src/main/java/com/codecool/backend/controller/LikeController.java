package com.codecool.backend.controller;

import com.codecool.backend.model.Member;
import com.codecool.backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{postPublicId}")
    public UUID likePost(@PathVariable UUID postPublicId, @AuthenticationPrincipal Member member) {
        System.out.println(member);
        return likeService.likePost(postPublicId, member);
    }

    @DeleteMapping("/{postPublicId}")
    public UUID unlikePost(@PathVariable UUID postPublicId, @AuthenticationPrincipal Member member) {
        return likeService.unlikePost(postPublicId, member.getPublicId());
    }


}
