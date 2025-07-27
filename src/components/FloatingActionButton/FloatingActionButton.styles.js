// src/components/FloatingActionButton/FloatingActionButton.styles.js

import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // سایه برای اندروید
    shadowColor: '#000', // سایه برای iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 30,
    color: colors.white,
    lineHeight: 32, // تنظیم برای وسط‌چین کردن +
  },
});