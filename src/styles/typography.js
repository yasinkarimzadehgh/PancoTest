import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const fontFamilies = {
  // Persian Fonts
  yekanRegular: 'IRANSansXFaNum-Regular',
  yekanMedium: 'IRANSansXFaNum-Medium',
  yekanBold: 'IRANSansXFaNum-Bold',
  yekanExtraBold: 'IRANSansXFaNum-ExtraBold',

  // English/LTR Fonts
  rubikRegular: 'Rubik-R',
  rubikBold: 'Rubik-B',
};

export const textStyles = StyleSheet.create({
  title: {
    fontFamily: fontFamilies.yekanRegular,
    fontSize: 12,
    color: colors.textPrimary,
  },
  body: {
    fontFamily: fontFamilies.yekanRegular,
    fontSize: 12,
    color: colors.textPrimary,
  },
  bodyBold: {
    fontFamily: fontFamilies.yekanBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  caption: {
    fontFamily: fontFamilies.yekanRegular,
    fontSize: 10,
    color: colors.textSecondary,
  },
  button: {
    fontFamily: fontFamilies.yekanBold,
    fontSize: 10,
    color: colors.white,
  },
});