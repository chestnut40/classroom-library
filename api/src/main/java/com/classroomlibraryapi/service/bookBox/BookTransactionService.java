package com.classroomlibraryapi.service.bookBox;

import java.util.List;

import org.springframework.stereotype.Service;

import com.classroomlibraryapi.model.bookBox.BookTransaction;

@Service
public interface BookTransactionService {

    BookTransaction borrowBook(Long bookId, Long studentId);

    BookTransaction returnBook(Long transactionId, Long studentId);

    BookTransaction getBorrowedBookTransaction(Long bookId);

    List<BookTransaction> getBookTransactionHistory(Long bookId);

    List<BookTransaction> getBorrowedBooksByStudentId(Long borrowerStudentId);

}
