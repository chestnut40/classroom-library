package com.classroomlibraryapi.model.openLibrary.book;

import com.classroomlibraryapi.model.openLibrary.Created;
import com.classroomlibraryapi.model.openLibrary.LastModified;
import com.classroomlibraryapi.model.openLibrary.Type;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class OpenLibraryBook {
  private Type type;
  private String title;
  @JsonProperty("authors")
  private List<AuthorKey> authorKeys;
  @JsonProperty("publish_date")
  private String publishDate;
  @JsonProperty("source_records")
  private List<String> sourceRecords;
  @JsonProperty("number_of_pages")
  private int numberOfPages;
  private List<String> publishers;
  @JsonProperty("isbn_10")
  private List<String> isbn10;
  @JsonProperty("isbn_13")
  private List<String> isbn13;
  @JsonProperty("physical_format")
  private String physicalFormat;
  @JsonProperty("full_title")
  private String fullTitle;
  private String subtitle;

  // The notes property was causing problems.
  // Not sure, but it seems as if the responseEntity from the openLibraryApi
  // would be an object sometimes and a string at other times.
  // Some books would be able to get and map the notes no problem,
  // while others would get a "no String-argument constructor/factory method to
  // deserialize from String value" error.

  // private Notes notes;

  private int[] covers;
  private List<Work> works;
  private String key;
  @JsonProperty("local_id")
  private List<String> localId;
  @JsonProperty("latest_revision")
  private int latestRevision;
  private int revision;
  private Created created;
  @JsonProperty("last_modified")
  private LastModified lastModified;

  public Type getType() {
    return type;
  }

  public void setType(Type type) {
    this.type = type;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public List<AuthorKey> getAuthorKeys() {
    return authorKeys;
  }

  public void setAuthorKeys(List<AuthorKey> authorKeys) {
    this.authorKeys = authorKeys;
  }

  public String getPublishDate() {
    return publishDate;
  }

  public void setPublishDate(String publishDate) {
    this.publishDate = publishDate;
  }

  public List<String> getSourceRecords() {
    return sourceRecords;
  }

  public void setSourceRecords(List<String> sourceRecords) {
    this.sourceRecords = sourceRecords;
  }

  public int getNumberOfPages() {
    return numberOfPages;
  }

  public void setNumberOfPages(int numberOfPages) {
    this.numberOfPages = numberOfPages;
  }

  public List<String> getPublishers() {
    return publishers;
  }

  public void setPublishers(List<String> publishers) {
    this.publishers = publishers;
  }

  public List<String> getIsbn10() {
    return isbn10;
  }

  public void setIsbn10(List<String> isbn10) {
    this.isbn10 = isbn10;
  }

  public List<String> getIsbn13() {
    return isbn13;
  }

  public void setIsbn13(List<String> isbn13) {
    this.isbn13 = isbn13;
  }

  public String getPhysicalFormat() {
    return physicalFormat;
  }

  public void setPhysicalFormat(String physicalFormat) {
    this.physicalFormat = physicalFormat;
  }

  public String getFullTitle() {
    return fullTitle;
  }

  public void setFullTitle(String fullTitle) {
    this.fullTitle = fullTitle;
  }

  public String getSubtitle() {
    return subtitle;
  }

  public void setSubtitle(String subtitle) {
    this.subtitle = subtitle;
  }

  // public Notes getNotes() {
  // return notes;
  // }

  // public void setNotes(Notes notes) {
  // this.notes = notes;
  // }

  public int[] getCovers() {
    return covers;
  }

  public void setCovers(int[] covers) {
    this.covers = covers;
  }

  public List<Work> getWorks() {
    return works;
  }

  public void setWorks(List<Work> works) {
    this.works = works;
  }

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public List<String> getLocalId() {
    return localId;
  }

  public void setLocalId(List<String> localId) {
    this.localId = localId;
  }

  public int getLatestRevision() {
    return latestRevision;
  }

  public void setLatestRevision(int latestRevision) {
    this.latestRevision = latestRevision;
  }

  public int getRevision() {
    return revision;
  }

  public void setRevision(int revision) {
    this.revision = revision;
  }

  public Created getCreated() {
    return created;
  }

  public void setCreated(Created created) {
    this.created = created;
  }

  public LastModified getLastModified() {
    return lastModified;
  }

  public void setLastModified(LastModified lastModified) {
    this.lastModified = lastModified;
  }
}
