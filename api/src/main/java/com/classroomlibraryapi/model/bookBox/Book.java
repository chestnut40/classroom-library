package com.classroomlibraryapi.model.bookBox;

import java.util.List;

public class Book {
  private Long id;
  private String isbn;
  private String title;
  private String subtitle;
  private List<String> authors;
  private String arLevel;
  private Genre genre;
  private String cover;
  private String notes;

  public Book(Long id, String isbn, String title, String subtitle, List<String> authors, String arLevel, Genre genre,
      String cover, String notes) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.subtitle = subtitle;
    this.authors = authors;
    this.arLevel = arLevel;
    this.genre = genre;
    this.cover = cover;
    this.notes = notes;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public List<String> getAuthors() {
    return authors;
  }

  public void setAuthors(List<String> authors) {
    this.authors = authors;
  }

  public String getArLevel() {
    return arLevel;
  }

  public void setArLevel(String arLevel) {
    this.arLevel = arLevel;
  }

  public Genre getGenre() {
    return genre;
  }

  public void setGenre(Genre genre) {
    this.genre = genre;
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
