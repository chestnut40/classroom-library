import { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './app/navigation/LoginStack';
import DrawerNavigator from './app/navigation/DrawerNavigator';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [isStudentMode, setIsStudentMode] = useState(false);

  const setAuthentication = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <DrawerNavigator
          isStudentMode={isStudentMode}
          setIsStudentMode={setIsStudentMode}
          setAuthentication={setAuthentication}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      ) : (
        <LoginStack setAuthentication={setAuthentication} setUserEmail={setUserEmail} />
      )}
    </NavigationContainer>
  )
}
