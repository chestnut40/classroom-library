// package imports
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// app imports
import LibraryStack from './LibraryStack';
import StudentStack from './StudentStack';
import DrawerContent from '../components/DrawerContent';
import { COLORS } from '../utils/Colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({
  isStudentMode,
  setIsStudentMode,
  setAuthentication,
  userEmail,
  setUserEmail }) => {
    return (
      <Drawer.Navigator 
        drawerContent={(props) => 
          <DrawerContent
            {...props}
            isStudentMode={isStudentMode}
            setIsStudentMode={setIsStudentMode}
            setAuthentication={setAuthentication}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
          />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: COLORS.bookboxBlue,
          drawerActiveTintColor: COLORS.white,
        }}>
        <Drawer.Screen name="Library" options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name='book-open-page-variant-outline' size={28} color={color} />
          )
        }}>
          {(props) => <LibraryStack {...props} isStudentMode={isStudentMode} />}
        </Drawer.Screen>
        {!isStudentMode &&
          <Drawer.Screen name="Students" component={StudentStack} options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons name='account-group-outline' size={28} color={color} />
            )
          }} />
        }
      </Drawer.Navigator>
    );
};

export default DrawerNavigator;

DrawerNavigator.propTypes = {
    isStudentMode: PropTypes.bool,
    setIsStudentMode: PropTypes.func,
    userEmail: PropTypes.string,
    setUserEmail: PropTypes.func,
    setAuthentication: PropTypes.func,
};
