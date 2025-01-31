package com.codecool.backend.service;

import com.codecool.backend.controller.dto.NewPictureDTO;
import com.codecool.backend.controller.dto.PictureDTO;
import com.codecool.backend.model.Picture;
import com.codecool.backend.model.Post;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class PictureService {
    private final static String BASE64_PREFIX = "data:image/png;base64,";

    public Picture createPicture(NewPictureDTO pictureDTO, Post post) {
        Picture newPicture = new Picture();
        newPicture.setPicture(convertImageToByte(pictureDTO.picture()));
        newPicture.setPost(post);
        return newPicture;
    }

    protected PictureDTO convertPictureToDTO(Picture picture) {
        return new PictureDTO(picture.getPicturePublicId(), convertByteToBase64(picture.getPicture()));
    }

    private byte[] convertImageToByte(String pictureBase64Data) {
        if (pictureBase64Data != null && !pictureBase64Data.isEmpty()) {
            return Base64.getDecoder().decode(pictureBase64Data);
        }
        return null;
    }

    private String convertByteToBase64(byte[] picture) {
        String base64Image = null;
        if (picture != null) {
            base64Image = BASE64_PREFIX + Base64.getEncoder().encodeToString(picture);
        }
        return base64Image;
    }
}
