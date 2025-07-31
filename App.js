import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import { database } from './src/db';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/styles/colors';
import { initializeNetworkObserver } from './src/api/websocketService';
import useNotificationStore from './src/stores/notificationStore';
import useChatStore from './src/stores/chatStore';
import useProfileStore from './src/stores/profileStore';
import { setupNotificationHandlers } from './src/services/notificationHandler';

const App = () => {
  const { registerDevice } = useNotificationStore();
  const { fetchChats } = useChatStore();
  const { fetchOwnProfile } = useProfileStore();

  useEffect(() => {
    const unsubscribe = setupNotificationHandlers();
    initializeNetworkObserver();
    registerDevice();
    fetchChats({ syncType: 1 });
    fetchOwnProfile();
    return unsubscribe;
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;