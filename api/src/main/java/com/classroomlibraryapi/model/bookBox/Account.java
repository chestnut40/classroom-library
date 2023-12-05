package com.classroomlibraryapi.model.bookBox;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern.Flag;
import javax.validation.constraints.Size;

public class Account {

    private Long accountId;
    @NotEmpty(message = "The email is required.")
    @Email(message = "The email address is invalid.", flags = { Flag.CASE_INSENSITIVE })
    @Size(max = 50, message = "The email max length is 50 characters.")
    private String email;
    @NotEmpty(message = "The password is required.")
    @Size(max = 50, message = "The password max length is 50 characters.")
    private String password;
    @NotEmpty(message = "The first name is required.")
    @Size(max = 50, message = "The first name max length is 50 characters.")
    private String firstName;
    @NotEmpty(message = "The last name is required.")
    @Size(max = 50, message = "The last name max length is 50 characters.")
    private String lastName;

    public Account() {

    }

    public Account(Long accountId, String email, String password, String firstName, String lastName) {
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
