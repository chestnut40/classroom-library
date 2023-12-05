// package imports
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import PropTypes from 'prop-types';

// app imports
import { COLORS } from "../utils/Colors";
import { successAlert, failAlert, confirmAlert } from '../utils/Alert';
import { login } from '../services/ApiService';
import InputModal from '../components/InputModal';

const DrawerContent = (props) => {

    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [switchValue, setSwitchValue] = useState(props.isStudentMode);

    const toggleSwitch = () => {
        if (props.isStudentMode) {
            setModalVisible(true);
            setSwitchValue(false);
        } else {
            setPassword('');
            props.setIsStudentMode(true);
            setSwitchValue(true);
        }
    }

    const onPasswordSuccess = () => {
        setModalVisible(false);
        props.setIsStudentMode(false);
        successAlert('Student Mode turned off!');
    }

    const onPasswordFailure = () => {
        cancelPassword();
        props.setIsStudentMode(true);
        failAlert('Unable to verify password');
    }

    const cancelPassword = () => {
        setModalVisible(false);
        setSwitchValue(true);
        setPassword('');
    }

    const onSubmit = () => {
        setModalVisible(false);
        const loginInfo = {email: props.userEmail, password: password.trim()};
        login(loginInfo, onPasswordSuccess, onPasswordFailure, null);
    }

    const onCancel = () => {
        setSwitchValue(true);
    }

    const logout = () => {
        props.setUserEmail(null);
        props.setAuthentication(false);
    }
    
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={[styles.drawerSection, styles.smallPadding]}>
                <View style={[styles.row, styles.toggleRow]}>
                    <View style={styles.row}>
                        <Text style={styles.switchText}>Student Mode</Text>
                        <Text style={styles.switchText}>{props.isStudentMode ? "ON" : "OFF"}</Text>
                    </View>
                    <Switch
                        trackColor={{false: COLORS.toggleOffTrack, true: COLORS.toggleOnTrack}}
                        thumbColor={switchValue ? COLORS.bookboxBlue : COLORS.toggleOffButton}
                        // ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={switchValue}
                    />
                </View>
            </View>
            {!props.isStudentMode &&
                <View style={[styles.drawerSection, styles.largePadding, styles.marginBottom]}>
                        <TouchableOpacity
                            onPress={() => {
                                confirmAlert('Are you sure you want to log out?', logout);
                            } }>
                            <Text style={styles.switchText}>Sign Out</Text>
                        </TouchableOpacity>
                </View>
            }
            <InputModal
                message='Enter password to turn Student Mode off'
                placeholder='Password'
                actionButtonText='Submit'
                isModalVisible={modalVisible}
                setIsModalVisible={setModalVisible}
                inputPhrase={password}
                setInputPhrase={setPassword}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </View>
    )
}

export default DrawerContent;

DrawerContent.propTypes = {
    isStudentMode: PropTypes.bool,
    setIsStudentMode: PropTypes.func,
    userEmail: PropTypes.string,
    setUserEmail: PropTypes.func,
    setAuthentication: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerSection: {
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
    },
    smallPadding: {
        padding: 10,
    },
    largePadding: {
        padding: 20,
    },
    marginBottom: {
        marginBottom: 10,
    },
    toggleRow: {
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchText: {
        marginHorizontal: 5,
        fontWeight: '500',
    },
})