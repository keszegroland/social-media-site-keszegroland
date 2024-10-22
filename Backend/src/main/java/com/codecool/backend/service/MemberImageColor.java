package com.codecool.backend.service;

import java.util.Random;

public enum MemberImageColor {
    PINK("#FD366E"),
    BLUE("#68A3FE"),
    TURQUOISE("#85DBD8"),
    ORANGE("#FE9567"),
    VIOLET("#7C67FE");

    private final String colorHexCode;

    MemberImageColor(String colorHexCode) {
        this.colorHexCode = colorHexCode;
    }

    private String getColorHexCode() {
        return colorHexCode;
    }

    public static String getRandomHexColor() {
        MemberImageColor[] colors = MemberImageColor.values();
        int colorIndex = new Random().nextInt(colors.length);
        return colors[colorIndex].getColorHexCode();
    }
}
