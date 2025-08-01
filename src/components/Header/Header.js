import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Header.styles';
import images_map from '../../assets/images/images_map';
import { t } from '../../utils/localizationUtils';

const Header = (props) => {
  const {
    title,
    variant = 'chatList',
    onBackPress,
    selectionMode,
    selectedCount,
    onDeletePress,
    onCancelSelection,
    onConfirmDelete,
  } = props;

  const renderChatListHeader = () => (
    <>
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={onDeletePress}>
          <Image source={images_map.delete} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
    </>
  );

  const renderProfileHeader = () => (
    <>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
          <Image source={images_map.back} style={styles.iconImage} />
        </TouchableOpacity>
        <Text style={[styles.title, { marginLeft: 8 }]}>{title}</Text>
      </View>
      <View style={styles.leftContainer} />
    </>
  );

  const renderSelectionHeader = () => (
    <View style={styles.selectionHeaderContainer}>
      {selectedCount > 0 && (
        <TouchableOpacity onPress={onConfirmDelete}>
          <Text style={styles.deleteButtonText}>{t('header.deleteCount', { count: selectedCount })}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.iconButton} onPress={onCancelSelection}>
        <Image source={images_map.close} style={styles.iconImage} />
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (selectionMode) {
      return renderSelectionHeader();
    }
    if (variant === 'profile') {
      return renderProfileHeader();
    }
    return renderChatListHeader();
  };

  return (
    <View style={styles.headerContainer}>
      {renderContent()}
    </View>
  );
};

export default Header;