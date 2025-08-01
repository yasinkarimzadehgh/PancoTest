import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';

export const getAvatarStyles = (size) => {
  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2.4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
    },
    avatarText: {
      ...textStyles.button,
      fontSize: size * 0.5,
    },
    loaderContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
  });
};