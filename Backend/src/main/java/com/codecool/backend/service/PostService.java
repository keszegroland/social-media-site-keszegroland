package com.codecool.backend.service;

import com.codecool.backend.controller.dto.NewPostDTO;
import com.codecool.backend.controller.dto.PostDTO;
import com.codecool.backend.controller.dto.ReportDTO;
import com.codecool.backend.exception.MemberIsAlreadyReportedException;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Post;
import com.codecool.backend.model.Report;
import com.codecool.backend.repository.PostRepository;
import com.codecool.backend.repository.ReportRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final ReportRepository reportRepository;
    private final MemberService memberService;

    @Autowired
    public PostService(PostRepository postRepository, ReportRepository reportRepository, MemberService memberService) {
        this.postRepository = postRepository;
        this.reportRepository = reportRepository;
        this.memberService = memberService;
    }

    public List<PostDTO> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(this::convertPostToDTO).toList();
    }

    public List<PostDTO> getPostsByMemberPublicId(UUID memberPublicId) {
        List<Post> postsByMemberId = postRepository.findAllByMemberMemberPublicId(memberPublicId);
        return postsByMemberId.stream().map(this::convertPostToDTO).toList();
    }

    @Transactional
    public UUID createNewPost(NewPostDTO newPostDTO, String username) {
        try {
            Post post = new Post();
            Member member = memberService.getMemberByUsername(username);
            post.setMember(member);
            post.setDescription(newPostDTO.description());
            post.setPicture(convertBase64Image(newPostDTO));
            postRepository.save(post);
            return post.getPostPublicId();
        } catch (RuntimeException e) {
            throw new RuntimeException("Error creating a new post. " + e.getMessage());
        }
    }

    @Transactional
    public void reportPost(ReportDTO reportDtO, String username) {
        Post post = postRepository.findByPostPublicId(reportDtO.postPublicId());
        Member member = memberService.getMemberByUsername(username);
        if (reportRepository.findReportByMemberAndPostPostId(member, post.getPostId()).isPresent()) {
            throw new MemberIsAlreadyReportedException("Member already have a report in this post.");
        }
        Report report = new Report();
        report.setMember(member);
        report.setPost(post);
        report.setReasonOfReport(reportDtO.reason());
        reportRepository.save(report);
        post.setNumOfReport(post.getReports().size());
        postRepository.save(post);
    }

    private byte[] convertBase64Image(NewPostDTO newPostDTO) {
        String pictureBase64Data = newPostDTO.picture();
        if (pictureBase64Data != null && !pictureBase64Data.isEmpty()) {
            return Base64.getDecoder().decode(pictureBase64Data);
        }
        return null;
    }

    protected String convertImageToBase64(byte[] picture) {
        String base64Image = null;
        if (picture != null) {
            base64Image = "data:image/png;base64," + Base64.getEncoder().encodeToString(picture);
        }
        return base64Image;
    }

    protected Post getPostByPublicId(UUID postPublicId) {
        return postRepository.findByPostPublicId(postPublicId);
    }

    protected PostDTO convertPostToDTO(Post post) {
        return new PostDTO(post.getPostPublicId(), post.getMember().getUsername(), post.getDescription(), convertImageToBase64(post.getPicture()), post.getCreationDate(), post.getMember().getFirstName(), post.getMember().getLastName(), post.getMember().getImageColor());
    }

    protected List<PostDTO> getAllReportedPosts() {
        List<Post> reportedPosts = postRepository.findByNumOfReportGreaterThan(0);
        return reportedPosts.stream().map(this::convertPostToDTO).toList();
    }

    protected UUID deletePostByPublicId(UUID postPublicId) {
        postRepository.deleteByPostPublicId(postPublicId);
        return postPublicId;
    }
}
