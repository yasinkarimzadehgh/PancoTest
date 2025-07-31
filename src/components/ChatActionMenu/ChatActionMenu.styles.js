import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  menuContainer: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 14,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  chatName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  actionsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
  },
  actionItem: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIcon: {
    width: 28,
    height: 28,
    tintColor: colors.white,
  },
  actionLabel: {
    color: colors.white,
    fontSize: 12,
  },
});