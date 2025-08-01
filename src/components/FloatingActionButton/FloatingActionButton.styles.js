import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';

export default StyleSheet.create({
  fab: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 17,
  },
  fabText: {
    ...textStyles.button,
    fontSize: 13,
    marginLeft: 8,
  },
  fabIconImage: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
});