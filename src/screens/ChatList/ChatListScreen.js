import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Alert, FlatList, Text } from 'react-native';
import Header from '../../components/Header/Header';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import useChatStore from '../../stores/chatStore';
import styles from './ChatListScreen.styles';

const ChatListScreen = ({ navigation }) => {
  const { chats, error, fetchChats, deleteChats, togglePinChat } = useChatStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const sortedChats = useMemo(() => {
    return chats;
  }, [chats]);
  
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchChats({ syncType: 2 });
    setIsRefreshing(false);
  }, [fetchChats]);

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
          onPress: () => togglePinChat({ chatId: item.id }),
        },
        {
          text: 'انتخاب',
          onPress: () => {
            setSelectionMode(true);
            setSelectedItems(new Set([item.id]));
          }
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
            deleteChats({ chatIds: Array.from(selectedItems) });
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
        keyExtractor={item => item.id}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={
          !isRefreshing && <EmptyListComponent title="شما هنوز گپی ندارید!" />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ direction: 'rtl' }}
        extraData={{selectionMode, selectedItems}}
      />
      {!selectionMode && <FloatingActionButton onPress={handleNewChatPress} />}
    </View>
  );
};
export default ChatListScreen;