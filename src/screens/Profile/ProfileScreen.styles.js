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
  scrollViewContent: {
    padding: 16,
  },
  mainCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainInfoSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  nameAndDateSection: {
    flex: 1,
    marginRight: 12,
  },
  nameRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  ratingBadge: {
    backgroundColor: '#EBFDEF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  ratingText: {
    color: '#28A745',
    fontWeight: 'bold',
    fontSize: 12,
  },
  joinDate: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    alignItems: 'flex-end',
    marginLeft: 24,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  editProfileButton: {
    backgroundColor: '#4B3A8E',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  editProfileButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: colors.textPrimary,
    flexShrink: 1,
    textAlign: 'left',
  },
  referralContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: 18,
    color: colors.primary,
    marginLeft: 8,
  },
  actionButton: {
    backgroundColor: '#4B3A8E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  bioText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 22,
    textAlign: 'right',
    marginTop: 8,
  },
});