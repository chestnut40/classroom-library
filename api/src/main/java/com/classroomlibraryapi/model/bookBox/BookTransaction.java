package com.classroomlibraryapi.model.bookBox;

public class BookTransaction {
    private Long transactionId;
    private Book book;
    private Student borrowerStudent;
    private Student returnerStudent;
    private String borrowed;
    private String returned;

    public BookTransaction(Long transactionId, Book book, Student borrowerStudent, Student returnerStudent,
            String borrowed,
            String returned) {
        this.transactionId = transactionId;
        this.book = book;
        this.borrowerStudent = borrowerStudent;
        this.returnerStudent = returnerStudent;
        this.borrowed = borrowed;
        this.returned = returned;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Student getBorrowerStudent() {
        return borrowerStudent;
    }

    public void setBorrowerStudent(Student borrowerStudent) {
        this.borrowerStudent = borrowerStudent;
    }

    public Student getReturnerStudent() {
        return returnerStudent;
    }

    public void setReturnerStudent(Student returnerStudent) {
        this.returnerStudent = returnerStudent;
    }

    public String getBorrowed() {
        return borrowed;
    }

    public void setBorrowed(String borrowed) {
        this.borrowed = borrowed;
    }

    public String getReturned() {
        return returned;
    }

    public void setReturned(String returned) {
        this.returned = returned;
    }

}
