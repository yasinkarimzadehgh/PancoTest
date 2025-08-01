import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from './FloatingActionButton.styles';
import images_map from '../../assets/images/images_map';
import { t } from '../../utils/localizationUtils';

const FloatingActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>{t('fab.new')}</Text>
      <Image source={images_map.plus} style={styles.fabIconImage} />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;