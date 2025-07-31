import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    tintColor: colors.primary,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: 16,
  },
});