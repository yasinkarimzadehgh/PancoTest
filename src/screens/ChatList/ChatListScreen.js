import React, { useState, useCallback } from 'react';
import { View, Alert, FlatList, Text } from 'react-native';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import { map } from 'rxjs/operators';

import Header from '../../components/Header/Header';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import useChatStore from '../../stores/chatStore';
import styles from './ChatListScreen.styles';
import { database } from '../../db';
import { OWNER_USER_ID } from '../../api/config';
import images_map from '../../assets/images/images_map';

const formatChatTimestamp = (timestamp) => {
  if (!timestamp) return '';

  const messageDate = new Date(timestamp);
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (messageDate >= startOfToday) {
    return messageDate.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    return messageDate.toLocaleDateString('fa-IR', {
      month: 'long',
      day: 'numeric',
    });
  }
};

const ChatDivider = () => <View style={styles.divider} />;

const ChatListScreen = ({ navigation, chats, owner }) => {
  const { error, fetchChats, deleteChats, togglePinChat } = useChatStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [revealedChatItemId, setRevealedChatItemId] = useState(null);

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
    if (revealedChatItemId) {
      setRevealedChatItemId(null);
      return;
    }
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
    if (selectionMode) return;
    setRevealedChatItemId(prevId => prevId === item.id ? null : item.id);
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
            const remoteIdsToDelete = chats
              .filter(c => selectedItems.has(c.id))
              .map(c => c.remoteId);
            deleteChats({ chatIds: remoteIdsToDelete });
            setSelectionMode(false);
            setSelectedItems(new Set());
          },
        },
      ]
    );
  };

  const handleSingleDelete = (item) => {
    Alert.alert(
      `حذف چت با ${item.name}`,
      'آیا مطمئن هستید؟ این عمل غیرقابل بازگشت است.',
      [
        { text: 'لغو', style: 'cancel' },
        {
          text: 'حذف کن',
          style: 'destructive',
          onPress: () => {
            setRevealedChatItemId(null);
            deleteChats({ chatIds: [item.remoteId] });
          },
        },
      ]
    );
  };

  if (error) {
    return ( <View style={styles.errorContainer}><Text style={styles.errorText}>خطا: {error}</Text></View> );
  }

  const renderChatItem = ({ item }) => {
    const isRevealed = revealedChatItemId === item.id;
    const actions = [
      {
        label: item.isPinned ? 'آن‌پین' : 'پین',
        icon: item.isPinned ? images_map.unpin : images_map.pin,
        onPress: () => {
          togglePinChat({ chatId: item.remoteId });
          setRevealedChatItemId(null);
        },
      },
      { label: 'حذف', icon: images_map.delete, onPress: () => handleSingleDelete(item) },
    ];

    return (
      <ChatListItem
        name={item.name}
        lastMessage={item.lastMessage}
        avatarUrl={item.avatarUrl}
        unreadCount={item.unreadCount}
        pinned={item.isPinned}
        time={formatChatTimestamp(item.lastMessageAt)}
        selectionMode={selectionMode}
        isSelected={selectedItems.has(item.id)}
        onPress={() => handleItemPress(item)}
        onLongPress={() => handleItemLongPress(item)}
        isRevealed={isRevealed}
        actions={actions}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="گپ ها"
        selectionMode={selectionMode}
        selectedCount={selectedItems.size}
        ownerName={owner?.name}
        ownerAvatarUrl={owner?.avatarUrl}
        onAvatarPress={() => owner && navigation.navigate('Profile', { userId: owner.remoteId })}
        onDeletePress={() => setSelectionMode(true)}
        onCancelSelection={() => {
          setSelectionMode(false);
          setSelectedItems(new Set());
        }}
        onConfirmDelete={handleDeleteSelected}
      />
      
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        ItemSeparatorComponent={ChatDivider}
        ListEmptyComponent={
          !isRefreshing && <EmptyListComponent title="شما هنوز گپی ندارید!" />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        extraData={{selectionMode, selectedItems, owner, revealedChatItemId}}
      />
      
      {!selectionMode && <FloatingActionButton onPress={handleNewChatPress} />}
    </View>
  );
};

const enhance = withObservables([], () => ({
  chats: database.get('chats').query(
    Q.sortBy('is_pinned', Q.desc),
    Q.sortBy('last_message_at', Q.desc)
  ).observe(),
  owner: database.get('users').query(Q.where('remote_id', OWNER_USER_ID))
    .observe()
    .pipe(
      map(users => users[0])
    ),
}));

export default enhance(ChatListScreen);