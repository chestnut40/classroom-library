package com.classroomlibraryapi.model.googleBooks.book;

public class Epub {
  private boolean isAvailable;
  private String downloadLink;
  private String acsTokenLink;

  public boolean isAvailable() {
    return isAvailable;
  }

  public void setAvailable(boolean available) {
    isAvailable = available;
  }

  public String getDownloadLink() {
    return downloadLink;
  }

  public void setDownloadLink(String downloadLink) {
    this.downloadLink = downloadLink;
  }

  public String getAcsTokenLink() {
    return acsTokenLink;
  }

  public void setAcsTokenLink(String acsTokenLink) {
    this.acsTokenLink = acsTokenLink;
  }
}
