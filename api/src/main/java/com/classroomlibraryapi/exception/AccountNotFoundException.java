package com.classroomlibraryapi.exception;

public class AccountNotFoundException extends Exception {
    public AccountNotFoundException() {
        super("Invalid username or password");
    }

}
