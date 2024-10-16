package com.codecool.backend.controller;

import com.codecool.backend.controller.dto.MemberIdentityDTO;
import com.codecool.backend.controller.dto.MemberLoginDTO;
import com.codecool.backend.controller.dto.NewMemberDTO;
import com.codecool.backend.model.payload.JwtResponse;
import com.codecool.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public UUID signUp(@RequestBody NewMemberDTO member) {
        return memberService.createNewMember(member);
    }

    @PostMapping("/login")
    public JwtResponse loginMember(@RequestBody MemberLoginDTO member) {
        return memberService.loginMember(member);
    }

    @GetMapping("/identity")
    @PreAuthorize("isAuthenticated()")
    public MemberIdentityDTO getMemberIdentity(Principal principal) {
        return memberService.getMemberIdentity(principal.getName());
    }

    @GetMapping("/all")
    public Set<MemberIdentityDTO> getAllMembers() {
        return memberService.getAllMembers();
    }
}
