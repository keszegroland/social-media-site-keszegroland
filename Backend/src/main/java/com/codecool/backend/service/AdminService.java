package com.codecool.backend.service;

import com.codecool.backend.controller.dto.MemberDTO;
import com.codecool.backend.controller.dto.PostDTO;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.MemberRole;
import com.codecool.backend.model.Role;
import com.codecool.backend.repository.MemberRepository;
import com.codecool.backend.repository.MemberRoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminService {
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final MemberRoleRepository memberRoleRepository;
    private final PostService postService;

    @Autowired
    public AdminService(MemberService memberService, MemberRepository memberRepository, MemberRoleRepository memberRoleRepository, PostService postService) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.memberRoleRepository = memberRoleRepository;
        this.postService = postService;
    }

    public List<PostDTO> getAllReportedPosts() {
        return postService.getAllReportedPosts();
    }

    public List<MemberDTO> getAllMemberDTOs() {
        return memberService.getAllMembers().stream().map(this::convertMemberToDTO).toList();
    }

    @Transactional
    public MemberDTO promoteUserToAdmin(String username) {
        Member member = memberService.getMemberByUsername(username);

        Optional<MemberRole> adminRole = memberRoleRepository.findByRole(Role.ROLE_ADMIN);

        if (adminRole.isEmpty()) {
            MemberRole newMemberRole = new MemberRole();
            newMemberRole.setRole(Role.ROLE_ADMIN);
            member.getRoles().add(newMemberRole);
            memberRoleRepository.save(newMemberRole);
        } else {
            member.getRoles().add(adminRole.get());
            memberRepository.save(member);
        }
        return convertMemberToDTO(member);
    }

    @Transactional
    public UUID deleteMemberByPublicId(UUID memberPublicId) {
        memberRepository.deleteByMemberPublicId(memberPublicId);
        return memberPublicId;
    }

    @Transactional
    public UUID deletePostByPublicId(UUID postPublicId) {
        return postService.deletePostByPublicId(postPublicId);
    }

    private MemberDTO convertMemberToDTO(Member member) {
        return new MemberDTO(member.getMemberPublicId(), member.getFirstName(), member.getLastName(), member.getUsername(), member.getEmail(), member.getRoles());
    }
}
