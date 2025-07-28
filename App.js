import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import store from './src/stores/store';
import { colors } from './src/styles/colors';
import styles from './App.styles'; // <--- ایمپورت استایل
import { initWebSocket } from './src/api/websocketService';

const App = () => {
  useEffect(() => {
    initWebSocket();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.surface} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;