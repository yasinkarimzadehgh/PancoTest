// src/screens/Splash/SplashScreen.js
// این فایل به درستی کار می‌کند و نیازی به تغییر ندارد.
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import useChatStore from '../../stores/chatStore';
import { FETCH_CHATS } from '../../stores/chatSaga';
import styles from './SplashScreen.styles';
import { colors } from '../../styles/colors';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  // از یک listener استفاده می‌کنیم تا به تغییرات store واکنش نشان دهیم
  const isLoading = useChatStore((state) => state.isLoading);

  useEffect(() => {
    // فقط یک بار، درخواست بارگذاری اولیه را ارسال کن
    dispatch({ type: FETCH_CHATS, payload: { syncType: 1 } });
  }, [dispatch]);

  useEffect(() => {
    // هرگاه isLoading تغییر کرد و false شد، ناوبری کن
    if (!isLoading) {
      navigation.replace('ChatList');
    }
  }, [isLoading, navigation]);

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