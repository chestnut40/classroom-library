package com.classroomlibraryapi.service.bookBox;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.classroomlibraryapi.model.bookBox.Genre;
import com.classroomlibraryapi.repository.GenreRepository;
import com.classroomlibraryapi.service.mapper.GenreMapper;

@Service
public class GenreServiceImpl implements GenreService {

    @Autowired
    GenreRepository genreRepo;

    @Autowired
    GenreMapper mapper;

    @Override
    public List<Genre> getAllGenres() {
        return mapper.mapToGenreList(genreRepo.findAll());
    }

}
