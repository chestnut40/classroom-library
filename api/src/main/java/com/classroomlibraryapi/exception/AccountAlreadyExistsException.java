package com.classroomlibraryapi.exception;

public class AccountAlreadyExistsException extends Exception {
    public AccountAlreadyExistsException() {
        super("Account with that email already exists");
    }

}
