package com.codecool.backend.controller.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record PostDTO(UUID postPublicId, String username, String description, List<PictureDTO> pictures, String tags,
                      LocalDateTime creationDate, String memberFirstName, String memberLastName, String memberImageColor) {
}
