import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const getAvatarStyles = (size) => {
  return StyleSheet.create({
    avatarImage: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.lightGray,
    },
    avatarContainer: {
      width: size,
      height: size,
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      color: colors.white,
      fontSize: size * 0.5,
      fontWeight: 'bold',
    },
  });
};