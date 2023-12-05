// package imports
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// app imports
import { login } from '../services/ApiService';
import { COLORS } from '../utils/Colors';

export default function LoginScreen({ navigation, setAuthentication, setUserEmail }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailRequiredError, setEmailRequiredError] = useState('');
    const [passwordRequiredError, setPasswordRequiredError] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [loginError, setLoginError] = useState('');

    let loginInfo = {email, password};

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            setEmail('');
            setPassword('');
            setEmailRequiredError('');
            setPasswordRequiredError('');
            setLoginError('');
        });
        return focusHandler;
    }, [navigation]);

    useEffect(() => {
        if (emailHasText()) {
            loginInfo.email = email.trim().toLowerCase();
        }
        if (passwordHasText()) {
            loginInfo.password = password.trim();
        }
    }, [email, password]);

    const onSubmit = () => {
        if (!emailHasText()) {
            setEmailRequiredError('Email required');
        } else {
            setEmailRequiredError('');
        }
        if (!passwordHasText()) {
            setPasswordRequiredError('Password required');
        } else {
            setPasswordRequiredError('');
        }
        if (emailHasText() && passwordHasText()) {
            setLoginError('');
            doLogin();
        }
    }

    const onSuccess = (email) => {
        setUserEmail(email);
        setAuthentication(true);
    }

    const emailHasText = () => {
        return email != undefined && email.trim().length > 0;
    }

    const passwordHasText = () => {
        return password != undefined && password.trim().length > 0;
    }

    const doLogin = () => {
        login(loginInfo, onSuccess, null, setLoginError)
    }

    const goToCreateAccount = () => {
        navigation.navigate('Create Account');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder='Email'
                    />
                    {emailRequiredError.length > 0 && (
                        <View style={styles.error}>
                            <Text style={styles.errorMessage}>{emailRequiredError}</Text>
                        </View>
                    )}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            placeholder='Password'
                            secureTextEntry={isPasswordSecure}
                        />
                        <MaterialCommunityIcons
                        name={isPasswordSecure ? 'eye-off' : 'eye'}
                        size={28}
                        color={COLORS.gray}
                        onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                        />
                    </View>
                    {passwordRequiredError.length > 0 && (
                        <View style={styles.error}>
                            <Text style={styles.errorMessage}>{passwordRequiredError}</Text>
                        </View>
                    )}
                    {loginError.length > 0 && (
                        <View style={styles.error}>
                            <Text style={styles.errorMessage}>{loginError}</Text>
                        </View>
                    )}
                    <TouchableOpacity onPress={onSubmit}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.signUpContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={goToCreateAccount}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </View> 
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

LoginScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      addListener: PropTypes.func.isRequired,
    }).isRequired,
    setUserEmail: PropTypes.func,
    setAuthentication: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
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
        marginVertical: 10,
        height: 40,
        backgroundColor: '#45bed6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    signUpContainer: {
        marginBottom: 20,
    },
    error: {
        marginHorizontal: 5,
    },
    errorMessage: {
        color: 'red',
    },
    passwordContainer: { 
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#fff',
        paddingHorizontal: 14, 
        borderBottomWidth: 1,
    }, 
    passwordInput: {
        flex: 1,
        paddingVertical: 10, 
        paddingRight: 10,
    }, 
    icon: { 
        marginLeft: 10, 
    }, 
})