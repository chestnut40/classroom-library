import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from '../utils/Colors';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BarCodeScannerScreen({navigation}) {

    const [hasPermission, setHasPermission] = useState(null);
    const [text, setText] = useState('Scan Barcode');
    
    const isFocused = useIsFocused();

    const askForCameraPersmission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })()
    }

    useEffect(() => {
        askForCameraPersmission();
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        setText(data);
        navigation.navigate('Book Details', {isbn: data})
    }

    const renderFooter = () => {
        return (
            <View style={[styles.footer]}>
                <TouchableOpacity style={[styles.icon]} onPress={() => navigation.navigate('Bookbox Library')}>
                    <MaterialCommunityIcons name='cancel' size={28} color={COLORS.bookboxBlue} />
                    <Text style={styles.iconText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (hasPermission == null) {
        return(
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if (!hasPermission) {
        return(
            <View style={styles.container}>
                <Text style={{margin: 10}}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPersmission()} />
            </View>
        )
    }

    return (
        isFocused &&
            <View style={styles.container}>
                <View style={styles.barcodebox}>
                    <BarCodeScanner
                        onBarCodeScanned={handleBarCodeScanned}
                        style={{ height: 400, width: 400 }}
                    />
                </View>
                {renderFooter()}
            </View>
    );
}

BarCodeScannerScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.bookboxBlue,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    barcodebox: {
        marginTop: 200,
        alignItems: 'center',
        justifyContent: 'center',
        height: 350,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
    },
    mainText: {
        fontSize: 16,
        margin: 20,
    },
    footer:{
        marginTop: 'auto',
        position: 'fixed',
        bottom: 0,
        height: 60,
        width: '100%',
        backgroundColor: COLORS.white,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 10,
        color: COLORS.bookboxBlue,
    },
})