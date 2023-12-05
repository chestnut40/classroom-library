package com.classroomlibraryapi.service.bookBox;

import java.util.List;

import org.springframework.stereotype.Service;

import com.classroomlibraryapi.model.bookBox.Genre;

@Service
public interface GenreService {

    List<Genre> getAllGenres();

}
