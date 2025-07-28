import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Avatar from '../Avatar/Avatar';
import styles from './ChatListItem.styles';

const MessageStatus = ({ status }) => {
  if (!status || status === 'sending') return null;
  const check = '✓';
  let color = '#9CA3AF';
  let content = check;
  if (status === 'delivered') color = '#9CA3AF';
  if (status === 'read') {
    content = check + check;
    color = '#34D399';
  }
  return <Text style={[styles.statusIcon, { color }]}>{content}</Text>;
};

const Checkbox = ({ isSelected }) => (
  <View style={[styles.checkboxContainer, isSelected && styles.checkboxSelected]}>
    {isSelected && <Text style={styles.checkmark}>✓</Text>}
  </View>
);

const ChatListItem = (props) => {
  const { name, lastMessage, time, unreadCount, avatarUrl, isOnline, isTyping, status, pinned,
          onPress, onLongPress, selectionMode, isSelected } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {selectionMode && <Checkbox isSelected={isSelected} />}

      <View style={styles.contentWrapper}>
        <View style={styles.avatarContainer}>
          <Avatar name={name} imageUrl={avatarUrl} size={55} />
          {isOnline && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.mainContentContainer}>
          <View style={styles.topRow}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.messageGroup}>
              {isTyping ? (
                <Text style={styles.typingText} numberOfLines={1}>در حال نوشتن...</Text>
              ) : (
                <>
                  <MessageStatus status={status} />
                  <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage}</Text>
                </>
              )}
            </View>

            <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
              {pinned && <Text style={styles.pinIcon}>📌</Text>}
              {unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{unreadCount}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ChatListItem);