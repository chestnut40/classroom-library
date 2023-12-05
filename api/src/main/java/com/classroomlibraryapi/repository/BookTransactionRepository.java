package com.classroomlibraryapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classroomlibraryapi.entity.BookTransactionEntity;

@Repository
public interface BookTransactionRepository extends JpaRepository<BookTransactionEntity, Long> {

    BookTransactionEntity findByBookEntity_BookIdAndReturnedIsNull(Long bookId);

    List<BookTransactionEntity> findAllByBorrowerStudentEntity_IdAndReturnedIsNull(
            Long borrowerStudentId);

    List<BookTransactionEntity> findAllByBookEntity_BookIdOrderByBorrowedDesc(Long bookId);

}
