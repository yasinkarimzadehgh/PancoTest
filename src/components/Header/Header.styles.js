import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: colors.background,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectionHeaderContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  rightContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginRight: 16,
  },
  iconButton: {
    marginRight: 5
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: colors.textSecondary,
  },
  deleteButtonText: {
    color: colors.white,
    backgroundColor: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
});