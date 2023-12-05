import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function StudentListItem({student, onPress}) {

    return (
        student && 
        <>
        <TouchableOpacity style={styles.studentRow} onPress={onPress}>
            <View style={styles.item}>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.title}>{student.firstName + ' ' + student.lastName}</Text>
                </View>
            </View>
        </TouchableOpacity>
        <View style={styles.horizontalRule} />
        </>
    )
}

const styles = StyleSheet.create({
    studentRow: {
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    cover: {
        marginRight: 20,
    },
    title: {
        fontSize: 16,
    },
    author: {
        fontSize: 16,
        textAlign: 'center',
    },
    horizontalRule: {
        borderTopColor: 'black',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
})