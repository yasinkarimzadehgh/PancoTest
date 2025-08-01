import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...textStyles.body,
    color: 'red',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});