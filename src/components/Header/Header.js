import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Avatar from '../Avatar/Avatar';
import styles from './Header.styles';

const Header = (props) => {
  const {
    title,
    selectionMode,
    selectedCount,
    onSearchPress,
    onDeletePress,
    onCancelSelection,
    onConfirmDelete
  } = props;

  const renderDefaultHeader = () => (
    <>
      <View style={styles.rightContainer}>
        <Avatar name="Me" size={36} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
          <Text style={styles.iconText}>🔍</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onDeletePress}>
         <Text style={styles.iconText}>🗑️</Text>
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
          <Text style={styles.iconText}>✕</Text>
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