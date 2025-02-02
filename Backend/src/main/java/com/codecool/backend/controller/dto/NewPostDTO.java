package com.codecool.backend.controller.dto;

import java.util.List;

public record NewPostDTO(String description, List<NewPictureDTO> pictures, String tags) {
}
