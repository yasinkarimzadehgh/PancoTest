// src/components/FloatingActionButton/FloatingActionButton.styles.js
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  fab: {
    position: 'absolute',
    left: 20, // <--- RTL
    bottom: 20,
    height: 56,
    borderRadius: 16, // <--- مستطیل با گوشه‌های گرد
    backgroundColor: '#007AFF', // <--- رنگ آبی مشابه تصویر
    flexDirection: 'row-reverse', // <--- RTL
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 8, // <--- RTL: فاصله متن از +
  },
  fabIcon: {
    fontSize: 24,
    color: colors.white,
  }
});