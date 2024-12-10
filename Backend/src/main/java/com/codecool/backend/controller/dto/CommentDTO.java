package com.codecool.backend.controller.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record CommentDTO(UUID commentPublicId, String comment, LocalDateTime creationDate, MemberIdentityDTO member) {
}
