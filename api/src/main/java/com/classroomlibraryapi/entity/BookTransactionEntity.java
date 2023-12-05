package com.classroomlibraryapi.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import static com.classroomlibraryapi.utils.Constants.*;

import java.time.LocalDateTime;

@Entity
@Table(name = BOOK_TRANSACTION_TABLE)
public class BookTransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = TRANSACTION_ID_COLUMN)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "bookId")
    private BookEntity bookEntity;

    @ManyToOne
    @JoinColumn(name = "borrowerStudentId")
    private StudentEntity borrowerStudentEntity;

    @ManyToOne
    @JoinColumn(name = "returnerStudentId")
    private StudentEntity returnerStudentEntity;

    @Column(name = BORROWED_COLUMN)
    private LocalDateTime borrowed;

    @Column(name = RETURNED_COLUMN)
    private LocalDateTime returned;

    public BookTransactionEntity() {

    }

    public BookTransactionEntity(Long transactionId, BookEntity bookEntity, StudentEntity borrowerStudentEntity,
            StudentEntity returnerStudentEntity,
            LocalDateTime borrowed,
            LocalDateTime returned) {
        this.transactionId = transactionId;
        this.bookEntity = bookEntity;
        this.borrowerStudentEntity = borrowerStudentEntity;
        this.returnerStudentEntity = returnerStudentEntity;
        this.borrowed = borrowed;
        this.returned = returned;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public BookEntity getBookEntity() {
        return bookEntity;
    }

    public void setBookEntity(BookEntity bookEntity) {
        this.bookEntity = bookEntity;
    }

    public StudentEntity getBorrowerStudentEntity() {
        return borrowerStudentEntity;
    }

    public void setBorrowerStudentEntity(StudentEntity borrowerStudentEntity) {
        this.borrowerStudentEntity = borrowerStudentEntity;
    }

    public StudentEntity getReturnerStudentEntity() {
        return returnerStudentEntity;
    }

    public void setReturnerStudentEntity(StudentEntity returnerStudentEntity) {
        this.returnerStudentEntity = returnerStudentEntity;
    }

    public LocalDateTime getBorrowed() {
        return borrowed;
    }

    public void setBorrowed(LocalDateTime borrowed) {
        this.borrowed = borrowed;
    }

    public LocalDateTime getReturned() {
        return returned;
    }

    public void setReturned(LocalDateTime returned) {
        this.returned = returned;
    }

}
