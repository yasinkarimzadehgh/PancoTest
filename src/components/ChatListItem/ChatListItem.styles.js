import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: colors.background,
    height: 75,
  },
  revealedOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainWrapper: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  avatarContainer: {
    marginLeft: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
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
  topRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  bottomRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  name: {
    ...textStyles.bodyBold,
  },
  timeAndPinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinIcon: {
    width: 16,
    height: 16,
    tintColor: colors.textSecondary,
    marginRight: 6,
  },
  time: {
    ...textStyles.caption,
  },
  messageGroup: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  lastMessage: {
    ...textStyles.caption,
    fontSize: 14,
    textAlign: 'right',
  },
  typingText: {
    color: colors.primary,
    fontStyle: 'italic',
  },
  unreadBadge: {
    backgroundColor: colors.badge,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    ...textStyles.button,
    fontSize: 11,
  },
  selectionIcon: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  actionsRow: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  actionLabel: {
    ...textStyles.button,
    backgroundColor: colors.primary,
    fontSize: 10,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    overflow: 'hidden',
  },
});