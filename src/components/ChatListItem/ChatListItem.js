import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Avatar from '../Avatar/Avatar';
import styles from './ChatListItem.styles';
import images_map from '../../assets/images/images_map';
import { colors } from '../../styles/colors';

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

const SelectionIcon = ({ isSelected }) => {
  const iconSource = isSelected ? images_map.delete : images_map.uncheck;
  return <Image source={iconSource} style={styles.selectionIcon} />;
};

const ActionItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <View style={styles.actionIconContainer}>
      <Image source={icon} style={styles.actionIcon} />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const ChatListItem = (props) => {
  const { name, lastMessage, time, unreadCount, avatarUrl, isOnline, isTyping, status, pinned, isMute,
          onPress, onLongPress, selectionMode, isSelected, isRevealed, actions } = props;

  const badgeStyle = [
    styles.unreadBadge,
    { backgroundColor: isMute ? colors.badgeMuted : colors.badge },
  ];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.mainWrapper}>
        <View style={styles.avatarContainer}>
          <Avatar name={name} imageUrl={avatarUrl} size={55} />
          {isOnline && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.topRow}>
            <View style={styles.nameContainer}>
              <Text style={styles.name} numberOfLines={1}>{name}</Text>
              {isMute && <Image source={images_map.mute} style={styles.muteIcon} />}
            </View>
            <View style={styles.timeAndPinContainer}>
              {pinned && <Image source={images_map.pin} style={styles.pinIcon} />}
              <Text style={styles.time}>{time}</Text>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.messageGroup}>
              <MessageStatus status={status} />
              {isTyping ? (
                <Text style={[styles.lastMessage, styles.typingText]} numberOfLines={1}>در حال نوشتن...</Text>
              ) : (
                <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage}</Text>
              )}
            </View>
            {unreadCount > 0 && (
              <View style={badgeStyle}>
                <Text style={styles.unreadText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {selectionMode && <SelectionIcon isSelected={isSelected} />}

      {isRevealed && (
        <View style={styles.revealedOverlay}>
          <View style={styles.actionsRow}>
            {actions.map((action, index) => (
              <ActionItem
                key={index}
                icon={action.icon}
                label={action.label}
                onPress={action.onPress}
              />
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ChatListItem);