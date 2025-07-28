import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  avatarContainer: {
    marginLeft: 15,
  },
  onlineIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: colors.background,
  },
  mainContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'right',
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  messageGroup: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    color: colors.accent,
    marginLeft: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
    flexShrink: 1,
  },
  typingText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    textAlign: 'right',
  },
  unreadBadge: {
    backgroundColor: colors.badge,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  pinIcon: {
    fontSize: 16,
    color: colors.textSecondary,
    marginRight: 8,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkboxSelected: {
    backgroundColor: colors.badge,
    borderColor: colors.badge,
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});