import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  profileContentWrapper: {
    backgroundColor: colors.white,
    marginHorizontal: 12,
    borderRadius: 20,
    marginTop: 15,
    paddingBottom: 16,
  },
  mainInfoSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'flex-end',
  },
  userInfoSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
  },
  nameSection: {
    marginRight: 16,
    alignItems: 'flex-end',
  },
  name: {
    ...textStyles.title,
    fontSize: 12,
  },
  lastActive: {
    ...textStyles.caption,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  statItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  statIcon: {
    width: 16,
    height: 16,
    tintColor: colors.textSecondary,
    marginLeft: 5,
  },
  statValue: {
    ...textStyles.body,
    fontSize: 10,
    color: colors.textPrimary,
  },
  statLabel: {
    ...textStyles.caption,
  },
  followSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  followStats: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  followStatItem: {
    alignItems: 'center',
  },
  followStatValue: {
    ...textStyles.body,
    fontSize: 10,
  },
  followStatLabel: {
    ...textStyles.caption,
  },
  verticalDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  profileActionButton: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
  actionButtonText: {
    ...textStyles.button,
  },
  detailsSection: {
    paddingTop: 16,
    marginHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    ...textStyles.caption,
    fontSize: 10,
    color: 'black',
  },
  detailValue: {
    ...textStyles.body,
    fontSize: 10,
    color: '#2EAAD9'
  },
  storySection: {
    backgroundColor: '#f9f8f8ff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  storyLabel: {
    ...textStyles.caption,
    fontSize: 11,
    color: 'black',
    marginBottom: 8,
    textAlign: 'right',
  },
  storyText: {
    ...textStyles.body,
    color: colors.textSecondary,
    textAlign: 'right',
    lineHeight: 22,
  },
});