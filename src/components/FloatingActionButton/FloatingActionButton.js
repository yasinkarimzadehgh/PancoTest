import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './FloatingActionButton.styles';

const FloatingActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>جدید</Text>
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;