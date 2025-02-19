package com.codecool.backend.service;

import com.codecool.backend.controller.dto.NewPostDTO;
import com.codecool.backend.controller.dto.PostDTO;
import com.codecool.backend.controller.dto.ReportDTO;
import com.codecool.backend.exception.MemberIsAlreadyReportedException;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Picture;
import com.codecool.backend.model.Post;
import com.codecool.backend.model.Report;
import com.codecool.backend.repository.PostRepository;
import com.codecool.backend.repository.ReportRepository;
import jakarta.persistence.Lob;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final ReportRepository reportRepository;
    private final MemberService memberService;
    private final PictureService pictureService;

    @Autowired
    public PostService(PostRepository postRepository, ReportRepository reportRepository, MemberService memberService, PictureService pictureService) {
        this.postRepository = postRepository;
        this.reportRepository = reportRepository;
        this.memberService = memberService;
        this.pictureService = pictureService;
    }

    @Transactional
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
            post.setPictures(newPostDTO.pictures().stream().map(newPictureDTO -> pictureService.createPicture(newPictureDTO, post)).toList());
            post.setTags(newPostDTO.tags());
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

    protected Post getPostByPublicId(UUID postPublicId) {
        return postRepository.findByPostPublicId(postPublicId);
    }

    @Lob
    protected PostDTO convertPostToDTO(Post post) {
        List<Picture> pictures = post.getPictures();
        return new PostDTO(post.getPostPublicId(), post.getMember().getUsername(), post.getDescription(), pictures.stream().map(pictureService::convertPictureToDTO).toList(),
                post.getTags(), post.getCreationDate(), post.getMember().getFirstName(), post.getMember().getLastName(), post.getMember().getImageColor());
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
