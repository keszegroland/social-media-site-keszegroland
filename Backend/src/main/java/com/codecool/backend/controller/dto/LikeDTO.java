package com.codecool.backend.controller.dto;

public record LikeDTO(boolean isPostLiked, String usernameOfTheFirstLiker, int numberOfLikes) {
}
