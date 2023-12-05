import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createAccount } from '../services/ApiService';
import { successAlert } from '../utils/Alert';

export default function CreateAccountScreen({ navigation }) {

    const emailRegex = /^\S+@\S+\.\S+$/;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstNameRequiredError, setFirstNameRequiredError] = useState('');
    const [lastNameRequiredError, setLastNameRequiredError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordRequiredError, setPasswordRequiredError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [createError, setCreateError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [account, setAccount] = useState();
    const [accountLoaded, setAccountLoaded] = useState();

    let accountInfo = {firstName, lastName, email, password};

    useEffect(() => {
        if (hasText(firstName)) {
            accountInfo.firstName = firstName.trim();
            setFirstNameRequiredError('');
        } 
        if (hasText(lastName)) {
            accountInfo.lastName = lastName.trim();
            setLastNameRequiredError('');
        }
        if (hasText(email) && email.match(emailRegex)) {
            accountInfo.email = email.trim().toLowerCase();
            setEmailError('');
        }
        if (hasText(password)) {
            accountInfo.password = password.trim();
            setPasswordRequiredError('');
        }
        if (password.length > 0 && confirmPassword.length > 0 && password != confirmPassword) {
            setPasswordMatchError('Passwords do not match');
        } else {
            setPasswordMatchError('');
        }
    }, [email, password, confirmPassword, firstName, lastName]);

    const onSubmit = () => {
        setCreateError('');
        if (validateFields()) {
            doCreateAccount();
        }
    }

    const hasText = (field) => {
        return field != undefined && field.trim().length > 0;
    }

    const validateEmailFormat = () => {
        if (hasText(email) && !email.match(emailRegex)) {
            setEmailError('Invalid email format');
            return false;
        }
        if (!hasText(email)) {
            setEmailError('Email required');
            return false;
        }
        setEmailError('');
        return true;
    }

    const validateFields = () => {
        let hasErrors = false;

        if (!validateEmailFormat()) {
            hasErrors = true;
        }
        if (!hasText(email)) {
            setEmailError('Email required');
            hasErrors = true;
        }
        if (!hasText(password)) {
            setPasswordRequiredError('Password required');
            hasErrors = true;
        } 
        if (!hasText(firstName)) {
            setFirstNameRequiredError('First Name required');
            hasErrors = true;
        }
        if (!hasText(lastName)) {
            setLastNameRequiredError('Last Name required');
            hasErrors = true;
        }
        if (password != confirmPassword) {
            setPasswordMatchError('Passwords do not match');
            hasErrors = true;
        }

        if (hasErrors) {
            return false;
        }
        
        if (hasText(accountInfo.email)) {
            accountInfo.email = accountInfo.email.toLowerCase();
        }
        return hasText(accountInfo.email) && hasText(accountInfo.password) && hasText(accountInfo.firstName) && hasText(accountInfo.lastName) && 
            accountInfo.password == confirmPassword;
    }

    const doCreateAccount = () => {
        createAccount(accountInfo, setAccount, setAccountLoaded, goToLogin, successAlert, setCreateError)
    }

    const goToLogin = () => {
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                        placeholder='First Name'
                    />
                    {firstNameRequiredError.length > 0 && (
                        <View style={styles.error}>
                            <Text style={styles.errorMessage}>{firstNameRequiredError}</Text>
                        </View>
                    )}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                        placeholder='Last Name'
                    />
                    {lastNameRequiredError.length > 0 && (
                        <View style={styles.error}>
                            <Text style={styles.errorMessage}>{lastNameRequiredError}</Text>
                        </View>
                    )}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        onBlur={validateEmailFormat}
                        value={email}
                        placeholder='Email'
                    />
                    {emailError.length > 0 && (
                        <View style={styles.error}>
                            <Text style={styles.errorMessage}>{emailError}</Text>
                        </View>
                    )}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholder='Password'
                    />
                    {passwordRequiredError.length > 0 && (
                        <View style={styles.error}>
                            <Text style={styles.errorMessage}>{passwordRequiredError}</Text>
                        </View>
                    )}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        placeholder='Confirm Password'
                    />
                    {passwordMatchError.length > 0 && (
                        <View style={styles.error}>
                            <Text style={styles.errorMessage}>{passwordMatchError}</Text>
                        </View>
                    )}
                </View>
                {createError.length > 0 && (
                    <View style={styles.error}>
                        <Text style={styles.errorMessage}>{createError}</Text>
                    </View>
                )}
                <TouchableOpacity onPress={onSubmit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </View> 
                </TouchableOpacity>
                <TouchableOpacity onPress={goToLogin}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </View> 
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    inputContainer: {
        flexDirection: 'column',
        width: '90%',
        margin: 10,
    },
    input: {
        height: 40,
        margin: 5,
        borderBottomWidth: 1,
        padding: 10,
    },
    button: {
        margin: 5,
        height: 40,
        width: 200,
        backgroundColor: '#45bed6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        marginHorizontal: 5,
    },
    errorMessage: {
        color: 'red',
    },
})