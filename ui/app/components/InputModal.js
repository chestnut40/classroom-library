import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../utils/Colors';

function InputModal({
        message,
        placeholder,
        actionButtonText,
        isModalVisible,
        setIsModalVisible,
        inputPhrase,
        setInputPhrase,
        onSubmit,
        onCancel,
    }) {

    const [isActionButtonDisabled, setIsActionButtonDisabled] = useState(true);

    const submit = () => {
        setIsModalVisible(false);
        setIsActionButtonDisabled(true)
        if (onSubmit) {
            onSubmit();
        }
    }

    const cancel = () => {
        setIsModalVisible(false);
        setInputPhrase('');
        setIsActionButtonDisabled(true);
        if (onCancel) {
            onCancel();
        }
    }

    const renderSearchModal = () => {
        return (
            <View style={styles.centered}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setIsModalVisible(!isModalVisible);
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            {message &&
                                <Text style={styles.modalText}>{message}</Text>
                            }
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={COLORS.gray}
                                    onChangeText={(text) => {
                                        setInputPhrase(text);
                                        if (text.trim().length > 0) {
                                            setIsActionButtonDisabled(false)
                                        } else {
                                            setIsActionButtonDisabled(true)
                                        }
                                    }}
                                    value={inputPhrase}
                                    placeholder={placeholder}
                                />
                            </View>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    disabled={isActionButtonDisabled}
                                    onPress={() => { submit() }}>
                                    <View style={isActionButtonDisabled ? styles.disabledButton : styles.button}>
                                        <Text style={styles.buttonText}>{actionButtonText}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { cancel() }}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    return (
        renderSearchModal()
    );
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'stretch',
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        borderBottomWidth: 1,
        color: COLORS.black,
        borderColor: COLORS.black,
    },
    buttonRow: {
        flexDirection: 'row',
    },
    button: {
        marginVertical: 10,
        height: 40,
        backgroundColor: COLORS.bookboxBlue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    disabledButton: {
        marginVertical: 10,
        height: 40,
        backgroundColor: COLORS.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
})

export default InputModal;