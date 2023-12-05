import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

export default function BookListItem({book, onPress, disabled}) {

    return (
        book && 
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={styles.item}>
                {book.cover != undefined ? (
                    <Image style={styles.cover} source={{
                        width: 100,
                        height: 150,
                        uri: book.cover
                    }} />
                ) : (
                    <View style={styles.coverNotAvailable}>
                        <Text>{'Cover not \n available'}</Text>
                    </View>
                )
                }
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.title} numberOfLines={2}>{book.title == '' ? 'no title' : book.title}</Text>
                    {(book.authors[0] != undefined && book.authors[0].length > 0) ? <Text>{book.authors[0]}</Text> : <Text>Author Not Found</Text>}
                    {(book.authors[1] != undefined && book.authors[1].length > 0) && <Text>{book.authors[1]}</Text>}
                    {(book.authors[2] != undefined && book.authors[2].length > 0) && <Text>{book.authors[2]}</Text>}
                    {(book.authors[3] != undefined && book.authors[3].length > 0) && <Text>{book.authors[3]}</Text>}
                </View>
            </View>
            <View style={styles.horizontalRule} />
        </TouchableOpacity>
    )
}

BookListItem.propTypes = {
    book: PropTypes.object,
    onPress: PropTypes.func,
    disabled: PropTypes.bool
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    cover: {
        marginRight: 20,
    },
    coverNotAvailable: {
        marginRight: 20,
        width: 100,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    author: {
        fontSize: 16,
        textAlign: 'center',
    },
    horizontalRule: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})