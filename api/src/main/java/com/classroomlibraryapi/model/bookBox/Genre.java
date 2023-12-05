package com.classroomlibraryapi.model.bookBox;

public class Genre {
    private Long genreId;
    private String genreName;

    public Genre(Long genreId, String genreName) {
        this.genreId = genreId;
        this.genreName = genreName;
    }

    public Long getGenreId() {
        return genreId;
    }

    public void setGenreId(Long genreId) {
        this.genreId = genreId;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }

}
