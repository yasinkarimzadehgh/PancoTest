import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './ConfirmationModal.styles';
import images_map from '../../assets/images/images_map';

const ConfirmationModal = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIconContainer} onPress={onClose}>
            <Image source={images_map.close} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, { color: '#4a4c50ff' }]}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;