package com.classroomlibraryapi.controller.bookBox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.classroomlibraryapi.exception.BookNotFoundException;
import com.classroomlibraryapi.exception.IsbnInvalidException;
import com.classroomlibraryapi.model.bookBox.Book;
import com.classroomlibraryapi.model.bookBox.BookTransaction;
import com.classroomlibraryapi.model.bookBox.Genre;
import com.classroomlibraryapi.service.bookBox.BookService;
import com.classroomlibraryapi.service.bookBox.BookTransactionService;
import com.classroomlibraryapi.service.bookBox.GenreService;

import static com.classroomlibraryapi.utils.Constants.TITLE_COLUMN;

import java.util.List;

@RestController
public class BookBoxController {

    @Autowired
    private BookService bookService;
    @Autowired
    private BookTransactionService bookTransactionService;
    @Autowired
    private GenreService genreService;

    public BookBoxController(BookService bookService) {
        this.bookService = bookService;
    }

    // ex. http://localhost:8080/bookbox/9781946444523
    @GetMapping("/bookbox/{isbn}")
    public Book findByIsbn(@PathVariable String isbn) throws BookNotFoundException, IsbnInvalidException {
        return bookService.findByIsbn(isbn);
    }

    // ex. http://localhost:8080/bookbox
    @GetMapping("/bookbox")
    public List<Book> findAll() {
        return bookService.getAllBooksAscending(TITLE_COLUMN);
    }

    // ex. http://localhost:8080/bookbox
    @PostMapping("/bookbox")
    public Book addBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    // ex. http://localhost:8080/bookbox
    @PutMapping("/bookbox")
    public Book updateBook(@RequestBody Book book) {
        return bookService.updateBook(book);
    }

    // ex. http://localhost:8080/bookbox/9
    @DeleteMapping(value = "/bookbox/{id}")
    public Book removeBook(@PathVariable Long id) {
        return bookService.removeBook(id);
    }

    // ex. http://localhost:8080/bookbox/borrow/4/5
    @PostMapping(value = "/bookbox/borrow/{bookId}/{studentId}")
    public BookTransaction borrowBook(@PathVariable Long bookId, @PathVariable Long studentId) {
        return bookTransactionService.borrowBook(bookId, studentId);
    }

    // ex. http://localhost:8080/bookbox/return/3/5
    @PostMapping(value = "/bookbox/return/{transactionId}/{studentId}")
    public BookTransaction returnBook(@PathVariable Long transactionId, @PathVariable Long studentId) {
        return bookTransactionService.returnBook(transactionId, studentId);
    }

    // ex. http://localhost:8080/bookbox/borrow-transaction/9
    @GetMapping("/bookbox/borrow-transaction/{bookId}")
    public BookTransaction getBorrowedBookTransaction(@PathVariable Long bookId) {
        return bookTransactionService.getBorrowedBookTransaction(bookId);
    }

    // ex. http://localhost:8080/bookbox/borrow-transaction/history/9
    @GetMapping("/bookbox/borrow-transaction/history/{bookId}")
    public List<BookTransaction> getBookTransactionHistory(@PathVariable Long bookId) {
        return bookTransactionService.getBookTransactionHistory(bookId);
    }

    // ex. http://localhost:8080/bookbox/borrow/4
    @GetMapping(value = "/bookbox/borrow/{studentId}")
    public List<BookTransaction> getBorrowedBooksByStudentId(@PathVariable Long studentId) {
        return bookTransactionService.getBorrowedBooksByStudentId(studentId);
    }

    // ex. http://localhost:8080/bookbox/genres
    @GetMapping("/bookbox/genres")
    public List<Genre> getGenres() {
        return genreService.getAllGenres();
    }

}
