import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getAvatarStyles } from './Avatar.styles';
import { colors } from '../../styles/colors';
import images_map from '../../assets/images/images_map';

const Avatar = ({ imageUrl, name, size = 50 }) => {
  const styles = getAvatarStyles(size);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const showImage = imageUrl && imageUrl.trim().length > 0 && !hasError;

  const handleLoadStart = () => setIsLoading(true);
  const handleLoadEnd = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (showImage) {
    return (
      <View style={styles.container}>
        <FastImage
          style={styles.avatarImage}
          source={{
            uri: imageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.avatarImage}
        source={images_map.user}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

export default React.memo(Avatar);