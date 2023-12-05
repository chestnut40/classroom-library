package com.classroomlibraryapi.service.bookBox;

import java.util.List;

import org.springframework.stereotype.Service;

import com.classroomlibraryapi.model.bookBox.Student;

@Service
public interface StudentService {
    Student findById(Long id);

    List<Student> getAllStudentsAscending(String sortColumn);

    List<Student> getAllStudentsDescending(String sortColumn);

    Student saveStudent(Student student);

    Student updateStudent(Student student);

    Student removeStudent(Long id);

}
