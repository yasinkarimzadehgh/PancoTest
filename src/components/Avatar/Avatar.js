import React from 'react';
import { View, Text, Image } from 'react-native';
import { getAvatarStyles } from './Avatar.styles';
import { generateColorFromName } from '../../utils/colorGenerator';

const Avatar = ({ imageUrl, name, size = 50 }) => {
  const styles = getAvatarStyles(size);
  const hasImage = imageUrl && imageUrl.trim().length > 0;

  if (hasImage) {
    return (
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.avatarImage} 
        resizeMode="cover" 
      />
    );
  }

  const firstLetter = name ? name.charAt(0).toUpperCase() : '?';
  const backgroundColor = generateColorFromName(name || '');

  return (
    <View style={[styles.avatarContainer, { backgroundColor }]}>
      <Text style={styles.avatarText}>{firstLetter}</Text>
    </View>
  );
};

export default React.memo(Avatar);