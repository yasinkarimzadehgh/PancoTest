import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './ProfileHeader.styles';

const ProfileHeader = ({ title, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>→</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ProfileHeader;