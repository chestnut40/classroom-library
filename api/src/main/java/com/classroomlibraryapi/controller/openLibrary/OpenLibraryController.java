package com.classroomlibraryapi.controller.openLibrary;

import com.classroomlibraryapi.exception.BookNotFoundException;
import com.classroomlibraryapi.exception.IsbnInvalidException;
import com.classroomlibraryapi.model.bookBox.Book;
import com.classroomlibraryapi.model.openLibrary.author.AuthorDetails;
import com.classroomlibraryapi.model.openLibrary.book.OpenLibraryBook;
import com.classroomlibraryapi.service.openLibrary.OpenLibraryBookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OpenLibraryController {

  @Autowired
  OpenLibraryBookService openLibraryBookService;

  public OpenLibraryController(OpenLibraryBookService openLibraryBookService) {
    this.openLibraryBookService = openLibraryBookService;
  }

  // ex. http://localhost:8080/getBook/openlibrary/9781946444523
  @GetMapping("/getBook/openlibrary/{isbn}")
  public Book getBookByIsbn(@PathVariable String isbn)
      throws IsbnInvalidException, BookNotFoundException {
    return openLibraryBookService.getBookByIsbn(isbn);
  }

  /*** testing endpoints below ***/

  // ex. http://localhost:8080/getBook/openlibrary/test/9781946444523
  @GetMapping("/getBook/openlibrary/test/{isbn}")
  public OpenLibraryBook getBookDetailsByIsbnTesting(@PathVariable String isbn) {
    return openLibraryBookService.getBookDetailsByIsbn(isbn);
  }

  // ex. http://localhost:8080/getAuthor/openlibrary/OL8464679A
  @GetMapping("/getAuthor/openlibrary/{id}")
  public AuthorDetails getAuthorDetailsById(@PathVariable String id) {
    return openLibraryBookService.getAuthorDetailsById(id);
  }

}
