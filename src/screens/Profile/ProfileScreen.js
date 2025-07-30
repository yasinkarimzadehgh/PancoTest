import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Avatar from '../../components/Avatar/Avatar';
import useProfileStore from '../../stores/profileStore';
import { getImageUrl } from '../../utils/imageUtils';
import styles from './ProfileScreen.styles';
import { colors } from '../../styles/colors';

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const ProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const { profile, isLoading, error, fetchProfile } = useProfileStore();

  useEffect(() => {
    if (userId) {
      fetchProfile({ userId });
    }
  }, [userId, fetchProfile]);

  if (isLoading) {
    return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  if (error || !profile) {
    return <View style={{flex: 1, justifyContent: 'center'}}><Text>خطا: {error}</Text></View>;
  }
  
  const avatarUrl = getImageUrl(profile.image_server_id, profile.image_path);

  return (
    <View style={styles.container}>
      <ProfileHeader title="پروفایل" onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <Avatar name={profile.name} imageUrl={avatarUrl} size={100} />
          <Text style={styles.name}>{profile.name || 'کاربر پنکو'}</Text>
          <Text style={styles.username}>@{profile.user_name || '---'}</Text>
        </View>

        <View style={styles.infoSection}>
          <InfoRow label="شماره موبایل" value={profile.phone_number || 'محفوظ'} />
          <View style={styles.bioRow}>
            <Text style={styles.infoLabel}>داستان</Text>
            <Text style={styles.bioText}>
              {profile.description || 'توضیحاتی ثبت نشده است.'}
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>ویرایش پروفایل</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;