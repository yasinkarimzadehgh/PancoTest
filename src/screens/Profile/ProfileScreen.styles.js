import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 16,
  },
  username: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  infoSection: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textPrimary,
    marginRight: 12,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textSecondary,
    flex: 1,
    textAlign: 'left',
  },
  bioRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  bioText: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  editButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});