// src/components/ChatListItem/ChatListItem.styles.js

import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280', // رنگ متن خاکستری
    marginTop: 2,
  },
  metaContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  time: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  unreadText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
});