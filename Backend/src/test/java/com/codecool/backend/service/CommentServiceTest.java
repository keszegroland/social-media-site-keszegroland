package com.codecool.backend.service;

import com.codecool.backend.controller.dto.NewCommentDTO;
import com.codecool.backend.controller.dto.NewPictureDTO;
import com.codecool.backend.model.Comment;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Picture;
import com.codecool.backend.model.Post;
import com.codecool.backend.repository.CommentRepository;
import com.codecool.backend.repository.MemberRepository;
import com.codecool.backend.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class CommentServiceTest {
    @Mock
    private PictureService pictureServiceMock;
    @Mock
    private CommentRepository commentRepositoryMock;
    @Mock
    private MemberService memberServiceMock;
    @Mock
    private PostService postServiceMock;
    @Mock
    private MemberRepository memberRepositoryMock;
    @Mock
    private PostRepository postRepositoryMock;

    private CommentService commentService;
    private Member member;
    private Post post;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        this.commentService = new CommentService(commentRepositoryMock, memberServiceMock, postServiceMock);
        when(pictureServiceMock.createPicture(any(NewPictureDTO.class), any(Post.class))).thenReturn(new Picture());

        try {
            member = new Member();
            member.setFirstName("Nagy");
            member.setLastName("Lajos");
            member.setUsername("nagy_mancs");
            member.setPassword("Meow123");
            member.setEmail("mancs@gmail.com");
            memberRepositoryMock.save(member);
            member.setMemberPublicId(UUID.fromString("efc544d8-9ed6-4dfb-968b-1b939d202ee8"));

            post = new Post();
            post.setMember(member);
            post.setDescription("meow");
            post.setPictures(List.of(pictureServiceMock.createPicture(new NewPictureDTO(""), post)));
            post.setNumOfReport(0);
            postRepositoryMock.save(post);
            post.setPostPublicId(UUID.fromString("f356a8e1-2832-4764-8eba-60fc29ba3cef"));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Test
    void testCreateCommentSuccessful() {
        NewCommentDTO commentDTO = new NewCommentDTO("I like this post!");
        UUID generatedId = UUID.fromString("1bdd6b66-4064-410d-9e74-eeaddb913796");
        when(memberRepositoryMock.findByMemberPublicId(UUID.fromString("efc544d8-9ed6-4dfb-968b-1b939d202ee8"))).thenReturn(Optional.of(member));
        when(commentRepositoryMock.save(any(Comment.class))).thenAnswer(invocation -> {
            Comment savedComment = invocation.getArgument(0);
            savedComment.setCommentPublicId(generatedId);
            return savedComment;
        });
        UUID actual = commentService.createComment(commentDTO, post.getPostPublicId(), member.getUsername());
        assertEquals(generatedId, actual);
    }

    @Test
    void testCreateCommentFailed() {
        NewCommentDTO commentDTO = new NewCommentDTO("I like this post!");
        when(commentRepositoryMock.save(any(Comment.class))).thenThrow(new RuntimeException());
        assertThrows(RuntimeException.class, () -> commentService.createComment(commentDTO, post.getPostPublicId(), member.getUsername()));
    }
}
