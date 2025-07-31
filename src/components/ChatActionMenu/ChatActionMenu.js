import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable, Dimensions } from 'react-native';
import styles from './ChatActionMenu.styles';

const ActionItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Image source={icon} style={styles.actionIcon} />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const ChatActionMenu = ({ isVisible, onClose, actions, chatName, position }) => {
  if (!isVisible) {
    return null;
  }

  const windowHeight = Dimensions.get('window').height;
  const menuHeight = 120;
  const topPosition = position.y + menuHeight > windowHeight - 30 ? windowHeight - menuHeight - 30 : position.y;

  const menuStyle = [
    styles.menuContainer,
    { top: topPosition },
  ];

  return (
    <Pressable style={styles.backdrop} onPress={onClose}>
      <View style={menuStyle}>
        <Text style={styles.chatName}>{chatName}</Text>
        <View style={styles.actionsRow}>
          {actions.map((action, index) => (
            <ActionItem
              key={index}
              icon={action.icon}
              label={action.label}
              onPress={() => {
                action.onPress();
                onClose();
              }}
            />
          ))}
        </View>
      </View>
    </Pressable>
  );
};

export default ChatActionMenu;