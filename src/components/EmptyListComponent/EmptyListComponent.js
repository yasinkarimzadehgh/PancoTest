import React from 'react';
import { View, Text } from 'react-native';
import styles from './EmptyListComponent.styles';

const EmptyListComponent = ({ title, message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.subText}>{message}</Text>
    </View>
  );
};

export default EmptyListComponent;