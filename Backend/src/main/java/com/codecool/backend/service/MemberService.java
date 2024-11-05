package com.codecool.backend.service;

import com.codecool.backend.controller.dto.MemberIdentityDTO;
import com.codecool.backend.controller.dto.MemberLoginDTO;
import com.codecool.backend.controller.dto.NewMemberDTO;
import com.codecool.backend.exception.MemberIsAlreadyExistsException;
import com.codecool.backend.exception.MemberIsNotFoundException;
import com.codecool.backend.model.Member;
import com.codecool.backend.model.MemberRole;
import com.codecool.backend.model.Role;
import com.codecool.backend.model.payload.JwtResponse;
import com.codecool.backend.repository.MemberRepository;
import com.codecool.backend.repository.MemberRoleRepository;
import com.codecool.backend.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final MemberRoleRepository memberRoleRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils, MemberRoleRepository memberRoleRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.memberRoleRepository = memberRoleRepository;
    }

    public UUID createNewMember(NewMemberDTO memberDTO) {
        if (memberRepository.findByUsername(memberDTO.username()).isPresent()) {
            throw new MemberIsAlreadyExistsException(format("member %s already exists", memberDTO.username()));
        }

        Member newMember = createMemberEntity(memberDTO);
        Optional<MemberRole> userRole = memberRoleRepository.findByRole(Role.ROLE_USER);

        if (userRole.isEmpty()) {
            MemberRole newMemberRole = new MemberRole();
            newMemberRole.setRole(Role.ROLE_USER);
            newMember.getRoles().add(newMemberRole);
            memberRoleRepository.save(newMemberRole);
        } else {
            newMember.getRoles().add(userRole.get());
        }
        memberRepository.save(newMember);
        System.out.println(newMember.getRoles());
        return newMember.getMemberPublicId();
    }

    private Member createMemberEntity(NewMemberDTO memberDTO) {
        Member member = new Member();
        member.setFirstName(memberDTO.firstName());
        member.setLastName(memberDTO.lastName());
        member.setUsername(memberDTO.username());
        member.setPassword(passwordEncoder.encode(memberDTO.password()));
        member.setEmail(memberDTO.email());
        member.setImageColor(MemberImageColor.getRandomHexColor());
        return member;
    }

    public JwtResponse loginMember(MemberLoginDTO loginMember) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginMember.username(), loginMember.password()));
        String jwt = jwtUtils.generateJwtToken(authentication);
        User userDetails = (User) authentication.getPrincipal();
        Set<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());
        return new JwtResponse(jwt, userDetails.getUsername(), roles);
    }

    public MemberIdentityDTO getMemberIdentity(String username) {
        Member member = getMemberByUsername(username);
        return convertMemberToMemberIdentityDTO(member);
    }

    public Set<MemberIdentityDTO> getAllMemberIdentities() {
        return getAllMembers().stream()
                .map(this::convertMemberToMemberIdentityDTO)
                .collect(Collectors.toSet());
    }

    private MemberIdentityDTO convertMemberToMemberIdentityDTO(Member member) {
        return new MemberIdentityDTO(member.getMemberPublicId(), member.getFirstName(), member.getLastName(), member.getUsername(), member.getImageColor());
    }

    protected Set<Member> getAllMembers() {
        return new HashSet<>(memberRepository.findAll());
    }

    protected Member getMemberByUsername(String username) {
        return memberRepository.findByUsername(username)
                .orElseThrow(() -> new MemberIsNotFoundException(format("Member with username %s could not be found in the database.", username)));
    }

}
