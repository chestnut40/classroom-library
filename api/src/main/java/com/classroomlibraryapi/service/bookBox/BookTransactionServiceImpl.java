package com.classroomlibraryapi.service.bookBox;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.classroomlibraryapi.entity.BookEntity;
import com.classroomlibraryapi.entity.BookTransactionEntity;
import com.classroomlibraryapi.entity.StudentEntity;
import com.classroomlibraryapi.model.bookBox.BookTransaction;
import com.classroomlibraryapi.repository.BookRepository;
import com.classroomlibraryapi.repository.BookTransactionRepository;
import com.classroomlibraryapi.repository.StudentRepository;
import com.classroomlibraryapi.service.mapper.BookTransactionMapper;

@Service
public class BookTransactionServiceImpl implements BookTransactionService {

    @Autowired
    BookTransactionRepository bookTransactionRepo;

    @Autowired
    BookRepository bookRepo;

    @Autowired
    StudentRepository studentRepo;

    @Autowired
    BookTransactionMapper mapper;

    @Override
    public BookTransaction borrowBook(Long bookId, Long studentId) {
        Optional<BookEntity> bookOptional = bookRepo.findById(bookId);
        Optional<StudentEntity> studentOptional = studentRepo.findById(studentId);
        BookTransactionEntity bookTransactionEntity = new BookTransactionEntity();

        if (bookOptional.isPresent()) {
            bookTransactionEntity.setBookEntity(bookOptional.get());
        } else {
            // throw error
        }

        if (studentOptional.isPresent()) {
            bookTransactionEntity.setBorrowerStudentEntity(studentOptional.get());
        } else {
            // throw error
        }

        LocalDateTime borrowDate = LocalDateTime.now();
        bookTransactionEntity.setBorrowed(borrowDate);

        BookTransactionEntity savedBookTransactionEntity = bookTransactionRepo
                .save(bookTransactionEntity);
        return mapper.mapToBookTransaction(savedBookTransactionEntity);
    }

    @Override
    public BookTransaction returnBook(Long transactionId, Long studentId) {
        Optional<BookTransactionEntity> bookTransactionOptional = bookTransactionRepo.findById(transactionId);
        if (bookTransactionOptional.isPresent()) {
            BookTransactionEntity bookTransactionEntity = bookTransactionOptional.get();
            LocalDateTime returnDate = LocalDateTime.now();
            bookTransactionEntity.setReturned(returnDate);
            Optional<StudentEntity> returnerStudentOptional = studentRepo.findById(studentId);
            if (returnerStudentOptional.isPresent()) {
                bookTransactionEntity.setReturnerStudentEntity(returnerStudentOptional.get());
            }
            BookTransactionEntity returnedBookTransactionEntity = bookTransactionRepo.save(bookTransactionEntity);
            return mapper.mapToBookTransaction(returnedBookTransactionEntity);
        }
        return new BookTransaction(transactionId, null, null, null, null, null);
    }

    @Override
    public BookTransaction getBorrowedBookTransaction(Long bookId) {
        return mapper.mapToBookTransaction(bookTransactionRepo.findByBookEntity_BookIdAndReturnedIsNull(bookId));
    }

    @Override
    public List<BookTransaction> getBookTransactionHistory(Long bookId) {
        return mapper
                .mapToBookTransactionList(bookTransactionRepo.findAllByBookEntity_BookIdOrderByBorrowedDesc(bookId));
    }

    @Override
    public List<BookTransaction> getBorrowedBooksByStudentId(Long borrowerStudentId) {
        return mapper.mapToBookTransactionList(bookTransactionRepo
                .findAllByBorrowerStudentEntity_IdAndReturnedIsNull(borrowerStudentId));
    }

}
