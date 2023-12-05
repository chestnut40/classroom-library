import axios from 'axios';

// Account

export const login = (account, onSuccess, onFailure, setLoginError) => {
    axios({
        method: 'post',
        url: 'http://192.168.1.231:8080/account/login',
        data: account
    })
    .then((response) => {
        onSuccess(response?.data?.email);
    })
    .catch((error) => {
        console.log("ApiService.login - catch error: " + error.response.data.error);
        if (setLoginError) setLoginError(error.response.data.error || "Error occurred during login");
        if (onFailure) onFailure();
    })
}

export const createAccount = (account, setAccount, setAccountLoaded, goToLogin, successAlert, setCreateError) => {
    axios({
        method: 'post',
        url: 'http://192.168.1.231:8080/account/create',
        data: account
    })
    .then((response) => {
        console.log("ApiService.createAccount - response.data = " + response.data);
        setAccount(response.data);
        successAlert('Account created');
        goToLogin();
    })
    .catch((error) => {
        console.log("ApiService.createAccount - catch error: " + error.response.data.error);
        // setAccountLoaded(false);
        setCreateError(error.response.data.error || "Error occurred creating account");
    })
    .finally(() => setAccountLoaded(true));
}

// Book

export const getBookByIsbn = (isbn, setBook, setBookLoaded, setError) => {
    axios({
        method: 'get',
        url: `http://192.168.1.231:8080/bookbox/${isbn}`
    })
    .then((response) => {
        // console.log("ApiService.getBookByIsbn - response.data = " + response.data);
        setBook(response.data);
    })
    .catch((error) => {
        console.log("ApiService.getBookByIsbn - catch error: " + error.response.data.error);
        setBookLoaded(false);
        setError(error.response.data.error || "Error occurred retrieving book's information");
    })
    .finally(() => setBookLoaded(true));
}

export const getAllBooksInLibrary = (setBooks, setAllBooks, setBooksLoaded, setError) => {
    axios({
        method: 'get',
        url: 'http://192.168.1.231:8080/bookbox'
    })
    .then((response) => {
        // console.log("ApiService.getAllBooksInLibrary - response.data = " + response.data);
        setBooks(response.data);
        setAllBooks(response.data);
    })
    .catch((error) => {
        console.log("ApiService.getAllBooksInLibrary - catch error");
        setBooksLoaded(false);
        setError(error.message);
    })
    .finally(() => setBooksLoaded(true));
}

export const addBookToLibrary = (book, setBook, setBookLoaded, successAlert, setIsEditView, failAlert, setError) => {
    axios({
        method: 'post',
        url: 'http://192.168.1.231:8080/bookbox',
        data: book
    })
    .then((response) => {
        // console.log("ApiService.addBookToLibrary - response.data = " + response.data);
        setBook(response.data);
        successAlert('Book added to library');
        setIsEditView(false);
    })
    .catch((error) => {
        console.log("ApiService.addBookToLibrary - catch error");
        setBookLoaded(false);
        setError(error.message);
        failAlert('Failed to add book to library');
    })
    .finally(() => setBookLoaded(true));
}

export const updateBook = (book, setBook, setBookLoaded, successAlert, setIsEditView, failAlert, setError) => {
    axios({
        method: 'put',
        url: 'http://192.168.1.231:8080/bookbox',
        data: book
    })
    .then((response) => {
        // console.log("ApiService.updateBook - response.data = " + response.data);
        setBook(response.data);
        successAlert('Book updated');
        setIsEditView(false);
    })
    .catch((error) => {
        console.log("ApiService.updateBook - catch error");
        setBookLoaded(false);
        setError(error.message);
        failAlert('Failed to update book');
    })
    .finally(() => setBookLoaded(true));
}

export const removeBookFromLibrary = (bookId, setBook, setBookLoaded, successAlert, failAlert, setError) => {
    axios({
        method: 'delete',
        url: `http://192.168.1.231:8080/bookbox/${bookId}`,
    })
    .then((response) => {
        // console.log("ApiService.removeBookFromLibrary - response.data = " + response.data);
        setBook(response.data);
        successAlert('Book removed to library');
    })
    .catch((error) => {
        console.log("ApiService.removeBookFromLibrary - catch error");
        setBookLoaded(false);
        setError(error.message);
        failAlert('Failed to remove book to library');
    })
    .finally(() => setBookLoaded(true));
}

export const getAllGenres = (setGenres, setError) => {
    axios({
        method: 'get',
        url: 'http://192.168.1.231:8080/bookbox/genres'
    })
    .then((response) => {
        // console.log("ApiService.getAllGenres - response.data = " + response.data);
        let newArray = response.data.map((genre) => {
            return {genreId: genre.genreId, genreName: genre.genreName}
        })
        let noneOption = {genreId: -1, genreName: 'None'};
        newArray.unshift(noneOption);
        setGenres(newArray);
    })
    .catch((error) => {
        console.log("ApiService.getAllGenres - catch error");
        setError(error.message);
    });
}

// Book Transaction

export const borrowBook = (bookId, studentId, setBorrowTransaction, setBorrowTransactionLoaded, setSelectedStudent, resetDropdown, successAlert, failAlert, setError) => {
    axios({
        method: 'post',
        url: `http://192.168.1.231:8080/bookbox/borrow/${bookId}/${studentId}`,
    })
    .then((response) => {
        // console.log("ApiService.borrowBook - response.data = " + response.data);
        setBorrowTransaction(response.data);
        setSelectedStudent(null);
        resetDropdown();
        successAlert('Borrowed book');
    })
    .catch((error) => {
        console.log("ApiService.borrowBook - catch error");
        setBorrowTransactionLoaded(false);
        setError(error.message);
        failAlert('Failed to borrow book');
    })
    .finally(() => setBorrowTransactionLoaded(true));
}

export const returnBook = (transactionId, studentId, setBorrowTransaction, setBorrowTransactionLoaded, setSelectedStudent, resetDropdown, successAlert, failAlert, setError) => {
    axios({
        method: 'post',
        url: `http://192.168.1.231:8080/bookbox/return/${transactionId}/${studentId}`,
    })
    .then((response) => {
        // console.log("ApiService.returnBook - response.data = " + response.data);
        setBorrowTransaction(response.data);
        setSelectedStudent(null);
        resetDropdown();
        successAlert('Returned book');
    })
    .catch((error) => {
        console.log("ApiService.returnBook - catch error");
        setBorrowTransactionLoaded(false);
        setError(error.message);
        failAlert('Failed to return book');
    })
    .finally(() => setBorrowTransactionLoaded(true));
}

export const getBorrowTransaction = (bookId, setBorrowTransaction, setBorrowTransactionLoaded, setError) => {
    axios({
        method: 'get',
        url: `http://192.168.1.231:8080/bookbox/borrow-transaction/${bookId}`
    })
    .then((response) => {
        // console.log("ApiService.getBorrowTransaction - response.data = " + response.data);
        setBorrowTransaction(response.data);
    })
    .catch((error) => {
        console.log("ApiService.getBorrowTransaction - catch error");
        setBorrowTransactionLoaded(false);
        setError(error.message);
    })
    .finally(() => setBorrowTransactionLoaded(true));
}

export const getBookTransactionHistory = (bookId, setBookTransactionHistory, setError) => {
    axios({
        method: 'get',
        url: `http://192.168.1.231:8080/bookbox/borrow-transaction/history/${bookId}`
    })
    .then((response) => {
        // console.log("ApiService.getBookTransactionHistory - response.data = " + response.data);
        setBookTransactionHistory(response.data);
    })
    .catch((error) => {
        console.log("ApiService.getBookTransactionHistory - catch error");
        setError(error.message);
    })
}

export const getBorrowedBooksByStudentId = (studentId, setBorrowedBooks, setError) => {
    axios({
        method: 'get',
        url: `http://192.168.1.231:8080/bookbox/borrow/${studentId}`
    })
    .then((response) => {
        // console.log("ApiService.getBorrowedBooksByStudentId - response.data = " + response.data);
        setBorrowedBooks(response.data);
    })
    .catch((error) => {
        console.log("ApiService.getBorrowedBooksByStudentId - catch error");
        setError(error.message);
    })
}

// Student

export const getStudentById = (id, setBook, setBookLoaded, setError) => {
    axios({
        method: 'get',
        url: `http://192.168.1.231:8080/students/${id}`
    })
    .then((response) => {
        // console.log("ApiService.getStudentById - response.data = " + response.data);
        setBook(response.data);
    })
    .catch((error) => {
        console.log("ApiService.getStudentById - catch error");
        setBookLoaded(false);
        setError(error.message);
    })
    .finally(() => setBookLoaded(true));
}

export const getAllStudents = (setStudents, setStudentsLoaded, setError) => {
    axios({
        method: 'get',
        url: 'http://192.168.1.231:8080/students'
    })
    .then((response) => {
        // console.log("ApiService.getAllStudents - response.data = " + response.data);
        setStudents(response.data);
    })
    .catch((error) => {
        console.log("ApiService.getAllStudents - catch error");
        setStudentsLoaded(false);
        setError(error.message);
    })
    .finally(() => setStudentsLoaded(true));
}

export const getStudentsForSelectList = (setStudentData, setStudentsLoaded, setError) => {
    axios({
        method: 'get',
        url: 'http://192.168.1.231:8080/students'
    })
    .then((response) => {
        // console.log("ApiService.getStudentsForSelectList - response.data = " + response.data);
        let newArray = response.data.map((student) => {
            return {id: student.id, name: student.firstName + ' ' + student.lastName}
        })
        let noneOption = {id: -1, name: 'None'};
        newArray.unshift(noneOption);
        setStudentData(newArray);
    })
    .catch((error) => {
        console.log("ApiService.getStudentsForSelectList - catch error");
        setStudentsLoaded(false);
        setError(error.message);
    })
    .finally(() => setStudentsLoaded(true));
}

export const addStudent = (student, onSuccess, failAlert, setError) => {
    axios({
        method: 'post',
        url: 'http://192.168.1.231:8080/students',
        data: student
    })
    .then((response) => {
        // console.log("ApiService.addStudent - response.data = " + response.data);
        onSuccess(response.data, 'Student added');
    })
    .catch((error) => {
        console.log("ApiService.addStudent - catch error");
        setError(error.message);
        failAlert('Failed to add student ' + error.message);
    })
}

export const updateStudent = (student, onSuccess, failAlert, setError) => {
    axios({
        method: 'put',
        url: 'http://192.168.1.231:8080/students',
        data: student
    })
    .then((response) => {
        // console.log("ApiService.updateStudent - response.data = " + response.data);
        onSuccess(response.data, 'Student updated');
    })
    .catch((error) => {
        console.log("ApiService.updateStudent - catch error");
        setError(error.message);
        failAlert('Failed to update student');
    })
}

export const removeStudent = (studentId, navigation, setStudentLoaded, successAlert, failAlert, setError) => {
    axios({
        method: 'delete',
        url: `http://192.168.1.231:8080/students/${studentId}`,
    })
    .then((response) => {
        // console.log("ApiService.removeStudent - response.data = " + response.data);
        successAlert('Student removed');
        navigation.pop();
    })
    .catch((error) => {
        console.log("ApiService.removeStudent - catch error");
        setStudentLoaded(false);
        setError(error.message);
        failAlert('Failed to remove student');
    })
    .finally(() => setStudentLoaded(true));
}