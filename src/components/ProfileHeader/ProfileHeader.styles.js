import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: colors.background,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.textPrimary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginRight: 1,
  },
});