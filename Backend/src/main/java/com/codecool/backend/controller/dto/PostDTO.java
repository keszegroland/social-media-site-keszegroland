package com.codecool.backend.controller.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record PostDTO(UUID postPublicId, String username, String description, String picture,
                      LocalDateTime creationDate, String memberFirstName, String memberLastName, String memberImageColor) {
}
