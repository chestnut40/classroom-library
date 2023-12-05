package com.classroomlibraryapi.model.googleBooks.volumeQuerySearchResult;

import com.classroomlibraryapi.model.googleBooks.book.GoogleBook;

public class VolumeQuerySearchResult {
  private String kind;
  private int totalItems;
  private GoogleBook[] items;

  public String getKind() {
    return kind;
  }

  public void setKind(String kind) {
    this.kind = kind;
  }

  public int getTotalItems() {
    return totalItems;
  }

  public void setTotalItems(int totalItems) {
    this.totalItems = totalItems;
  }

  public GoogleBook[] getItems() {
    return items;
  }

  public void setItems(GoogleBook[] items) {
    this.items = items;
  }
}
