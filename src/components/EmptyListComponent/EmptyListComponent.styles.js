import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    ...textStyles.body,
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  subText: {
    ...textStyles.caption,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});