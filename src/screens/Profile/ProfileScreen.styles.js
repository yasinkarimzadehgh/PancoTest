// src/screens/Profile/ProfileScreen.styles.js

import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.lightGray,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 20,
  },
  phone: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  bio: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.lightGray,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});