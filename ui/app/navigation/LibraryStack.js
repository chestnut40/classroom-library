import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';
import LibraryScreen from '../screens/LibraryScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import BarCodeScannerScreen from '../screens/BarcodeScannerScreen';

export default function LibraryStack({ isStudentMode }) {
    
    const Stack = createNativeStackNavigator();

    return (
    <Stack.Navigator initialRouteName="Bookbox Library" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Bookbox Library">
            {(props) => <LibraryScreen {...props} isStudentMode={isStudentMode} />}
        </Stack.Screen>
        <Stack.Screen name="Book Details">
            {(props) => <BookDetailsScreen {...props} isStudentMode={isStudentMode} />}
        </Stack.Screen>
        <Stack.Screen name="Scan" component={BarCodeScannerScreen} />
    </Stack.Navigator>
    )
}

LibraryStack.propTypes = {
    isStudentMode: PropTypes.bool,
};