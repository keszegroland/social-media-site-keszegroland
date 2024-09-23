package com.codecool.backend.exception;

public class MemberIsAlreadyExistsException extends RuntimeException {
    public MemberIsAlreadyExistsException(String message) {
        super(message);
    }
}
