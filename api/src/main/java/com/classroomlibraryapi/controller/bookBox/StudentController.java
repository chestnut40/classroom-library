package com.classroomlibraryapi.controller.bookBox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.classroomlibraryapi.model.bookBox.Student;
import com.classroomlibraryapi.service.bookBox.StudentService;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // ex. http://localhost:8080/students/9
    @GetMapping("/students/{id}")
    public Student findById(@PathVariable Long id) {
        return studentService.findById(id);
    }

    // ex. http://localhost:8080/students
    @GetMapping("/students")
    public List<Student> findAll() {
        return studentService.getAllStudentsAscending("lastName");
    }

    // ex. http://localhost:8080/students
    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    // ex. http://localhost:8080/students
    @PutMapping("/students")
    public Student updateStudent(@RequestBody Student student) {
        return studentService.updateStudent(student);
    }

    // ex. http://localhost:8080/students/9
    @DeleteMapping(value = "/students/{id}")
    public Student removeStudent(@PathVariable Long id) {
        return studentService.removeStudent(id);
    }

}
