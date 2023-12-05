package com.classroomlibraryapi.service.bookBox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.classroomlibraryapi.entity.AccountEntity;
import com.classroomlibraryapi.exception.AccountAlreadyExistsException;
import com.classroomlibraryapi.exception.AccountNotFoundException;
import com.classroomlibraryapi.model.bookBox.Account;
import com.classroomlibraryapi.repository.AccountRepository;
import com.classroomlibraryapi.service.mapper.AccountMapper;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AccountMapper mapper;

    @Override
    public Account createAccount(Account account) throws AccountAlreadyExistsException {
        AccountEntity existingAccountEntity = accountRepository.findByEmail(account.getEmail().trim());
        if (existingAccountEntity != null) {
            throw new AccountAlreadyExistsException();
        }
        AccountEntity accountEntity = accountRepository.save(mapper.mapToAccountEntity(account));
        return mapper.mapToAccount(accountEntity);
    }

    @Override
    public Account login(String email, String password) throws AccountNotFoundException {
        AccountEntity accountEntity = accountRepository.findByEmailAndPassword(email, password);
        if (accountEntity != null) {
            return mapper.mapToAccount(accountEntity);
        }
        throw new AccountNotFoundException();
    }

}
