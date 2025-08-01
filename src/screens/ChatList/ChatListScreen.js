import React, { useState, useCallback } from 'react';
import { View, Alert, FlatList, Text } from 'react-native';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import { map } from 'rxjs/operators';
import Header from '../../components/Header/Header';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import useChatStore from '../../stores/chat';
import styles from './ChatListScreen.styles';
import { database } from '../../db';
import images_map from '../../assets/images/images_map';
import { t } from '../../utils/localizationUtils';
import { OWNER_USER_ID } from '../../api/config';

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
  const { error, deleteChats, togglePinChat } = useChatStore();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [revealedChatItemId, setRevealedChatItemId] = useState(null);

  const handleNewChatPress = () => Alert.alert(t('fab.new'), t('chatList.newChatAlert'));

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
        Alert.alert(t('common.info'), t('chatList.noProfile'));
      }
    }
  };

  const handleItemLongPress = (item) => {
    if (selectionMode) return;
    setRevealedChatItemId(prevId => prevId === item.id ? null : item.id);
  };

  const handleDeleteSelected = () => {
    Alert.alert(
      t('chatList.deleteCountTitle', { count: selectedItems.size }),
      t('chatList.deleteConfirmMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('chatList.confirmDelete'),
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
      t('chatList.deleteSingleTitle', { name: item.name }),
      t('chatList.deleteConfirmMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('chatList.confirmDelete'),
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
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('common.errorPrefix', { error: error })}</Text>
      </View>
    );
  }

  const renderChatItem = ({ item }) => {
    const isRevealed = revealedChatItemId === item.id;
    const actions = [
      {
        label: item.isPinned ? t('chatList.unpin') : t('chatList.pin'),
        icon: item.isPinned ? images_map.unpin : images_map.pin,
        onPress: () => {
          togglePinChat({ chatId: item.remoteId });
          setRevealedChatItemId(null);
        },
      },
      { label: t('common.delete'), icon: images_map.delete, onPress: () => handleSingleDelete(item) },
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
        title={t('chatList.title')}
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
        ItemSeparatorComponent={ChatDivider}
        ListEmptyComponent={
          <EmptyListComponent title={t('chatList.emptyMessage')} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        extraData={{ selectionMode, selectedItems, owner, revealedChatItemId }}
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