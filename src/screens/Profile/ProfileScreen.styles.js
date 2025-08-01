import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  profileContentWrapper: {
    backgroundColor: colors.white,
    marginHorizontal: 12,
    borderRadius: 20,
    marginTop: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  lastActive: {
    fontSize: 12,
    color: colors.textSecondary,
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
  statText: {
    fontSize: 12,
    color: colors.textSecondary,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  followStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsSection: {
    paddingTop: 16,
    marginHorizontal: 16,
    borderTopColor: colors.border,
  },
  detailRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
});