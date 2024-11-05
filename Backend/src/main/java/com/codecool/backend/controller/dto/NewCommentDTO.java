package com.codecool.backend.controller.dto;

import java.util.UUID;

public record NewCommentDTO(String comment, String username, UUID postPublicId) {
}
