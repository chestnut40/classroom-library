package com.classroomlibraryapi.service.bookBox;

import java.util.List;

import org.springframework.stereotype.Service;

import com.classroomlibraryapi.exception.BookNotFoundException;
import com.classroomlibraryapi.exception.IsbnInvalidException;
import com.classroomlibraryapi.model.bookBox.Book;

@Service
public interface BookService {
    Book findByIsbn(String isbn) throws BookNotFoundException, IsbnInvalidException;

    List<Book> getAllBooksAscending(String sortColumn);

    List<Book> getAllBooksDescending(String sortColumn);

    Book saveBook(Book book);

    Book updateBook(Book book);

    Book removeBook(Long studentId);

}
