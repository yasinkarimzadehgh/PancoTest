import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/styles/colors';
import { initWebSocket } from './src/api/websocketService';
import useNotificationStore from './src/stores/notificationStore';
import useChatStore from './src/stores/chatStore';

const App = () => {
  const { registerDevice } = useNotificationStore();
  const { fetchChats } = useChatStore();

  useEffect(() => {
    initWebSocket();
    registerDevice();
    fetchChats({ syncType: 1 });
  }, [registerDevice, fetchChats]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.surface} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;