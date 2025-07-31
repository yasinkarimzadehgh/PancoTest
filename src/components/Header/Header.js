import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Avatar from '../Avatar/Avatar';
import styles from './Header.styles';
import images_map from '../../assets/images/images_map';

const Header = (props) => {
  const {
    title,
    selectionMode,
    selectedCount,
    ownerName,
    ownerAvatarUrl,
    onAvatarPress,
    onDeletePress,
    onCancelSelection,
    onConfirmDelete
  } = props;

  const renderDefaultHeader = () => (
    <>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onAvatarPress}>
          <Avatar name={ownerName || '?'} imageUrl={ownerAvatarUrl} size={36} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={onDeletePress}>
         <Image source={images_map.delete} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
    </>
  );

  const renderSelectionHeader = () => (
    <>
      <View style={styles.rightContainer}>
         <Text style={styles.title}>{selectedCount}</Text>
      </View>
      <View style={styles.leftContainer}>
        {selectedCount > 0 && (
          <TouchableOpacity style={styles.iconButton} onPress={onConfirmDelete}>
             <Text style={styles.deleteButtonText}>حذف {selectedCount} چت</Text>
          </TouchableOpacity>
        )}
         <TouchableOpacity style={styles.iconButton} onPress={onCancelSelection}>
          <Image source={images_map.close} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.headerContainer}>
      {selectionMode ? renderSelectionHeader() : renderDefaultHeader()}
    </View>
  );
};

export default Header;