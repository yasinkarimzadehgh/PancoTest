// src/components/ChatListItem/ChatListItem.js

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './ChatListItem.styles';

const ChatListItem = ({ name, lastMessage, time, unreadCount, avatarUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* آواتار کاربر */}
      <Image
        style={styles.avatar}
        source={avatarUrl ? { uri: avatarUrl } : require('../../assets/images/chat/user.webp')}
      />

      {/* نام و آخرین پیام */}
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage}</Text>
      </View>

      {/* زمان و تعداد پیام‌های خوانده‌نشده */}
      <View style={styles.metaContainer}>
        <Text style={styles.time}>{time}</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;