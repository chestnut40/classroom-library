import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentsScreen from '../screens/StudentsScreen';
import StudentDetailsScreen from '../screens/StudentDetailsScreen';

export default function StudentStack() {
    
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Students" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Students List" component={StudentsScreen} />
            <Stack.Screen name="Student Details" component={StudentDetailsScreen} />
        </Stack.Navigator>
    )
}