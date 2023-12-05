package com.classroomlibraryapi.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import static com.classroomlibraryapi.utils.Constants.*;

@Entity
@Table(name = GENRE_TABLE)
public class GenreEntity {

    @Id
    @Column(name = GENRE_ID_COLUMN)
    private Long genreId;

    @Column(name = GENRE_NAME_COLUMN)
    private String genreName;

    public GenreEntity() {

    }

    public GenreEntity(Long genreId, String genreName) {
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
