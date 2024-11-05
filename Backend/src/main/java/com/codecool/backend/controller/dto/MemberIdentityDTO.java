package com.codecool.backend.controller.dto;

import java.util.UUID;

public record MemberIdentityDTO(UUID memberPublicId, String firstName, String lastName, String username, String imageColor) {
}
