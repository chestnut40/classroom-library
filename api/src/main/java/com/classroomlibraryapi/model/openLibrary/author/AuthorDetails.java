package com.classroomlibraryapi.model.openLibrary.author;

import com.classroomlibraryapi.model.openLibrary.Created;
import com.classroomlibraryapi.model.openLibrary.LastModified;
import com.classroomlibraryapi.model.openLibrary.Type;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthorDetails {
  private String name;
  private Created created;
  @JsonProperty("last_modified")
  private LastModified lastModified;
  @JsonProperty("latest_revision")
  private int latestRevision;
  private int revision;
  private String key;
  private Type type;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public Type getType() {
    return type;
  }

  public void setType(Type type) {
    this.type = type;
  }
}
