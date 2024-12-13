package com.codecool.backend.service;

import com.codecool.backend.controller.dto.PostDTO;
import com.codecool.backend.controller.dto.SavedPostDTO;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Post;
import com.codecool.backend.model.Save;
import com.codecool.backend.repository.SaveRepository;
import com.codecool.backend.utils.ImageConverter;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SaveService {
    private final SaveRepository saveRepository;
    private final PostService postService;
    private final MemberService memberService;
    private final ImageConverter imageConverter;

    @Autowired
    public SaveService(SaveRepository saveRepository, PostService postService, MemberService memberService, ImageConverter imageConverter) {
        this.saveRepository = saveRepository;
        this.postService = postService;
        this.memberService = memberService;
        this.imageConverter = imageConverter;
    }

    @Transactional
    public UUID savePost(UUID postPublicId, String username) {
        Member member = memberService.getMemberByUsername(username);
        Optional<Save> existingSave = saveRepository.findByPostPostPublicIdAndMemberMemberPublicId(postPublicId, member.getMemberPublicId());
        if (existingSave.isPresent()) {
            throw new RuntimeException("Member has already saved this post.");
        }
        Save newSave = new Save();
        newSave.setMember(member);
        Post savedPost = postService.getPostByPublicId(postPublicId);
        newSave.setPost(savedPost);
        saveRepository.save(newSave);
        return newSave.getSavePublicId();
    }

    @Transactional
    public UUID unSavePost(UUID postPublicId, String username) {
        Member member = memberService.getMemberByUsername(username);
        Optional<Save> save = saveRepository.findByPostPostPublicIdAndMemberMemberPublicId(postPublicId, member.getMemberPublicId());
        if (save.isPresent()) {
            saveRepository.delete(save.get());
            return save.get().getSavePublicId();
        } else {
            throw new RuntimeException("No save found for this post by user: " + username);
        }
    }

    @Transactional
    public Set<SavedPostDTO> getSavedPostsForMember(String username) {
        Member member = memberService.getMemberByUsername(username);
        Set<Save> saves = saveRepository.findByMemberMemberPublicId(member.getMemberPublicId());
        return saves.stream().map(this::convertSaveToSavePostDTO).collect(Collectors.toSet());
    }

    @Transactional
    public Boolean getSaveDataForPost(UUID postPublicId, String username) {
        Member member = memberService.getMemberByUsername(username);
        return saveRepository.findByPostPostPublicIdAndMemberMemberPublicId(postPublicId, member.getMemberPublicId()).isPresent();
    }

    @Transactional
    public PostDTO getSavedPostByPublicId(UUID postPublicId) {
        Post searchedPost = postService.getPostByPublicId(postPublicId);
        return postService.convertPostToDTO(searchedPost);
    }

    private SavedPostDTO convertSaveToSavePostDTO(Save save) {
        return new SavedPostDTO(save.getPost().getPostPublicId(), imageConverter.toBase64(save.getPost().getPicture()));
    }

}
