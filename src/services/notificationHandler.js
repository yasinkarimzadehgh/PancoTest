import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import useChatStore from '../stores/chatStore';

// Handler for when a message is received, works for both foreground and background.
const onMessageReceived = async (remoteMessage) => {
  console.log('[NotificationHandler] A new FCM message arrived!', JSON.stringify(remoteMessage, null, 2));

  // If the app is in the foreground, we manually display the notification.
  // In the background, Firebase handles displaying the notification automatically based on the payload.
  // However, we can use notifee for a consistent experience in all states.

  const { notification, data } = remoteMessage;

  if (notification) {
    // Create a channel for Android (required for displaying notifications)
    const channelId = await notifee.createChannel({
      id: 'panco-chat-channel',
      name: 'پیام‌های چت',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // a resource file named 'ic_launcher' in /android/app/src/main/res/mipmap-*
        pressAction: {
          id: 'default',
        },
      },
    });

    // Refresh chat list after receiving a notification
    // This ensures the UI is updated with the new message
    useChatStore.getState().fetchChats({ syncType: 2 });
  }
};

// Sets up all the message listeners.
export const setupNotificationHandlers = () => {
  // Listener for when a message is received while the app is in the foreground
  const unsubscribeForeground = messaging().onMessage(onMessageReceived);

  // Listener for when a message is received while the app is in the background or quit state
  messaging().setBackgroundMessageHandler(onMessageReceived);

  // Listener for when a user interacts with a notification in the foreground (e.g., presses it)
  const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('[NotificationHandler] User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('[NotificationHandler] User pressed notification', detail.notification);
        // Here you can add logic to navigate to a specific screen, e.g., the relevant chat.
        break;
    }
  });

  console.log('[NotificationHandler] Notification handlers set up.');

  // Return a function to unsubscribe from listeners when the component unmounts
  return () => {
    unsubscribeForeground();
    unsubscribeNotifee();
    console.log('[NotificationHandler] Unsubscribed from notification handlers.');
  };
};