import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 10,
    position: 'relative',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    padding: 8,
  },
  closeIcon: {
    width: 30,
    height: 30,
    tintColor: colors.textSecondary,
  },
  title: {
    ...textStyles.title,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10

  },
  button: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: '#f0f0f1ff',
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  buttonText: {
    ...textStyles.body,
    color: colors.white,
  },
});