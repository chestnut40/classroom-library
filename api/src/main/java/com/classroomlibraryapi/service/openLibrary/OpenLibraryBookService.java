package com.classroomlibraryapi.service.openLibrary;

import static com.classroomlibraryapi.utils.Constants.COVER_SIZE;
import static com.classroomlibraryapi.utils.Constants.COVER_URL_ROOT;
import static com.classroomlibraryapi.utils.Constants.JPG;

import com.classroomlibraryapi.exception.BookNotFoundException;
import com.classroomlibraryapi.exception.IsbnInvalidException;
import com.classroomlibraryapi.model.bookBox.Book;
import com.classroomlibraryapi.model.openLibrary.author.AuthorDetails;
import com.classroomlibraryapi.model.openLibrary.book.AuthorKey;
import com.classroomlibraryapi.model.openLibrary.book.OpenLibraryBook;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class OpenLibraryBookService {

  public OpenLibraryBook getBookDetailsByIsbn(String isbn) {
    UriComponents uri = UriComponentsBuilder.newInstance()
        .scheme("https")
        .host("openlibrary.org")
        .path("/isbn/" + isbn + ".json")
        .build();
    ResponseEntity<OpenLibraryBook> bookResponseEntity = new RestTemplate().getForEntity(uri.toUriString(),
        OpenLibraryBook.class);
    return bookResponseEntity.getBody();
  }

  public AuthorDetails getAuthorDetailsById(String id) {
    UriComponents uri = UriComponentsBuilder.newInstance()
        .scheme("https")
        .host("openlibrary.org")
        .path("/authors/" + id + ".json")
        .build();
    ResponseEntity<AuthorDetails> bookResponseEntity = new RestTemplate().getForEntity(uri.toUriString(),
        AuthorDetails.class);
    return bookResponseEntity.getBody();
  }

  public Book getBookByIsbn(String isbn) throws BookNotFoundException, IsbnInvalidException {
    if (isbn == null || isbn.trim().length() < 1) {
      throw new IsbnInvalidException();
    }

    OpenLibraryBook openLibraryBook = null;
    try {
      openLibraryBook = getBookDetailsByIsbn(isbn);
    } catch (HttpClientErrorException e) {
      if (e.getRawStatusCode() == 404 && e.getStatusText().equals("Not Found")) {
        throw new BookNotFoundException();
      }
    }

    if (openLibraryBook != null) {
      List<String> authorIds = parseAuthorIds(openLibraryBook.getAuthorKeys());
      List<AuthorDetails> authorDetailsList = getAuthorDetailsList(authorIds);
      List<String> authors = new ArrayList<>();
      for (AuthorDetails authorDetails : authorDetailsList) {
        authors.add(authorDetails.getName());
      }
      return new Book(
          -1L,
          isbn,
          openLibraryBook.getTitle() != null ? openLibraryBook.getTitle() : "",
          openLibraryBook.getSubtitle() != null ? openLibraryBook.getSubtitle() : "",
          authors,
          null,
          null,
          COVER_URL_ROOT + isbn + COVER_SIZE + JPG,
          null);
    }

    return null;
  }

  private List<String> parseAuthorIds(List<AuthorKey> authorKeys) {
    List<String> authorIds = new ArrayList<>();
    if (authorKeys != null && !authorKeys.isEmpty()) {
      for (AuthorKey authorKey : authorKeys) {
        String[] keyParts = authorKey.getKey().split("/");
        String key = keyParts.length > 0 ? keyParts[keyParts.length - 1] : "";
        authorIds.add(key);
      }
    }
    return authorIds;
  }

  public List<AuthorDetails> getAuthorDetailsList(List<String> authorIds) {
    List<AuthorDetails> authorDetailsList = new ArrayList<>();
    for (String authorId : authorIds) {
      if (authorId != null && authorId.trim().length() > 1) {
        AuthorDetails authorDetails = getAuthorDetailsById(authorId);
        authorDetailsList.add(authorDetails);
      }
    }
    return authorDetailsList;
  }

}
