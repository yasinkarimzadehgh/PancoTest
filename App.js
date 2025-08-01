import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import { database } from './src/db';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/styles/colors';
import { initializeNetworkObserver } from './src/api/websocketService';
import useNotificationStore from './src/stores/notification';
import useChatStore from './src/stores/chat';
import useUserStore from './src/stores/user';
import { setupNotificationHandlers } from './src/services/notificationHandler';

const App = () => {
  const { registerDevice } = useNotificationStore();
  const { fetchChats } = useChatStore();
  const { fetchOwnProfile } = useUserStore();

  useEffect(() => {
    // console.log('[App.js] Main useEffect mounting...');
    const unsubscribe = setupNotificationHandlers();
    initializeNetworkObserver();
    registerDevice();
    fetchOwnProfile();
    fetchChats({ syncType: 1 });

    return () => {
      // console.log('[App.js] Main useEffect unmounting...');
      unsubscribe();
    };
  }, [registerDevice, fetchChats, fetchOwnProfile]);

  return (
    <DatabaseProvider database={database}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.surface} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </DatabaseProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background }
});

export default App;