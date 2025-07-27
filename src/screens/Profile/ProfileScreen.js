// src/screens/Profile/ProfileScreen.js

import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import useProfileStore from '../../stores/profileStore'; // استور پروفایل
import { FETCH_PROFILE } from '../../stores/profileSaga'; // اکشن ساگا
import styles from './ProfileScreen.styles';
import { colors } from '../../styles/colors';

const ProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params; // دریافت ID از پارامترهای ناوبری
  const dispatch = useDispatch();

  // اتصال به stateهای Zustand
  const { profile, isLoading, error } = useProfileStore();

  useEffect(() => {
    if (userId) {
      dispatch({ type: FETCH_PROFILE, payload: { userId } });
    }
  }, [userId, dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>خطا در بارگذاری پروفایل: {error}</Text>
      </View>
    );
  }

  const avatarUrl = profile.image_path
    ? `https://media.panco.me/${profile.image_server_id}/${profile.image_path}`
    : null;

  return (
    <View style={styles.container}>
      <ProfileHeader title="پروفایل" onBackPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.profileContainer}>
          <Image
            style={styles.avatar}
            source={avatarUrl ? { uri: avatarUrl } : require('../../assets/images/chat/user.webp')}
          />
          <Text style={styles.name}>{profile.name || 'کاربر پنکو'}</Text>
          <Text style={styles.phone}>{profile.phone_number || ''}</Text>
          <Text style={styles.bio}>{profile.description || ''}</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>ویرایش پروفایل</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;