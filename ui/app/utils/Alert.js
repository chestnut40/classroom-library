import { Alert } from 'react-native';

export const successAlert = (message) => {
    Alert.alert('Success!', message, [
        {text: 'OK'},
    ])
};

export const failAlert = (message) => {
    Alert.alert('', message, [
      {text: 'OK'},
    ])
};

export const confirmAlert = (message, yes) => {
    Alert.alert('', message, [
        {text: 'YES', onPress: yes},
        {text: 'NO'}
    ])
}