package com.codecool.backend.controller;

import com.codecool.backend.controller.dto.PostDTO;
import com.codecool.backend.controller.dto.SavedPostDTO;
import com.codecool.backend.service.SaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/savedPosts")
public class SaveController {
    private final SaveService saveService;

    @Autowired
    public SaveController(SaveService saveService) {
        this.saveService = saveService;
    }

    @PostMapping("/save/{postPublicId}")
    public UUID savePost(@PathVariable UUID postPublicId, Principal principal) {
        return saveService.savePost(postPublicId, principal.getName());
    }

    @DeleteMapping("/unSave/{postPublicId}")
    public UUID unSavePost(@PathVariable UUID postPublicId, Principal principal) {
        return saveService.unSavePost(postPublicId, principal.getName());
    }

    @GetMapping("/data/{postPublicId}")
    public Boolean getSaveDataForPost(@PathVariable UUID postPublicId, Principal principal) {
        return saveService.getSaveDataForPost(postPublicId, principal.getName());
    }

    @GetMapping("/my-savedPosts")
    public Set<SavedPostDTO> getMySavedPosts(Principal principal) {
        return saveService.getSavedPostsForMember(principal.getName());
    }

    @GetMapping("/{postPublicId}")
    public PostDTO getSavedPostByPublicId(@PathVariable UUID postPublicId) {
        return saveService.getSavedPostByPublicId(postPublicId);
    }
}