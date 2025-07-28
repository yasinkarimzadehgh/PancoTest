// src/screens/ChatList/ChatListScreen.js
import React, { useState, useCallback } from 'react';
import { View, Alert, FlatList, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header/Header';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import useChatStore from '../../stores/chatStore';
import { FETCH_CHATS } from '../../stores/chatSaga';
import styles from './ChatListScreen.styles';

const ChatListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const { chats, error } = useChatStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch({ type: FETCH_CHATS, payload: { syncType: 2 } });
    setTimeout(() => {
        setIsRefreshing(false);
    }, 1500); 
  }, [dispatch]);
  
  const handleNewChatPress = () => Alert.alert('پیام جدید', 'عملکرد ایجاد چت جدید در اینجا پیاده‌سازی می‌شود.');
  
  const handleChatPress = (chat) => {
    if (chat.otherPartyId) {
      navigation.navigate('Profile', { userId: chat.otherPartyId });
    } else {
      Alert.alert('اطلاعات', 'این چت پروفایل کاربری قابل نمایش ندارد.');
    }
  };

  const renderItem = ({ item }) => ( <ChatListItem {...item} onPress={() => handleChatPress(item)} /> );
  
  if (error) {
    return ( <View style={styles.errorContainer}><Text style={styles.errorText}>خطا: {error}</Text></View> );
  }
  
  return (
    <View style={styles.container}>
      <Header title="گپ ها" />
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={
          <EmptyListComponent
            title="هنوز گپی نداری!"
            message="برای شروع گفتگو، دکمه + را لمس کن."
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <FloatingActionButton onPress={handleNewChatPress} />
    </View> // <--- اینجا تصحیح شد
  );
};

export default ChatListScreen;