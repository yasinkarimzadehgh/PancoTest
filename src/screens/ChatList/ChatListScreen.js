import React, { useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import moment from 'jalali-moment';
import Header from '../../components/Header/Header';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import useChatStore from '../../stores/chat';
import styles from './ChatListScreen.styles';
import { database } from '../../db';
import images_map from '../../assets/images/images_map';
import { t } from '../../utils/localizationUtils';

const formatChatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const messageMoment = moment(timestamp);
  if (messageMoment.isSame(moment(), 'day')) {
    return messageMoment.locale('fa').format('HH:mm');
  } else {
    return messageMoment.locale('fa').format('D MMMM');
  }
};

const ChatDivider = () => <View style={styles.divider} />;

const ChatListScreen = ({ navigation, chats }) => {
  const { error, deleteChats, togglePinChat } = useChatStore();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [revealedChatItemId, setRevealedChatItemId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [chatsToDelete, setChatsToDelete] = useState([]);

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
    } else if (item.otherPartyId) {
      navigation.navigate('Profile', { userId: item.otherPartyId });
    }
  };

  const handleItemLongPress = (item) => {
    if (selectionMode) return;
    setRevealedChatItemId(prevId => prevId === item.id ? null : item.id);
  };

  const handleDeleteSelected = () => {
    const remoteIdsToDelete = chats
      .filter(c => selectedItems.has(c.id))
      .map(c => c.remoteId);
    setChatsToDelete(remoteIdsToDelete);
    setModalVisible(true);
  };

  const handleSingleDelete = (item) => {
    setChatsToDelete([item.remoteId]);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (chatsToDelete.length > 0) {
      deleteChats({ chatIds: chatsToDelete });
    }
    setModalVisible(false);
    setChatsToDelete([]);
    if (selectionMode) {
      setSelectionMode(false);
      setSelectedItems(new Set());
    }
    if (revealedChatItemId) {
      setRevealedChatItemId(null);
    }
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
        extraData={{ selectionMode, selectedItems, revealedChatItemId }}
      />

      {!selectionMode && <FloatingActionButton onPress={handleNewChatPress} />}

      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmDelete}
        title={t('modals.deleteConfirm.title')}
        confirmText={t('modals.deleteConfirm.confirmText')}
        cancelText={t('modals.deleteConfirm.cancelText')}
      />
    </View>
  );
};

const enhance = withObservables([], () => ({
  chats: database.get('chats').query(
    Q.sortBy('is_pinned', Q.desc),
    Q.sortBy('last_message_at', Q.desc)
  ).observe(),
}));

export default enhance(ChatListScreen);