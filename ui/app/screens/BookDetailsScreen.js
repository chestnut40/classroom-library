// package imports
import React, { useEffect, useRef, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

// app imports
import {
    getBookByIsbn,
    addBookToLibrary,
    updateBook,
    removeBookFromLibrary,
    borrowBook,
    getBorrowTransaction,
    getStudentsForSelectList,
    returnBook,
    getAllGenres,
    getBookTransactionHistory,
} from '../services/ApiService';
import { successAlert, failAlert, confirmAlert } from '../utils/Alert';
import { COLORS } from '../utils/Colors';
import Header from '../components/Header';
import BookListItem from '../components/BookListItem';

function BookDetailsScreen({navigation, route, isStudentMode}) {

    const [book, setBook] = useState();
    const [bookLoaded, setBookLoaded] = useState(false);
    const [borrowTransaction, setBorrowTransaction] = useState();
    const [borrowTransactionLoaded, setBorrowTransactionLoaded] = useState(false);
    const [bookTransactionHistory, setBookTransactionHistory] = useState();
    const [borrowName, setBorrowName] = useState();
    const [borrowDate, setBorrowDate] = useState();
    const [isBookAvailable, setIsBookAvailable] = useState(false);
    const [isBookInLibrary, setIsBookInLibrary] = useState(false);
    const [isAddBook, setIsAddBook] = useState(false);
    const [studentData, setStudentData] = useState();
    const [studentsLoaded, setStudentsLoaded] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState();
    const [error, setError] = useState();
    const [isDisabled, setIsDisabled] = useState(true);
    const [authors, setAuthors] = useState('');
    const [isEditView, setIsEditView] = useState(false);
    const [genres, setGenres] = useState();
    const [selectedGenre, setSelectedGenre] = useState();

    const [title, setTitle] = useState();
    const [author1, setAuthor1] = useState();
    const [author2, setAuthor2] = useState();
    const [author3, setAuthor3] = useState();
    const [author4, setAuthor4] = useState();
    const [readingLevel, setReadingLevel] = useState();
    const [notes, setNotes] = useState();
    const [origTitle, setOrigTitle] = useState();
    const [origAuthor1, setOrigAuthor1] = useState();
    const [origAuthor2, setOrigAuthor2] = useState();
    const [origAuthor3, setOrigAuthor3] = useState();
    const [origAuthor4, setOrigAuthor4] = useState();
    const [origReadingLevel, setOrigReadingLevel] = useState();
    const [origNotes, setOrigNotes] = useState();
    const [origGenre, setOrigGenre] = useState();
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    
    const dropdownRef = useRef({});

    useEffect(() => {
        if (route.params?.isbn != undefined) {
            getBookByIsbn(route.params.isbn, setBook, setBookLoaded, setError);
        }
        if (route.params?.book != undefined) {
            setBook(route.params.book);
            setBookLoaded(true);
        }
        if (route.params?.isAddBook == true) {
            setBookLoaded(true);
            setIsEditView(true);
            setIsAddBook(true);
        }
        getAllGenres(setGenres, setError);
    }, [])

    useEffect(() => {
        if (book) {
            setValues();
        }
    }, [book])

    useEffect(() => {
        if (borrowTransactionLoaded) {
            if (borrowTransaction && borrowTransaction.returned == null) {
                setIsBookAvailable(false);
                setBorrowName(borrowTransaction.borrowerStudent?.firstName + ' ' + borrowTransaction.borrowerStudent?.lastName);
                setBorrowDate(borrowTransaction.borrowed);
            } else {
                setIsBookAvailable(true);
            }
        }
    }, [borrowTransactionLoaded, borrowTransaction])

    useEffect(() => {
        if (book?.id != -1 && !studentsLoaded) {
            getStudentsForSelectList(setStudentData, setStudentsLoaded, setError);
        }
    }, []);

    useEffect(() => {
        if (selectedStudent && selectedStudent.id != -1) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [selectedStudent])

    useEffect(() => {
        setIsSaveDisabled(!detailsHaveChanged());
    }, [title, author1, author2, author3, author4, selectedGenre, readingLevel, notes])

    const detailsHaveChanged = () => {
        return titleHasChanged()
            || authorHasChanged(author1, origAuthor1)
            || authorHasChanged(author2, origAuthor2)
            || authorHasChanged(author3, origAuthor3)
            || authorHasChanged(author4, origAuthor4)
            || genreHasChanged()
            || readingLevelHasChanged()
            || notes != origNotes;
    }

    const titleHasChanged = () => {
        if (title == '' && origTitle == undefined) {
            return false;
        }
        return title != origTitle;
    }

    const authorHasChanged = (author, origAuthor) => {
        if (author == '' && origAuthor == undefined) {
            return false;
        }
        return author != origAuthor;
    }

    const genreHasChanged = () => {
        if (origGenre?.genreId != undefined && selectedGenre?.genreId != origGenre?.genreId) {
            return true;
        }
        return origGenre?.genreId == undefined && selectedGenre?.genreId != undefined && selectedGenre?.genreId != -1;
    }

    const readingLevelHasChanged = () => {
        if (readingLevel?.trim() == '.' || (origReadingLevel == undefined && readingLevel == '')) {
            return false;
        }
        return (origReadingLevel != 0 && readingLevel != origReadingLevel) || (origReadingLevel == 0 && readingLevel != 0 && readingLevel?.length > 0);
    }

    const parseAuthors = () => {
        if (book?.authors) {
            let isFirstAuthor = true;
            let authorString = '';
            for (const author of book.authors) {
                if (isFirstAuthor && author != null && author != undefined) {
                    authorString += author;
                    isFirstAuthor = false;
                } else if (author != null && author != undefined) {
                    authorString += ', ' + author;
                }
            }
            setAuthors(authorString);
        }
    }

    const doAddBook = () => {
        confirmAlert('Add book to library?', addBook);
    }

    const addBook = () => {
        if (book) {
            if (isEditView) {
                updateBookValues();
            }
            addBookToLibrary(book, setBook, setBookLoaded, successAlert, setIsEditView, failAlert, setError);
        } else if (isEditView && isAddBook) {
            const newBook = createNewBook();
            addBookToLibrary(newBook, setBook, setBookLoaded, successAlert, setIsEditView, failAlert, setError);
            setIsAddBook(false);
        }
    }

    const removeBook = () => {
        confirmAlert('Removing this book from the library will delete all of its data.\n\nAre you sure you want to remove this book from the library?',
            doRemoveBook);
    }

    const doRemoveBook = () => {
        removeBookFromLibrary(book?.id, setBook, setBookLoaded, successAlert, failAlert, setError);
    }

    const doBorrowBook = () => {
        if(!selectedStudent || selectedStudent.id == -1) {
            failAlert("Student not selected");
            return;
        }
        borrowBook(book?.id, selectedStudent.id, setBorrowTransaction, setBorrowTransactionLoaded, setSelectedStudent, dropdownRef.current.reset, successAlert, failAlert, setError);
    }

    const doReturnBook = () => {
        if(!selectedStudent || selectedStudent.id == -1) {
            failAlert("Student not selected");
            return;
        }
        returnBook(borrowTransaction?.transactionId, selectedStudent.id, setBorrowTransaction, setBorrowTransactionLoaded, setSelectedStudent, dropdownRef.current.reset, successAlert, failAlert, setError);
    }

    const doUpdateBook = () => {
        if (book) {
            if (isBookInLibrary) {
                updateBookValues();
                updateBook(book, setBook, setBookLoaded, successAlert, setIsEditView, failAlert, setError);
            } else {
                doAddBook();
            }
        }
    }

    const updateBookValues = () => {
        if (book) {
            book.title = title?.trim();
            book.authors = [author1?.trim(), author2?.trim(), author3?.trim(), author4?.trim()];
            book.genre = selectedGenre?.genreId != -1 ? selectedGenre : null;
            book.arLevel = readingLevel?.trim() != '.' ? readingLevel : null;
            book.notes = notes?.trim();
        }
    }

    const createNewBook = () => {
        const newBook = {
            title: title?.trim(),
            authors: [author1?.trim(), author2?.trim(), author3?.trim(), author4?.trim()],
            genre: selectedGenre?.genreId != -1 ? selectedGenre : null,
            arLevel: readingLevel?.trim() != '.' ? readingLevel : null,
            notes: notes?.trim(),
        };
        return newBook;
    }

    const setValues = () => {
        setIsBookInLibrary(book?.id != null && book?.id != undefined && book?.id != -1);
        getBorrowTransaction(book?.id, setBorrowTransaction, setBorrowTransactionLoaded, setError);
        getBookTransactionHistory(book?.id, setBookTransactionHistory, setError);
        setTitle(book?.title ? book.title : null);
        setOrigTitle(book?.title ? book.title : null);
        parseAuthors();
        setSelectedGenre(book?.genre ? book.genre : null);
        setOrigGenre(book?.genre ? book.genre : null);
        setAuthor1(book?.authors?.[0]);
        setOrigAuthor1(book?.authors?.[0]);
        setAuthor2(book?.authors?.[1]);
        setOrigAuthor2(book?.authors?.[1]);
        setAuthor3(book?.authors?.[2]);
        setOrigAuthor3(book?.authors?.[2]);
        setAuthor4(book?.authors?.[3]);
        setOrigAuthor4(book?.authors?.[3]);
        setReadingLevel(book?.arLevel ? book?.arLevel : null);
        setOrigReadingLevel(book?.arLevel?.toString());
        setNotes(book?.notes);
        setOrigNotes(book?.notes);
    }

    const renderContent = () => {
        if (!bookLoaded) {
            return <ActivityIndicator size='large' />;
        }
        if (error) {
            return <Text>{error}</Text>;
        }
        return (
            <ScrollView style={{flexGrow: 0}}
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false}>
                {book &&
                    <View style={styles.section}>
                        {renderBookItem()}
                    </View>
                }
                <View style={styles.section}>
                    {isEditView ? renderBookInfoEdit() : renderBookInfo()}
                </View>
                {!isEditView &&
                    <View style={styles.section}>
                        {borrowTransactionLoaded && !isBookAvailable && renderBorrowerInfo()}
                        {isBookInLibrary &&
                            <View style={styles.marginTop}>
                                {renderStudentDropdown()}
                            </View>
                        }
                    </View>
                }
            </ScrollView>
        )
    }

    const renderBookInfoEdit = () => {
        return (
            <>
            <Text style={styles.bookInfoHeader}>Title:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setTitle(text)}
                value={title}
                placeholder='Title'
            />
            <Text style={styles.bookInfoHeader}>Author(s):</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setAuthor1(text)}
                value={author1}
                placeholder='Author 1'
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setAuthor2(text)}
                value={author2}
                placeholder='Author 2'
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setAuthor3(text)}
                value={author3}
                placeholder='Author 3'
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setAuthor4(text)}
                value={author4}
                placeholder='Author 4'
            />
            <Text style={styles.bookInfoHeader}>Genre:</Text>
            <View style={styles.dropdownContainer}>
                <SelectDropdown
                    data={genres}
                    onSelect={(selectedItem, index) => {
                        setSelectedGenre(selectedItem);
                    }}
                    defaultButtonText='Select genre'
                    defaultValue={{
                        genreId: selectedGenre?.genreId,
                        genreName: selectedGenre?.genreName
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.genreName
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.genreName
                    }}
                    buttonStyle={styles.dropdownButton}
                    renderDropdownIcon={() => (
                        <MaterialCommunityIcons name='chevron-down' size={28} color={COLORS.black} />)}
                />
            </View>
            <Text style={styles.bookInfoHeader}>Reading Level:</Text>
            <TextInput
                style={styles.input}
                // keyboardType='decimal-pad'
                onChangeText={(text) => setReadingLevel(text)}
                value={readingLevel}
                placeholder='Reading Level'
            />
            <Text style={styles.bookInfoHeader}>Notes:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setNotes(text)}
                value={notes}
                placeholder='Notes'
            />
            </>
        )
    }

    const renderBookInfo = () => {
        return (
            <>
            <View style={styles.bookInfoSection}>
                <View style={styles.bookInfoItem}>
                    <Text style={styles.bookInfoHeader}>Genre:</Text>
                    <Text style={styles.bookInfo}>{book?.genre?.genreName ? book.genre.genreName : ''}</Text>
                </View>
                <View style={styles.bookInfoItem}>
                    <Text style={styles.bookInfoHeader}>Reading Level:</Text>
                    <Text style={styles.bookInfo}>{book?.arLevel ? book?.arLevel : ''}</Text>
                </View>
                <View style={styles.bookInfoItem}>
                    <Text style={styles.bookInfoHeader}>Notes:</Text>
                    <Text style={styles.bookInfo}>{book?.notes}</Text>
                </View>
            </View>
            <View style={styles.horizontalRule} />
            </>
        )
    }

    const renderBorrowerInfo = () => {
        return (
            <>
                <View style={styles.section}>
                    <View style={styles.bookInfoSection}>
                        <View style={styles.bookInfoItem}>
                            <Text style={styles.bookInfoHeader}>Borrowed by:</Text>
                            <Text style={styles.bookInfo}>{borrowName}</Text>
                        </View>
                        <View style={styles.bookInfoItem}>
                            <Text style={styles.bookInfoHeader}>Borrowed on:</Text>
                            <Text style={styles.bookInfo}>{borrowDate}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalRule} />
            </>
        )
    }

    const renderStudentDropdown = () => {
        return (
            <View style={styles.dropdownContainer}>
                <SelectDropdown
                    data={studentData}
                    ref={dropdownRef}
                    onSelect={(selectedItem, index) => {
                        setSelectedStudent(selectedItem);
                    }}
                    defaultButtonText='Select student'
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.id == -1 ? 'Select student' :  selectedItem.name
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.name
                    }}
                    buttonStyle={styles.dropdownButton}
                    renderDropdownIcon={() => (
                        <MaterialCommunityIcons name='chevron-down' size={28} color={COLORS.black} />)}
                />
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <View style={isBookInLibrary ? styles.footerIconRow : styles.footerIcon}>
                    {isBookInLibrary &&
                        <View style={styles.footerHalf}>
                            <TouchableOpacity style={styles.icon} onPress={isBookAvailable ? doBorrowBook : doReturnBook} disabled={isDisabled}>
                                <MaterialCommunityIcons name={'hand-extended-outline'} size={28} color={isDisabled ? COLORS.lightGray : COLORS.bookboxBlue} />
                                <Text style={[styles.iconText, isDisabled ? styles.disabledIconText : '']}>{isBookAvailable ? 'Borrow Book' : 'Return Book'}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={isBookInLibrary ? [styles.footerHalf, styles.borderLeft] : ''}>
                        <TouchableOpacity style={[styles.icon]} onPress={() => navigation.pop()}>
                            <MaterialCommunityIcons name='cancel' size={28} color={COLORS.bookboxBlue} />
                            <Text style={styles.iconText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const renderFooterEdit = () => {
        return (
            <View style={styles.footer}>
                <View style={styles.footerIconRow}>
                    <View style={styles.footerHalf}>
                        <TouchableOpacity style={styles.icon} onPress={() => { isAddBook ? doAddBook() : doUpdateBook(); } } disabled={isSaveDisabled}>
                            <MaterialCommunityIcons name='content-save-outline' size={28} color={isSaveDisabled ? COLORS.lightGray : COLORS.bookboxBlue} />
                            <Text style={[styles.iconText, isSaveDisabled ? styles.disabledIconText : '']}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.footerHalf, styles.borderLeft]}>
                        <TouchableOpacity style={[styles.icon]} onPress={() => {
                            if (book) {
                                setValues();
                                setIsEditView(false);
                            } else {
                                navigation.pop();
                            }
                        }}>
                            <MaterialCommunityIcons name='cancel' size={28} color={COLORS.bookboxBlue} />
                            <Text style={styles.iconText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const renderBookItem = () => ( 
        <BookListItem 
            book={book}
            onPress={() => navigation.navigate('Book Details', {book: book})}
            disabled={true}
        />
    );

    const renderHeader = () => {
        return (
            <Header
                leftIcon='arrow-left'
                leftIconAction={() => navigation.pop()}
                title='Book Info'
            />
        )
    }

    const renderEnhancedHeader = () => {
        return (
            <Header
                leftIcon='arrow-left'
                leftIconAction={() => navigation.pop()}
                title='Book Info'
                rightIcon='pencil-outline'
                rightIconAction={() => {setIsEditView(true)}}
                secondRightIcon={isBookInLibrary ? 'trash-can-outline' : 'plus'}
                secondRightIconAction={isBookInLibrary ? removeBook : doAddBook}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {!isStudentMode && !isEditView ? (
                renderEnhancedHeader()
            ) : (
                renderHeader()
            )}
            {renderContent()}
            <View style={styles.spacer} />
            {isEditView ? (
                renderFooterEdit()
            ) : (
                renderFooter()
            )}
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}

BookDetailsScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      pop: PropTypes.func.isRequired,
      addListener: PropTypes.func.isRequired,
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.object,
        key: PropTypes.string,
    }).isRequired,
    isStudentMode: PropTypes.bool,
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
    },
    container: {
        height: '100%',
        width:'100%',
        flexDirection: 'column',
        backgroundColor: COLORS.white,
    },
    spacer: {
      flex: 1,
    },
    footer:{
        height: 60,
        width: '100%',
        backgroundColor: COLORS.white,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerIcon: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    footerIconRow: {
        height: '100%',
        flexDirection: 'row',
    },
    footerHalf: {
        width: '50%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    icon: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 10,
        color: COLORS.bookboxBlue,
    },
    disabledIconText: {
        color: COLORS.lightGray,
    },
    borderLeft: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: COLORS.black,
    },
    section: {
        width: '100%',
        padding: 5,
        flexDirection: 'column',
    },
    bookContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 20,
    },
    horizontalRule: {
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    descriptionContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    dropdownContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    dropdownButton: {
        borderRadius: 5,
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
    },
    locationContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    otherTabContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 5,
        height: 40,
        minWidth: '40%',
        backgroundColor: COLORS.bookboxBlue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    disabledButton: {
        marginVertical: 10,
        height: 40,
        minWidth: '40%',
        backgroundColor: COLORS.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonPadding: {
        paddingHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    locationText: {
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: COLORS.gray,
    },
    bookInfoSection: {
        marginHorizontal: 20,
    },
    bookInfoItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    bookInfo: {
        fontSize: 16,
        paddingHorizontal: 10,
        maxWidth: '90%',
    },
    bookInfoHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bookInfoIcon: {
        marginLeft: 10,
    },
    input: {
        height: 40,
        margin: 5,
        borderBottomWidth: 1,
        padding: 10,
    },
    bookHistoryContainer: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    buttonRow: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    checkoutButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    marginTop: {
        marginTop: 20,
    },
})

export default BookDetailsScreen;