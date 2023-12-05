package com.classroomlibraryapi.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import static com.classroomlibraryapi.utils.Constants.*;

@Entity
@Table(name = STUDENT_TABLE)
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = STUDENT_ID_COLUMN)
    private Long id;

    @Column(name = STUDENT_FIRST_NAME_COLUMN)
    private String firstName;

    @Column(name = STUDENT_LAST_NAME_COLUMN)
    private String lastName;

    public StudentEntity() {

    }

    public StudentEntity(Long id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

}
