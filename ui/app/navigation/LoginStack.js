import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';

const LoginStack = ({ setAuthentication, setUserEmail }) => {
    
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' options={{ headerShown: false }}>
                {(props) => <LoginScreen {...props} setAuthentication={setAuthentication} setUserEmail={setUserEmail} />}
            </Stack.Screen>
            <Stack.Screen name='Create Account' component={CreateAccountScreen} />
        </Stack.Navigator>
    )
}

export default LoginStack;