// src/components/Header/Header.styles.js
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: colors.background,
    flexDirection: 'row-reverse', // <--- RTL: چینش از راست به چپ
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rightContainer: {
    flexDirection: 'row-reverse', // <--- RTL
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row-reverse', // <--- RTL
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginLeft: 16, // <--- RTL: فاصله از آواتار
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  iconText: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  deleteButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8, // <--- RTL: فاصله از ضربدر
  },
});