package com.codecool.backend.controller.dto;

import java.util.UUID;

public record MemberIdentityDTO(UUID publicId, String firstName, String lastName, String username) {
}
