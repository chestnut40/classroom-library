package com.classroomlibraryapi.service.mapper;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.classroomlibraryapi.entity.BookTransactionEntity;
import com.classroomlibraryapi.model.bookBox.BookTransaction;

@Component
public class BookTransactionMapper {

    @Autowired
    private BookMapper bookMapper;

    @Autowired
    private StudentMapper studentMapper;

    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");

    public BookTransaction mapToBookTransaction(BookTransactionEntity bookTransactionEntity) {
        if (bookTransactionEntity != null) {
            return new BookTransaction(
                    bookTransactionEntity.getTransactionId(),
                    bookMapper.mapToBook(bookTransactionEntity.getBookEntity()),
                    studentMapper.mapToStudent(bookTransactionEntity.getBorrowerStudentEntity()),
                    studentMapper.mapToStudent(bookTransactionEntity.getReturnerStudentEntity()),
                    bookTransactionEntity.getBorrowed() != null ? bookTransactionEntity.getBorrowed().format(formatter)
                            : null,
                    bookTransactionEntity.getReturned() != null ? bookTransactionEntity.getReturned().format(formatter)
                            : null);
        }
        return null;
    }

    public List<BookTransaction> mapToBookTransactionList(List<BookTransactionEntity> bookTransactionEntityList) {
        return bookTransactionEntityList.stream().map(this::mapToBookTransaction).toList();
    }

}
