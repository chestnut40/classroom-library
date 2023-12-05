package com.classroomlibraryapi.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import static com.classroomlibraryapi.utils.Constants.*;

@Entity
@Table(name = ACCOUNT_TABLE)
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = ACCOUNT_ID_COLUMN)
    private Long accountId;

    @Column(name = EMAIL_COLUMN)
    private String email;

    @Column(name = PASSWORD_COLUMN)
    private String password;

    @Column(name = ACCOUNT_FIRST_NAME_COLUMN)
    private String firstName;

    @Column(name = ACCOUNT_LAST_NAME_COLUMN)
    private String lastName;

    public AccountEntity() {

    }

    public AccountEntity(Long accountId, String email, String password, String firstName, String lastName) {
        this.accountId = accountId;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
