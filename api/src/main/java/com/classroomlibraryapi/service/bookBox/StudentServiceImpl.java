package com.classroomlibraryapi.service.bookBox;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.classroomlibraryapi.entity.StudentEntity;
import com.classroomlibraryapi.model.bookBox.Student;
import com.classroomlibraryapi.repository.StudentRepository;
import com.classroomlibraryapi.service.mapper.StudentMapper;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepo;
    @Autowired
    StudentMapper mapper;

    @Override
    public Student findById(Long id) {
        Optional<StudentEntity> studentOptional = studentRepo.findById(id);
        if (studentOptional.isPresent()) {
            return mapper.mapToStudent(studentOptional.get());
        }
        return new Student(id, null, null);
    }

    @Override
    public List<Student> getAllStudentsAscending(String sortColumn) {
        return mapper.mapToStudentList(studentRepo.findAll(Sort.by(Sort.Direction.ASC, sortColumn)));
    }

    @Override
    public List<Student> getAllStudentsDescending(String sortColumn) {
        return mapper.mapToStudentList(studentRepo.findAll(Sort.by(Sort.Direction.DESC, sortColumn)));
    }

    @Override
    public Student saveStudent(Student student) {
        StudentEntity studentEntity = studentRepo.save(mapper.mapToStudentEntity(student));
        return mapper.mapToStudent(studentEntity);
    }

    @Override
    public Student updateStudent(Student student) {
        Optional<StudentEntity> studentEntityOptional = studentRepo.findById(student.getId());
        if (studentEntityOptional.isPresent()) {
            StudentEntity studentEntity = studentEntityOptional.get();
            studentEntity.setFirstName(student.getFirstName());
            studentEntity.setLastName(student.getLastName());

            return mapper.mapToStudent(studentRepo.save(studentEntity));
        }
        return null;
    }

    @Override
    public Student removeStudent(Long id) {
        Optional<StudentEntity> studentEntity = studentRepo.findById(id);
        if (studentEntity.isPresent()) {
            studentRepo.deleteById(id);
            studentEntity.get().setId(-1L);
            return mapper.mapToStudent(studentEntity.get());
        }
        return new Student(null, null, null);
    }

}
