package com.classroomlibraryapi.utils;

public class Constants {
  public static final String COVER_URL_ROOT = "https://covers.openlibrary.org/b/isbn/";
  public static final String COVER_SIZE = "-L";
  public static final String JPG = ".jpg";

  // Books
  public static final String BOOK_TABLE = "book";
  public static final String BOOK_ID_COLUMN = "book_id";
  public static final String ISBN_COLUMN = "isbn";
  public static final String TITLE_COLUMN = "title";
  public static final String SUBTITLE_COLUMN = "subtitle";
  public static final String AUTHOR_1_COLUMN = "author_1";
  public static final String AUTHOR_2_COLUMN = "author_2";
  public static final String AUTHOR_3_COLUMN = "author_3";
  public static final String AUTHOR_4_COLUMN = "author_4";
  public static final String AR_LEVEL_COLUMN = "ar_level";
  public static final String GENRE_COLUMN = "genre";
  public static final String COVER_COLUMN = "cover";
  public static final String NOTES_COLUMN = "notes";

  // Students
  public static final String STUDENT_TABLE = "student";
  public static final String STUDENT_ID_COLUMN = "student_id";
  public static final String STUDENT_FIRST_NAME_COLUMN = "first_name";
  public static final String STUDENT_LAST_NAME_COLUMN = "last_name";

  // Book Transactions
  public static final String BOOK_TRANSACTION_TABLE = "book_transaction";
  public static final String TRANSACTION_ID_COLUMN = "transaction_id";
  public static final String BOOK_TRANSACTION_BOOK_ID_COLUMN = "book_id";
  public static final String BOOK_TRANSACTION_STUDENT_ID_COLUMN = "student_id";
  public static final String BORROWED_COLUMN = "borrowed";
  public static final String RETURNED_COLUMN = "returned";

  // Accounts
  public static final String ACCOUNT_TABLE = "account";
  public static final String ACCOUNT_ID_COLUMN = "account_id";
  public static final String EMAIL_COLUMN = "email";
  public static final String PASSWORD_COLUMN = "password";
  public static final String ACCOUNT_FIRST_NAME_COLUMN = "first_name";
  public static final String ACCOUNT_LAST_NAME_COLUMN = "last_name";

  // Genres
  public static final String GENRE_TABLE = "genre";
  public static final String GENRE_ID_COLUMN = "genre_id";
  public static final String GENRE_NAME_COLUMN = "genre_name";

}
