import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getStudentById, addStudent, updateStudent, removeStudent, getBorrowedBooksByStudentId } from '../services/ApiService';
import { confirmAlert, successAlert, failAlert } from '../utils/Alert';
import Header from '../components/Header';
import { COLORS } from '../utils/Colors';

function StudentDetailsScreen({navigation, route}) {

    const [student, setStudent] = useState();
    const [studentLoaded, setStudentLoaded] = useState(false);
    const [borrowedBooks, setBorrowedBooks] = useState();
    const [error, setError] = useState();
    const [isEditView, setIsEditView] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [origFirstName, setOrigFirstName] = useState('');
    const [origLastName, setOrigLastName] = useState('');
    const [isAddStudent, setIsAddStudent] = useState(false);

    useEffect(() => {
        if (route.params?.student != undefined) {
            if (route.params?.student?.id != undefined) {
                getStudentById(route.params.student.id, setStudent, setStudentLoaded, setError);
            } else {
                setStudent(route.params.student);
                setStudentLoaded(true);
            }
        } else if (route.params?.isAddStudent == true) {
            setIsAddStudent(true);
            setStudentLoaded(true);
            setIsEditView(true);
        }
    }, [])

    useEffect(() => {
        if (student) {
            getBorrowedBooksByStudentId(student.id, setBorrowedBooks, setError);
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setOrigFirstName(student.firstName);
            setOrigLastName(student.lastName);
        }
    }, [student])

    useEffect(() => {
        setIsSaveDisabled(!valuesHaveChanged());
    }, [firstName, lastName])

    const valuesHaveChanged = () => {
        return valueHasChanged(firstName, origFirstName) || valueHasChanged(lastName, origLastName);
    }

    const valueHasChanged = (value, origValue) => {
        if (value == '' && origValue == undefined) {
            return false;
        }
        return value != origValue;
    }

    const add = () => {
        const newStudent = {
            firstName: firstName,
            lastName: lastName
        }
        addStudent(newStudent, onSuccess, failAlert, setError);
    }

    const update = () => {
        if (student) {
            student.firstName = firstName;
            student.lastName = lastName;
            updateStudent(student, onSuccess, failAlert, setError);
        }
    }

    const remove = () => {
        confirmAlert('Are you sure you want to remove this student?', doRemove);
    }

    const doRemove = () => {
        removeStudent(student.id, navigation, setStudentLoaded, successAlert, failAlert, setError);
    }

    const onSuccess = (student, alertMessage) => {
        setStudent(student);
        setIsEditView(false);
        setIsSaveDisabled(true);
        setIsAddStudent(false);
        successAlert(alertMessage);
    }

    const renderContent = () => {
        if (!studentLoaded) {
            return <ActivityIndicator size='large' />;
        }
        if (error) {
            return <Text>{error.message}</Text>;
        }
        return (
            isEditView ? renderEditView() : renderReadView() 
        )
    }

    const renderReadView = () => {
        return (
            <>
            <Header
                leftIcon='arrow-left'
                leftIconAction={() => navigation.pop()}
                title='Student Info'
                rightIcon='pencil-outline'
                rightIconAction={() => {setIsEditView(true)}}
                secondRightIcon={'trash-can-outline'}
                secondRightIconAction={remove}
            />
            <View style={styles.item}>
                <Text style={styles.title}>{student.firstName + ' ' + student.lastName}</Text>
            </View>
            {renderBorrowedBooks()}
            </>
        )
    }

    const renderEditView = () => {
        return (
            <>
            <Header
                leftIcon='arrow-left'
                leftIconAction={() => navigation.pop()}
                title='Student Info'
            />
            <View style={styles.editNameRow}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    placeholder='Enter First Name'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    placeholder='Enter Last Name'
                />
            </View>
            {borrowedBooks?.length > 0 && renderBorrowedBooks()}
            <View style={styles.spacer} />
            {renderFooterEdit()}
            </>
        )
    }

    const renderBorrowedBooks = () => {
        if (!borrowedBooks) {
            return <ActivityIndicator size='large' />;
        }
        return (
            <View style={styles.borrowedBooksContainer}>
                <Text style={styles.borrowedBooksTitle}>Borrowed Books</Text>
                {borrowedBooks.length == 0 ? (
                    <Text>No books borrowed.</Text>
                ) : (
                    borrowedBooks.map((book, index) => {
                        return <Text key={index}>{book.book.title} {book.borrowed}</Text>;
                    })
                )}
            </View>
        )
    }

    const renderFooterEdit = () => {
        return (
            <View style={styles.footer}>
                <View style={styles.footerIconRow}>
                    <View style={styles.icon50}>
                        <TouchableOpacity style={styles.icon} onPress={isAddStudent ? add : update} disabled={isSaveDisabled}>
                            <MaterialCommunityIcons name='content-save-outline' size={28} color={isSaveDisabled ? COLORS.lightGray : COLORS.bookboxBlue} />
                            <Text style={[styles.iconText, isSaveDisabled ? styles.disabledIconText : '']}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.icon50, styles.borderLeft]}>
                        <TouchableOpacity style={[styles.icon]} onPress={() => {isAddStudent ? navigation.pop() : setIsEditView(false)}}>
                            <MaterialCommunityIcons name='cancel' size={28} color={COLORS.bookboxBlue} />
                            <Text style={styles.iconText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderContent()}
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    author: {
        fontSize: 16,
        textAlign: 'center',
    },
    editNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    input: {
        height: 40,
        width: '35%',
        margin: 5,
        borderBottomWidth: 1,
        padding: 10,
    },
    footer:{
        height: 60,
        width: '100%',
        backgroundColor: COLORS.white,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: COLORS.black,
        justifyContent: 'center',
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
    spacer: {
      flex: 1,
    },
    borderLeft: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: COLORS.black,
    },
    borrowedBooksContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    borrowedBooksTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
})

export default StudentDetailsScreen;