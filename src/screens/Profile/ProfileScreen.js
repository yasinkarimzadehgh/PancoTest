import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import { map } from 'rxjs/operators';

import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Avatar from '../../components/Avatar/Avatar';
import useProfileStore from '../../stores/profileStore';
import styles from './ProfileScreen.styles';
import { colors } from '../../styles/colors';
import { database } from '../../db';

const formatJoinDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp * 1000);
  const formattedDate = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date);
  return `${formattedDate} عضو شده`;
};

const StatItem = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ProfileScreen = ({ route, navigation, user }) => {
  const { userId } = route.params;
  const { isLoading, error, fetchProfile } = useProfileStore();

  useEffect(() => {
    if (userId) {
      fetchProfile({ userId });
    }
  }, [userId, fetchProfile]);
  
  if (isLoading && !user) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  if (error && !user) {
    return <View style={styles.loadingContainer}><Text>خطا: {error}</Text></View>;
  }

  if (!user) {
    return <View style={styles.loadingContainer}><Text>در حال بارگذاری پروفایل...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <ProfileHeader title="پروفایل" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        <View style={styles.mainCard}>
          <View style={styles.mainInfoSection}>
            <Avatar name={user.name} imageUrl={user.avatarUrl} size={60} />
            <View style={styles.nameAndDateSection}>
              <View style={styles.nameRow}>
                 <Text style={styles.name}>{user.name || 'کاربر پنکو'}</Text>
                 <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>۸.۶۵</Text>
                 </View>
              </View>
              <Text style={styles.joinDate}>{formatJoinDate(user.createdAt.getTime() / 1000)}</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <StatItem value={user.followers || 0} label="دنبال کننده" />
            <StatItem value={user.following || 0} label="دنبال می‌کنی" />
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>ویرایش پروفایل</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>شماره موبایل:</Text>
            <Text style={styles.infoValue}>{user.phoneNumber || '+۹۸۹۱۲۳۴۵۶۷۸۹'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>نام کاربری:</Text>
            <Text style={styles.infoValue}>@{user.userName || '---'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>کد معرف:</Text>
            <View style={styles.referralContainer}>
              <TouchableOpacity>
                <Text style={styles.shareIcon}>🔗</Text>
              </TouchableOpacity>
              <Text style={styles.infoValue}>{user.remoteId}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>کلکسیون‌های تموم شده</Text>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>داستان:</Text>
          <Text style={styles.bioText}>{user.description || 'توضیحاتی ثبت نشده است.'}</Text>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>تنظیمات پنکو</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const enhance = withObservables(['route'], ({ route }) => ({
  user: database.get('users').query(Q.where('remote_id', route.params.userId))
    .observe()
    .pipe(
      map(users => users[0])
    ),
}));

export default enhance(ProfileScreen);