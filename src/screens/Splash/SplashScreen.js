import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import styles from './SplashScreen.styles';
import { colors } from '../../styles/colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/chat/user.webp')}
      />
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>در حال بارگذاری اطلاعات...</Text>
    </View>
  );
};

export default SplashScreen;