package com.codecool.backend.service;

import com.codecool.backend.controller.dto.MemberDTO;
import com.codecool.backend.controller.dto.PostDTO;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.MemberRole;
import com.codecool.backend.model.Post;
import com.codecool.backend.model.Role;
import com.codecool.backend.repository.MemberRepository;
import com.codecool.backend.repository.MemberRoleRepository;
import com.codecool.backend.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class AdminServiceTest {
    @Mock
    private MemberService memberService;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private MemberRoleRepository memberRoleRepository;
    @Mock
    private PostService postService;
    @Mock
    private PostRepository postRepository;

    private AdminService adminService;


    private Post post;
    private Member member;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        this.adminService = new AdminService(memberService, memberRepository, memberRoleRepository, postService);

        member = new Member();
        member.setFirstName("Nagy");
        member.setLastName("Lajos");
        member.setUsername("nagyLajos");
        member.setPassword("myPassword");
        member.setEmail("nagyLajos@gmail.com");
        member.setMemberPublicId(UUID.fromString("efc544d8-9ed6-4dfb-968b-1b939d202ee8"));

        post = new Post();
        post.setPostPublicId(UUID.fromString("1a2b3c4d-9ed6-4dfb-968b-1b939d202ee8"));
        post.setDescription("meow");
        post.setPicture("".getBytes());
        post.setMember(member);
        post.setNumOfReport(2);
    }

    @Test
    void testGetAllReportedPosts() {
        PostDTO postDTO = new PostDTO(post.getPostPublicId(), post.getMember().getUsername(), post.getDescription(), "", "", post.getCreationDate(), post.getMember().getFirstName(), post.getMember().getLastName(), post.getMember().getImageColor());
        when(postService.getAllReportedPosts()).thenReturn(List.of(postDTO));
        adminService.getAllReportedPosts();
        verify(postService).getAllReportedPosts();
    }

    @Test
    void testGetAllMemberDTOs() {
        List<Member> members = List.of(member);
        List<MemberDTO> expectedMembers = members.stream()
                .map(member -> new MemberDTO(member.getMemberPublicId(), member.getFirstName(), member.getLastName(), member.getUsername(), member.getEmail(), member.getRoles()))
                .toList();
        when(memberService.getAllMembers()).thenReturn(new HashSet<>(members));
        List<MemberDTO> actualMembers = adminService.getAllMemberDTOs();
        verify(memberService).getAllMembers();
        assertEquals(expectedMembers, actualMembers);
    }

    @Test
    void testPromoteUserToAdmin_WhenUserDoesNotHaveAdminRole() {
        when(memberService.getMemberByUsername("nagyLajos")).thenReturn(member);
        when(memberRoleRepository.findByRole(Role.ROLE_ADMIN)).thenReturn(Optional.empty());
        MemberRole role = new MemberRole();
        role.setRole(Role.ROLE_ADMIN);
        member.addRole(role);
        MemberDTO expected = new MemberDTO(member.getMemberPublicId(), member.getFirstName(), member.getLastName(),
                member.getUsername(), member.getEmail(), member.getRoles());
        MemberDTO actual = adminService.promoteUserToAdmin("nagyLajos");
        assertEquals(expected, actual);
        Mockito.verify(memberRoleRepository).save(any(MemberRole.class));
    }

    @Test
    void testPromoteUserToAdmin_WhenUserHasAdminRole() {
        MemberRole role = new MemberRole();
        role.setRole(Role.ROLE_ADMIN);
        member.addRole(role);

        when(memberService.getMemberByUsername("nagyLajos")).thenReturn(member);
        when(memberRoleRepository.findByRole(Role.ROLE_ADMIN)).thenReturn(Optional.of(role));

        MemberDTO expected = new MemberDTO(member.getMemberPublicId(), member.getFirstName(), member.getLastName(),
                member.getUsername(), member.getEmail(), member.getRoles());
        MemberDTO actual = adminService.promoteUserToAdmin("nagyLajos");
        assertEquals(expected, actual);
    }
}
