package com.classroomlibraryapi.service.mapper;

import org.springframework.stereotype.Component;

import com.classroomlibraryapi.entity.AccountEntity;
import com.classroomlibraryapi.model.bookBox.Account;

@Component
public class AccountMapper {

    public Account mapToAccount(AccountEntity accountEntity) {
        return new Account(
                accountEntity.getAccountId(),
                accountEntity.getEmail(),
                accountEntity.getPassword(),
                accountEntity.getFirstName(),
                accountEntity.getLastName());
    }

    public AccountEntity mapToAccountEntity(Account account) {
        return new AccountEntity(
                account.getAccountId(),
                account.getEmail(),
                account.getPassword(),
                account.getFirstName(),
                account.getLastName());
    }

}
