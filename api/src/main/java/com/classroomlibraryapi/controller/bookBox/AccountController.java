package com.classroomlibraryapi.controller.bookBox;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.classroomlibraryapi.exception.AccountAlreadyExistsException;
import com.classroomlibraryapi.exception.AccountNotFoundException;
import com.classroomlibraryapi.model.bookBox.Account;
import com.classroomlibraryapi.service.bookBox.AccountService;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // ex. http://localhost:8080/account/create
    @PostMapping(value = "/account/create")
    public Account createAccount(@Valid @RequestBody Account account) throws AccountAlreadyExistsException {
        return accountService.createAccount(account);
    }

    // ex. http://localhost:8080/account/create
    @PostMapping(value = "/account/login")
    public Account login(@RequestBody Account account) throws AccountNotFoundException {
        return accountService.login(account.getEmail(), account.getPassword());
    }

}
