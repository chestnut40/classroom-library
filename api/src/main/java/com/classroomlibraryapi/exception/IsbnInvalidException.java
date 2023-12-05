package com.classroomlibraryapi.exception;

public class IsbnInvalidException extends Exception {
  public IsbnInvalidException() {
    super("Invalid ISBN");
  }

}
