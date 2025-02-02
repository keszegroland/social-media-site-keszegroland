package com.codecool.backend.controller.dto;

import java.util.List;
import java.util.UUID;

public record SavedPostDTO(UUID postPublicId, List<PictureDTO> pictures) {
}
