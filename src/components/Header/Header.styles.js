import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';

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
    gap:6,
  },
  leftContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  title: {
    ...textStyles.title,
    marginLeft: 16,
  },
  iconButton: {
    marginRight:5
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: colors.textSecondary,
  },
  deleteButtonText: {
    ...textStyles.button,
    backgroundColor: colors.primary,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    overflow: 'hidden',
  },
});