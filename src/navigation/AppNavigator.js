import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash/SplashScreen';
import ChatListScreen from '../screens/ChatList/ChatListScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import useChatStore from '../stores/chat';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isLoading = useChatStore((state) => state.isLoading);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {isLoading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : (
        <>
          <Stack.Screen name="ChatList" component={ChatListScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;