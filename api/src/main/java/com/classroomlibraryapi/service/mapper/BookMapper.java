package com.classroomlibraryapi.service.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.classroomlibraryapi.entity.BookEntity;
import com.classroomlibraryapi.model.bookBox.Book;

@Component
public class BookMapper {

    @Autowired
    private GenreMapper genreMapper;

    public Book mapToBook(BookEntity bookEntity) {
        List<String> authors = new ArrayList<>();
        authors.add(bookEntity.getAuthor1());
        authors.add(bookEntity.getAuthor2());
        authors.add(bookEntity.getAuthor3());
        authors.add(bookEntity.getAuthor4());
        return new Book(
                bookEntity.getBookId(),
                bookEntity.getIsbn(),
                bookEntity.getTitle(),
                bookEntity.getSubtitle(),
                authors,
                bookEntity.getArLevel(),
                genreMapper.mapToGenre(bookEntity.getGenreEntity()),
                bookEntity.getCover(),
                bookEntity.getNotes());
    }

    public List<Book> mapToBookList(List<BookEntity> bookEntityList) {
        List<Book> books = new ArrayList<>();
        bookEntityList.stream().forEach(
                bookEntity -> books.add(mapToBook(bookEntity)));
        return books;
    }

    public BookEntity mapToBookEntity(Book book) {
        return new BookEntity(
                null,
                book.getIsbn(),
                book.getTitle(),
                book.getSubtitle(),
                !book.getAuthors().isEmpty() ? book.getAuthors().get(0) : null,
                book.getAuthors().size() > 1 ? book.getAuthors().get(1) : null,
                book.getAuthors().size() > 2 ? book.getAuthors().get(2) : null,
                book.getAuthors().size() > 3 ? book.getAuthors().get(3) : null,
                book.getArLevel(),
                genreMapper.mapToGenreEntity(book.getGenre()),
                book.getCover(),
                book.getNotes());
    }

    public List<BookEntity> mapToBookEntityList(List<Book> bookList) {
        return bookList.stream().map(this::mapToBookEntity).toList();
    }

}
