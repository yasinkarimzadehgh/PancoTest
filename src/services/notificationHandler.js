import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import useChatStore from '../stores/chat';
import { t } from '../utils/localizationUtils';

const onMessageReceived = async (remoteMessage) => {
  const { data } = remoteMessage;

  if (data && data.message_info) {
    try {
      const messageInfo = typeof data.message_info === 'string'
        ? JSON.parse(data.message_info)
        : data.message_info;

      const title = messageInfo.sender_first_name || t('notification.newMessageTitle');
      const body = messageInfo.body || t('notification.newMessageBody');

      const channelId = await notifee.createChannel({
        id: 'panco-chat-channel',
        name: t('notification.channelName'),
        sound: 'default',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title,
        body,
        data: { message_info: data.message_info },
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: { id: 'default', launchActivity: 'default' },
        },
      });

      useChatStore.getState().fetchChats({ syncType: 2 });
    } catch (error) {
      console.error('Error processing foreground notification:', error);
    }
  }
};

const onNotificationOpenedApp = (remoteMessage) => {
  if (remoteMessage) {
    console.log('Notification caused app to open from background state:', remoteMessage.notification);
  }
};

export const setupNotificationHandlers = () => {
  const unsubscribeForeground = messaging().onMessage(onMessageReceived);
  messaging().onNotificationOpenedApp(onNotificationOpenedApp);
  messaging().getInitialNotification().then(onNotificationOpenedApp);

  const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      console.log('User pressed notification in foreground:', detail.notification);
    }
  });

  return () => {
    unsubscribeForeground();
    unsubscribeNotifee();
  };
};