package com.classroomlibraryapi.model.googleBooks.book;

public class Layer {
  private String layerId;
  private String volumeAnnotationsVersion;

  public String getLayerId() {
    return layerId;
  }

  public void setLayerId(String layerId) {
    this.layerId = layerId;
  }

  public String getVolumeAnnotationsVersion() {
    return volumeAnnotationsVersion;
  }

  public void setVolumeAnnotationsVersion(String volumeAnnotationsVersion) {
    this.volumeAnnotationsVersion = volumeAnnotationsVersion;
  }
}
