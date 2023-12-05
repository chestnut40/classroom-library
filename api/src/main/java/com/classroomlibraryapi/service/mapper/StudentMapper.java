package com.classroomlibraryapi.service.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.classroomlibraryapi.entity.StudentEntity;
import com.classroomlibraryapi.model.bookBox.Student;

@Component
public class StudentMapper {

    public Student mapToStudent(StudentEntity studentEntity) {
        if (studentEntity == null) {
            return null;
        }
        return new Student(studentEntity.getId(), studentEntity.getFirstName(), studentEntity.getLastName());
    }

    public StudentEntity mapToStudentEntity(Student student) {
        return new StudentEntity(student.getId(), student.getFirstName(), student.getLastName());
    }

    public List<Student> mapToStudentList(List<StudentEntity> studentEntityList) {
        List<Student> students = new ArrayList<>();
        studentEntityList.stream().forEach(
                studentEntity -> students.add(mapToStudent(studentEntity)));
        return students;
    }

    public List<StudentEntity> mapToStudentEntityList(List<Student> studentList) {
        return studentList.stream().map(this::mapToStudentEntity).toList();
    }

}
