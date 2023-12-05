package com.classroomlibraryapi.service.bookBox;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.classroomlibraryapi.entity.BookEntity;
import com.classroomlibraryapi.entity.BookTransactionEntity;
import com.classroomlibraryapi.exception.BookNotFoundException;
import com.classroomlibraryapi.exception.IsbnInvalidException;
import com.classroomlibraryapi.model.bookBox.Book;
import com.classroomlibraryapi.repository.BookRepository;
import com.classroomlibraryapi.repository.BookTransactionRepository;
import com.classroomlibraryapi.service.mapper.BookMapper;
import com.classroomlibraryapi.service.mapper.GenreMapper;
import com.classroomlibraryapi.service.openLibrary.OpenLibraryBookService;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository bookRepo;
    @Autowired
    BookTransactionRepository bookTransactionRepo;
    @Autowired
    BookMapper bookMapper;
    @Autowired
    GenreMapper genreMapper;

    @Override
    public Book findByIsbn(String isbn) throws BookNotFoundException, IsbnInvalidException {
        BookEntity bookEntity = bookRepo.findByIsbn(isbn);
        if (bookEntity == null) {
            OpenLibraryBookService openLibraryBookService = new OpenLibraryBookService();
            return openLibraryBookService.getBookByIsbn(isbn);
        }
        return bookMapper.mapToBook(bookEntity);
    }

    @Override
    public List<Book> getAllBooksAscending(String sortColumn) {
        return bookMapper.mapToBookList(bookRepo.findAll(Sort.by(Sort.Direction.ASC, sortColumn)));
    }

    @Override
    public List<Book> getAllBooksDescending(String sortColumn) {
        return bookMapper.mapToBookList(bookRepo.findAll(Sort.by(Sort.Direction.DESC, sortColumn)));
    }

    @Override
    public Book saveBook(Book book) {
        BookEntity bookEntity = bookRepo.save(bookMapper.mapToBookEntity(book));
        return bookMapper.mapToBook(bookEntity);
    }

    @Override
    public Book updateBook(Book book) {
        Optional<BookEntity> bookEntityOptional = bookRepo.findById(book.getId());
        if (bookEntityOptional.isPresent()) {
            BookEntity bookEntity = bookEntityOptional.get();
            bookEntity.setTitle(book.getTitle());
            bookEntity.setAuthor1(!book.getAuthors().isEmpty() ? book.getAuthors().get(0) : null);
            bookEntity.setAuthor2(book.getAuthors().size() > 1 ? book.getAuthors().get(1) : null);
            bookEntity.setAuthor3(book.getAuthors().size() > 2 ? book.getAuthors().get(2) : null);
            bookEntity.setAuthor4(book.getAuthors().size() > 3 ? book.getAuthors().get(3) : null);
            bookEntity.setGenreEntity(genreMapper.mapToGenreEntity(book.getGenre()));
            bookEntity.setArLevel(book.getArLevel());
            bookEntity.setNotes(book.getNotes());

            return bookMapper.mapToBook(bookRepo.save(bookEntity));
        }
        return null;
    }

    @Override
    public Book removeBook(Long id) {
        Optional<BookEntity> bookEntity = bookRepo.findById(id);
        if (bookEntity.isPresent()) {
            List<BookTransactionEntity> bookTransactionEntities = bookTransactionRepo
                    .findAllByBookEntity_BookIdOrderByBorrowedDesc(id);
            if (!bookTransactionEntities.isEmpty()) {
                bookTransactionEntities.forEach(transaction -> bookTransactionRepo.delete(transaction));
            }
            bookRepo.deleteById(id);
            bookEntity.get().setBookId(-1L);
            return bookMapper.mapToBook(bookEntity.get());
        }
        return new Book(null, null, null, null, null, null, null, null, null);
    }

}
