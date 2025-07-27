// App.js (در ریشه پروژه)

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import store from './src/stores/store';
import { colors } from './src/styles/colors';
import styles from './App.styles';
import { initWebSocket } from './src/api/websocketService'; // ایمپورت سرویس WebSocket

const App = () => {
  useEffect(() => {
    // در اولین اجرای اپلیکیشن، اتصال WebSocket را برقرار کن
    initWebSocket();

    // (اختیاری) در زمان بسته شدن اپ، اتصال را قطع کن
    return () => {
      // disconnectWebSocket();
    };
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.background} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;