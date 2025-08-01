import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './ProfileHeader.styles';
import images_map from '../../assets/images/images_map';

const ProfileHeader = ({ title, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Image source={images_map.back} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ProfileHeader;