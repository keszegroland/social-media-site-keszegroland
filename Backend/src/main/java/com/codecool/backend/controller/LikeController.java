package com.codecool.backend.controller;

import com.codecool.backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/like/{postPublicId}")
    public UUID likePost(@PathVariable UUID postPublicId, Principal principal) {
        return likeService.likePost(postPublicId, principal.getName());
    }

    @DeleteMapping("/unlike/{postPublicId}")
    public UUID unlikePost(@PathVariable UUID postPublicId, Principal principal) {
        return likeService.unlikePost(postPublicId, principal.getName());
    }

    @GetMapping("/")
    public Set<UUID> getLikesForLoggedInMember(Principal principal) {
        return likeService.getLikesForLoggedInMember(principal.getName());
    }

}
