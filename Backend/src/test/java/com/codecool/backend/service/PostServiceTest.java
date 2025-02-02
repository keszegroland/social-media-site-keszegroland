package com.codecool.backend.service;

import com.codecool.backend.controller.dto.NewPostDTO;
import com.codecool.backend.controller.dto.NewPictureDTO;
import com.codecool.backend.controller.dto.PostDTO;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.Picture;
import com.codecool.backend.model.Post;
import com.codecool.backend.repository.MemberRepository;
import com.codecool.backend.repository.PostRepository;
import com.codecool.backend.repository.ReportRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class PostServiceTest {
    @Mock
    private PostRepository postRepositoryMock;
    @Mock
    private ReportRepository reportRepositoryMock;
    @Mock
    private MemberService memberServiceMock;
    @Mock
    private MemberRepository memberRepositoryMock;
    @Mock
    private PictureService pictureServiceMock;

    private PostService postService;

    private Post post;

    private Member member;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        postService = new PostService(postRepositoryMock, reportRepositoryMock, memberServiceMock, pictureServiceMock);
        when(pictureServiceMock.createPicture(any(NewPictureDTO.class), any(Post.class))).thenReturn(new Picture());

        try {
            member = new Member();
            member.setFirstName("Nagy");
            member.setLastName("Lajos");
            member.setUsername("nagy_mancs");
            member.setPassword("Meow123");
            member.setEmail("mancs@gmail.com");
            memberRepositoryMock.save(member);

            post = new Post();
            post.setDescription("meow");
            post.setPictures(List.of(pictureServiceMock.createPicture(new NewPictureDTO(""), post)));
            post.setMember(member);
            postRepositoryMock.save(post);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private PostDTO convertPostToDTO(Post post) {
        return postService.convertPostToDTO(post);
    }

    @Test
    void testGetAllPosts() {
        List<Post> posts = List.of(post);
        when(postRepositoryMock.findAll()).thenReturn(posts);
        List<PostDTO> expected = List.of(convertPostToDTO(post));
        List<PostDTO> actual = postService.getAllPosts();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPostByMemberPublicId() {
        List<Post> posts = List.of(post);
        when(postRepositoryMock.findAllByMemberMemberPublicId(UUID.fromString("af584ddd-41b7-4fa3-b245-7a49f8c7316b"))).thenReturn(posts);
        List<PostDTO> expected = List.of(convertPostToDTO(post));
        List<PostDTO> actual = postService.getPostsByMemberPublicId(UUID.fromString("af584ddd-41b7-4fa3-b245-7a49f8c7316b"));
        assertEquals(expected, actual);
    }

    @Test
    void testCreateNewPostSuccessful() {
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        SecurityContextHolder.setContext(securityContext);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("nagy_mancs");

        when(memberRepositoryMock.findByUsername("nagy_mancs")).thenReturn(Optional.of(member));

        NewPostDTO newPostDTO = new NewPostDTO("meow", List.of(new NewPictureDTO("")), "");

        Post post2 = new Post();
        post2.setDescription(newPostDTO.description());
        post2.setPictures(newPostDTO.pictures().stream().map(pictureDTO -> pictureServiceMock.createPicture(pictureDTO, post)).toList());
        post2.setMember(member);
        UUID generatedUUID = UUID.fromString("af584ddd-41b7-4fa3-b245-7a49f8c7316b");

        when(postRepositoryMock.save(any(Post.class))).thenAnswer(invocation -> {
            Post savedPost = invocation.getArgument(0);
            savedPost.setPostPublicId(generatedUUID);
            return savedPost;
        });

        UUID actual = postService.createNewPost(newPostDTO, member.getUsername());

        assertEquals(generatedUUID, actual);
    }

    @Test
    void testCreateNewPostFail() {
        NewPostDTO postDTO = new NewPostDTO("meow", List.of(new NewPictureDTO("")), "");
        when(postRepositoryMock.save(any(Post.class))).thenThrow(RuntimeException.class);
        assertThrows(RuntimeException.class, () -> postService.createNewPost(postDTO, member.getUsername()));
    }
}
