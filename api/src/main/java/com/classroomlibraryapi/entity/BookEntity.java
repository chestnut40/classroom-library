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

@Entity
@Table(name = BOOK_TABLE)
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = BOOK_ID_COLUMN)
    private Long bookId;

    @Column(name = ISBN_COLUMN)
    private String isbn;

    @Column(name = TITLE_COLUMN)
    private String title;

    @Column(name = SUBTITLE_COLUMN)
    private String subtitle;

    @Column(name = AUTHOR_1_COLUMN)
    private String author1;

    @Column(name = AUTHOR_2_COLUMN)
    private String author2;

    @Column(name = AUTHOR_3_COLUMN)
    private String author3;

    @Column(name = AUTHOR_4_COLUMN)
    private String author4;

    @Column(name = AR_LEVEL_COLUMN)
    private String arLevel;

    @ManyToOne
    @JoinColumn(name = "genre")
    private GenreEntity genreEntity;

    @Column(name = COVER_COLUMN)
    private String cover;

    @Column(name = NOTES_COLUMN)
    private String notes;

    public BookEntity() {

    }

    public BookEntity(Long bookId, String isbn, String title, String subtitle, String author1, String author2,
            String author3, String author4, String arLevel, GenreEntity genreEntity, String cover, String notes) {
        this.bookId = bookId;
        this.isbn = isbn;
        this.title = title;
        this.subtitle = subtitle;
        this.author1 = author1;
        this.author2 = author2;
        this.author3 = author3;
        this.author4 = author4;
        this.arLevel = arLevel;
        this.genreEntity = genreEntity;
        this.cover = cover;
        this.notes = notes;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getAuthor1() {
        return author1;
    }

    public void setAuthor1(String author1) {
        this.author1 = author1;
    }

    public String getAuthor2() {
        return author2;
    }

    public void setAuthor2(String author2) {
        this.author2 = author2;
    }

    public String getAuthor3() {
        return author3;
    }

    public void setAuthor3(String author3) {
        this.author3 = author3;
    }

    public String getAuthor4() {
        return author4;
    }

    public void setAuthor4(String author4) {
        this.author4 = author4;
    }

    public String getArLevel() {
        return arLevel;
    }

    public void setArLevel(String arLevel) {
        this.arLevel = arLevel;
    }

    public GenreEntity getGenreEntity() {
        return genreEntity;
    }

    public void setGenreEntity(GenreEntity genreEntity) {
        this.genreEntity = genreEntity;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

}