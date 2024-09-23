package com.codecool.backend.controller;

import com.codecool.backend.exception.MemberIsAlreadyExistsException;
import com.codecool.backend.exception.MemberIsAlreadyReportedException;
import com.codecool.backend.exception.MemberIsNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class MemberControllerAdvice {
    @ResponseBody
    @ExceptionHandler(MemberIsAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String memberIsAlreadyExistsExceptionHandler(MemberIsAlreadyExistsException e) {
        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(MemberIsNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String memberIsNotFoundExceptionHandler(MemberIsNotFoundException e) {
        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(MemberIsAlreadyReportedException.class)
    @ResponseStatus(HttpStatus.ALREADY_REPORTED)
    public String memberIsAlreadyReportedExceptionHandler(MemberIsAlreadyReportedException e) {
        return e.getMessage();
    }
}
