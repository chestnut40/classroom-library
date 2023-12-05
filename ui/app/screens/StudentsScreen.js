import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAllStudents } from '../services/ApiService';
import StudentListItem from '../components/StudentListItem';
import Header from '../components/Header';
import { COLORS } from '../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function StudentsScreen({navigation}) {

    const [students, setStudents] = useState();
    const [studentsLoaded, setStudentsLoaded] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (!studentsLoaded) {
            getAllStudents(setStudents, setStudentsLoaded, setError);
        }
    }, []);

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getAllStudents(setStudents, setStudentsLoaded, setError);
        });
        return focusHandler;
    }, [navigation]);

    const add = () => {
        navigation.navigate('Student Details', {isAddStudent: true});
    }

    const renderListItem = ({item: student}) => ( 
        <StudentListItem 
            student={student}
            onPress={() => navigation.navigate('Student Details', {student: student})}
        />
    );

    const renderList = () => {
        if (!studentsLoaded) {
            return <ActivityIndicator size='large' />;
        }
        if (error) {
            return <Text>{error.message}</Text>;
        }
        return (
            <FlatList style={styles.list}
                data={students}
                renderItem={renderListItem}
                keyExtractor={student => student.id}
                showsVerticalScrollIndicator={false}
            >
            </FlatList>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon='menu' leftIconAction={() => navigation.openDrawer()} title='Students' />
            {renderList()}
            <View style={styles.spacer} />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.icon} onPress={add}>
                    <MaterialCommunityIcons name='account-plus-outline' size={28} color={COLORS.bookboxBlue} />
                    <Text style={styles.iconText}>Add Student</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    list: {
        flexGrow: 0,
        height: '90%',
        width: '100%',
        paddingHorizontal: 10,
    },
    spacer: {
      flex: 1,
    },
    icon: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 10,
        color: COLORS.bookboxBlue,
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
})

export default StudentsScreen;