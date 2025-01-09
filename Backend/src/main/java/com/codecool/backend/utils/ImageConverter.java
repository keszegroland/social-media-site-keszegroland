package com.codecool.backend.utils;

import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class ImageConverter {
    private final static String BASE64_PREFIX = "data:image/png;base64,";

    public byte[] toBytes(String pictureBase64Data) {
        if (pictureBase64Data != null && !pictureBase64Data.isEmpty()) {
            return Base64.getDecoder().decode(pictureBase64Data);
        }
        return null;
    }

    public String toBase64(byte[] picture) {
        String base64Image = null;
        if (picture != null) {
            base64Image = BASE64_PREFIX + Base64.getEncoder().encodeToString(picture);
        }
        return base64Image;
    }
}
