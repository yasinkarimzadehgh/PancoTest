// src/components/EmptyListComponent/EmptyListComponent.styles.js

import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100, // فاصله از بالا
  },
  text: {
    fontSize: 18,
    color: '#6B7280', // خاکستری
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
});