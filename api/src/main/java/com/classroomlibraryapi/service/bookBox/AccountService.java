package com.classroomlibraryapi.service.bookBox;

import org.springframework.stereotype.Service;

import com.classroomlibraryapi.exception.AccountAlreadyExistsException;
import com.classroomlibraryapi.exception.AccountNotFoundException;
import com.classroomlibraryapi.model.bookBox.Account;

@Service
public interface AccountService {

    Account createAccount(Account account) throws AccountAlreadyExistsException;

    Account login(String email, String password) throws AccountNotFoundException;

}
