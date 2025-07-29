// App.js
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider, useDispatch } from 'react-redux'; // <--- useDispatch را از react-redux ایمپورت می‌کنیم
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/stores/store';
import { colors } from './src/styles/colors';
import styles from './App.styles';
import { initWebSocket } from './src/api/websocketService';
import { REGISTER_DEVICE_TOKEN } from './src/stores/notificationSaga';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initWebSocket();
    // به محض بالا آمدن اپ، درخواست ثبت توکن را ارسال کن
    dispatch({ type: REGISTER_DEVICE_TOKEN });
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.surface} />
        <AppContent />
      </SafeAreaView>
    </Provider>
  );
};

export default App;