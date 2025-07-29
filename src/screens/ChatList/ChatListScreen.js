import React, { useState, useCallback, useMemo } from 'react';
import { View, Alert, FlatList, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import useChatStore from '../../stores/chatStore';
import { FETCH_CHATS, DELETE_CHATS, TOGGLE_PIN_CHAT } from '../../stores/chatSaga';
import styles from './ChatListScreen.styles';

const ChatListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const chats = useChatStore((state) => state.chats);
  const error = useChatStore((state) => state.error);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [chats]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch({ type: FETCH_CHATS, payload: { syncType: 2 } });
    setTimeout(() => {
        setIsRefreshing(false);
    }, 1500);
  }, [dispatch]);

  const handleNewChatPress = () => Alert.alert('جدید', 'ایجاد چت جدید...');

  const toggleSelection = (itemId) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const handleItemPress = (item) => {
    if (selectionMode) {
      toggleSelection(item.id);
    } else {
      if (item.otherPartyId) {
        navigation.navigate('Profile', { userId: item.otherPartyId });
      } else {
        Alert.alert('اطلاعات', 'این چت پروفایل کاربری قابل نمایش ندارد.');
      }
    }
  };

  const handleItemLongPress = (item) => {
    if (selectionMode) {
      toggleSelection(item.id);
      return;
    }
    Alert.alert(
      item.name,
      'چه کاری می‌خواهید انجام دهید؟',
      [
        {
          text: item.pinned ? 'لغو پین' : 'پین کردن',
          onPress: () => dispatch({ type: TOGGLE_PIN_CHAT, payload: { chatId: item.id } }),
        },
        {
          text: 'انتخاب',
          onPress: () => {
            setSelectionMode(true);
            setSelectedItems(new Set([item.id]));
          },
        },
        { text: 'لغو', style: 'cancel' },
      ]
    );
  };

  const handleDeleteSelected = () => {
    Alert.alert(
      `حذف ${selectedItems.size} چت`,
      'آیا مطمئن هستید؟ این عمل غیرقابل بازگشت است.',
      [
        { text: 'لغو', style: 'cancel' },
        {
          text: 'حذف کن',
          style: 'destructive',
          onPress: () => {
            const chatIdsToDelete = Array.from(selectedItems);
            dispatch({ type: DELETE_CHATS, payload: { chatIds: chatIdsToDelete } });
            setSelectionMode(false);
            setSelectedItems(new Set());
          },
        },
      ]
    );
  };

  if (error) {
    return ( <View style={styles.errorContainer}><Text style={styles.errorText}>خطا: {error}</Text></View> );
  }

  return (
    <View style={styles.container}>
      <Header
        title="گپ ها"
        selectionMode={selectionMode}
        selectedCount={selectedItems.size}
        onSearchPress={() => console.log('Search pressed')}
        onDeletePress={() => setSelectionMode(true)}
        onCancelSelection={() => {
          setSelectionMode(false);
          setSelectedItems(new Set());
        }}
        onConfirmDelete={handleDeleteSelected}
      />

      <FlatList
        data={sortedChats}
        renderItem={({ item }) => (
          <ChatListItem
            {...item}
            selectionMode={selectionMode}
            isSelected={selectedItems.has(item.id)}
            onPress={() => handleItemPress(item)}
            onLongPress={() => handleItemLongPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={
          !isRefreshing && <EmptyListComponent title="شما هنوز گپی ندارید!" />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ direction: 'rtl' }}
        extraData={{ selectionMode, selectedItems }}
      />
      {!selectionMode && <FloatingActionButton onPress={handleNewChatPress} />}
    </View>
  );
};

export default ChatListScreen;