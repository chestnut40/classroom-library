import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { COLORS } from '../utils/Colors';

const Header = ({
  leftIcon,
  leftIconAction,
  title,
  rightIcon,
  rightIconAction,
  secondRightIcon,
  secondRightIconAction }) => {
    return (
      <View style={styles.header}>
        <View style={styles.headerEnd}>
          <TouchableOpacity style={styles.paddingHorizontal} onPress={leftIconAction}>
            <MaterialCommunityIcons name={leftIcon} size={32} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.headerEnd}>
          {secondRightIcon &&
              <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={secondRightIconAction}>
                <MaterialCommunityIcons name={secondRightIcon} size={32} color={COLORS.white} />
              </TouchableOpacity>
          }
          {rightIcon &&
              <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={rightIconAction}>
                <MaterialCommunityIcons name={rightIcon} size={32} color={COLORS.white} />
              </TouchableOpacity>
          }
        </View>
      </View>
    );
};

export default Header;

Header.propTypes = {
  leftIcon: PropTypes.string,
  leftIconAction: PropTypes.func,
  title: PropTypes.string,
  rightIcon: PropTypes.string,
  rightIconAction: PropTypes.func,
  secondRightIcon: PropTypes.string,
  secondRightIconAction: PropTypes.func,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bookboxBlue,
  },
  headerEnd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white
  },
  paddingHorizontal: {
    paddingHorizontal: 10,
  },
});