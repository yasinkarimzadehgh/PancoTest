import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';

export default StyleSheet.create({
  fab: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    ...textStyles.button,
    marginLeft: 8,
  },
  fabIconImage: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
});