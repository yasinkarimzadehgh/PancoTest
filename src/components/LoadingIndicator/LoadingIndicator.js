import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './LoadingIndicator.styles';

const LoadingIndicator = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <LottieView
        source={require('../../assets/animations/panco_loading.json')}
        style={styles.lottieAnimation}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingIndicator;