import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getAllBooksInLibrary } from '../services/ApiService';
import BookListItem from '../components/BookListItem';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { COLORS } from '../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function LibraryScreen({ navigation, isStudentMode }) {

    const [bookList, setBookList] = useState();
    const [allBooks, setAllBooks] = useState();
    const [booksLoaded, setBooksLoaded] = useState(false);
    const [error, setError] = useState();
    const [searchPhrase, setSearchPhrase] = useState();


    useEffect(() => {
        if (!booksLoaded) {
            getAllBooksInLibrary(setBookList, setAllBooks, setBooksLoaded, setError);
        }
    }, []);

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getAllBooksInLibrary(setBookList, setAllBooks, setBooksLoaded, setError);
        });
        return focusHandler;
    }, [navigation]);

    useEffect(() => {
        if (searchPhrase?.trim().length > 0) {
            search(searchPhrase);
        }
    }, [allBooks])

    const authorsContainSearchPhrase = (book, text) => {
        let foundSearchPhrase = false;
        book.authors?.forEach((author) => {
            if (author?.toUpperCase().includes(text.trim().toUpperCase())) {
                foundSearchPhrase = true;
            }
        })
        return foundSearchPhrase;
    }

    const search = (text) => {
        if (allBooks) {
            if (text?.trim().length > 0) {
                const filteredBooks = allBooks.filter((book) => book.title?.toUpperCase().includes(text.trim().toUpperCase()) || authorsContainSearchPhrase(book, text));
                setBookList(filteredBooks);
            } else {
                setBookList(allBooks);
            }
        }
    }

    const renderListItem = ({item: book}) => ( 
        <BookListItem 
            book={book}
            onPress={() => navigation.navigate('Book Details', {book: book})}
            disabled={false}
        />
    );

    const renderList = () => {
        if (!booksLoaded) {
            return <ActivityIndicator size='large' />;
        }
        if (error) {
            return <Text>{error.message}</Text>;
        }
        if (booksLoaded && (!allBooks || allBooks.length == 0)) {
            return <Text style={{marginTop: 20}}>{'Currently no books in the library.\nAdd a book by selecting one of the icons below.'}</Text>
        }
        return (
            <FlatList style={styles.list}
                data={bookList}
                renderItem={renderListItem}
                keyExtractor={book => book.id}
                showsVerticalScrollIndicator={false}
            >
            </FlatList>
        );
    }

    const renderStudentFooter = () => {
        return (
            <View style={styles.footer}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Scan')}>
                    <MaterialCommunityIcons name='barcode-scan' size={28} color={COLORS.bookboxBlue} />
                    <Text style={styles.iconText}>Scan ISBN</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderAdminFooter = () => {
        return (
            <View style={styles.footer}>
                <View style={styles.footerIconRow}>
                    <View style={styles.icon50}>
                        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Scan')}>
                            <MaterialCommunityIcons name='barcode-scan' size={28} color={COLORS.bookboxBlue} />
                            <Text style={styles.iconText}>Scan ISBN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.icon50, styles.borderLeft]}>
                        <TouchableOpacity style={[styles.icon]} onPress={() => navigation.navigate('Book Details', {isAddBook: true})}>
                            <MaterialCommunityIcons name='book-plus-outline' size={28} color={COLORS.bookboxBlue} />
                            <Text style={styles.iconText}>Add Book Manually</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                leftIcon='menu'
                leftIconAction={() => navigation.openDrawer()}
                title='BookBox Library'
            />
            <SearchBar
                placeholder="Search title or author"
                onChangeText={(text) => {search(text); setSearchPhrase(text)}}
                value={searchPhrase}
                containerStyle={{width: '100%'}}
                inputContainerStyle={{backgroundColor: COLORS.white}}
                lightTheme
                onCancel={() => setBookList(allBooks)}
            />
            {renderList()}
            <View style={styles.spacer} />
            {isStudentMode ? renderStudentFooter() : renderAdminFooter()}
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}

LibraryScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      addListener: PropTypes.func.isRequired,
      openDrawer: PropTypes.func.isRequired,
    }).isRequired,
    isStudentMode: PropTypes.bool,
    route: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    spacer: {
      flex: 1,
    },
    list: {
        flexGrow: 0,
        width: '100%',
        paddingHorizontal: 10,
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
    footerIconRow: {
        height: '100%',
        flexDirection: 'row',
    },
    icon50: {
        width: '50%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    borderLeft: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: COLORS.black,
    },
    icon: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 10,
        color: COLORS.bookboxBlue,
    },
})

export default LibraryScreen;