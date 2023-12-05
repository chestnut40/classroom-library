package com.classroomlibraryapi.controller.googleBooks;

import com.classroomlibraryapi.model.googleBooks.book.GoogleBook;
import com.classroomlibraryapi.model.googleBooks.volumeQuerySearchResult.VolumeQuerySearchResult;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
public class GoogleBooksController {

  // ex. http://localhost:8080/getBook/googlebooks/iaD7DAAAQBAJ
  @GetMapping("/getBook/googlebooks/{id}")
  public GoogleBook getBookDetails(@PathVariable String id) {
    UriComponents uri = UriComponentsBuilder.newInstance()
        .scheme("https")
        .host("www.googleapis.com")
        .path("/books/v1/volumes/" + id)
        .build();
    ResponseEntity<GoogleBook> bookResponseEntity = new RestTemplate().getForEntity(uri.toUriString(),
        GoogleBook.class);
    return bookResponseEntity.getBody();
  }

  // ex. http://localhost:8080/search?query=wonka
  @GetMapping("/search")
  public VolumeQuerySearchResult searchVolumes(@RequestParam String query) {
    UriComponents uri = UriComponentsBuilder.newInstance()
        .scheme("https")
        .host("www.googleapis.com")
        .path("/books/v1/volumes")
        .queryParam("q", query)
        .build();
    ResponseEntity<VolumeQuerySearchResult> searchResultResponseEntity =
        new RestTemplate().getForEntity(uri.toUriString(), VolumeQuerySearchResult.class);
    return searchResultResponseEntity.getBody();
  }

}
