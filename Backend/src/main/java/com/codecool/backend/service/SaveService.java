package com.codecool.backend.service;

import com.codecool.backend.model.Member;
import com.codecool.backend.model.Save;
import com.codecool.backend.repository.MemberRepository;
import com.codecool.backend.repository.SaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SaveService {
    private final SaveRepository saveRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public SaveService(SaveRepository saveRepository, MemberRepository memberRepository) {
        this.saveRepository = saveRepository;
        this.memberRepository = memberRepository;
    }

    public UUID savePost(UUID postPublicId, String username) {
        Member member = findMemberByUsername(username);
        Optional<Save> existingSave = saveRepository.findByPostPublicIdAndMemberPublicId(postPublicId, member.getPublicId());
        if(existingSave.isPresent()) {
            throw new RuntimeException("Member has already ");
        }
        return null;
    }

    public UUID unSavePost(UUID postPublicId, String username) {
        Member member = findMemberByUsername(username);
        return null;
    }

    private Member findMemberByUsername(String username) {
        return memberRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Member not found with username: " + username));
    }

}
