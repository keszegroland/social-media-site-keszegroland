package com.codecool.backend.controller.dto;

import java.util.UUID;

public record SavedPostDTO(UUID postPublicId, String picture) {
}
