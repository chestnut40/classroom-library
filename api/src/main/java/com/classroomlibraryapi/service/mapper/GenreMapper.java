package com.classroomlibraryapi.service.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.classroomlibraryapi.entity.GenreEntity;
import com.classroomlibraryapi.model.bookBox.Genre;

@Component
public class GenreMapper {

    public Genre mapToGenre(GenreEntity genreEntity) {
        if (genreEntity != null) {
            return new Genre(genreEntity.getGenreId(), genreEntity.getGenreName());
        }
        return null;
    }

    public List<Genre> mapToGenreList(List<GenreEntity> genreEntityList) {
        List<Genre> genres = new ArrayList<>();
        genreEntityList.stream().forEach(genreEntity -> genres.add(mapToGenre(genreEntity)));
        return genres;
    }

    public GenreEntity mapToGenreEntity(Genre genre) {
        if (genre != null) {
            return new GenreEntity(genre.getGenreId(), genre.getGenreName());
        }
        return null;
    }

}
