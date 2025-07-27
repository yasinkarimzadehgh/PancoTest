
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Header.styles';


const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Text>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <Text>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;