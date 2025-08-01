import React, { useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import { map } from 'rxjs/operators';
import Header from '../../components/Header/Header';
import Avatar from '../../components/Avatar/Avatar';
import useUserStore from '../../stores/user';
import styles from './ProfileScreen.styles';
import { database } from '../../db';
import images_map from '../../assets/images/images_map';
import { OWNER_USER_ID } from '../../api/config';
import { t, toPersianDigits, toShamsiDate } from '../../utils/localizationUtils';

const StatItem = ({ icon, text }) => (
  <View style={styles.statItem}>
    <Image source={icon} style={styles.statIcon} />
    <Text style={styles.statText}>{text}</Text>
  </View>
);

const ProfileScreen = ({ route, navigation, user }) => {
  const { userId } = route.params;
  const { isLoading, error, fetchProfile } = useUserStore();

  useEffect(() => {
    if (userId) {
      fetchProfile({ userId });
    }
  }, [userId, fetchProfile]);

  const isOwner = useMemo(() => userId === OWNER_USER_ID, [userId]);

  if (isLoading && !user) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0D052A" /></View>;
  }
  if (error) {
    console.log("Error fetching profile, using cached data if available.", error);
  }
  if (!user) {
    return <View style={styles.loadingContainer}><Text>{t('profile.loading')}</Text></View>;
  }

  const { name = t('profile.defaultName'), avatarUrl, lastActiveTime, createdDate,
          views = 0, likes = 0, followers = 0, following = 0, followed = false,
          userName, remoteId: refCode } = user;

  const formattedLastActiveTime = lastActiveTime === 'recently' ? t('profile.recentlyActive') : (lastActiveTime || '');

  const renderFollowButton = () => {
    if (isOwner) {
      return (
        <TouchableOpacity style={[styles.profileActionButton, { backgroundColor: '#0D052A' }]}>
          <Text style={styles.actionButtonText}>{t('profile.editProfile')}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={[styles.profileActionButton, { backgroundColor: followed ? '#EEEEEE' : '#0D052A' }]}>
        <Text style={[styles.actionButtonText, { color: followed ? '#6B7280' : 'white' }]}>
          {followed ? t('profile.isFollowing') : t('profile.follow')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        variant="profile"
        title={t('profile.title')}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.profileContentWrapper}>
          <View style={styles.mainInfoSection}>
            <View style={styles.userInfoSection}>
              <Avatar name={name} imageUrl={avatarUrl} size={70} />
              <View style={styles.nameSection}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.lastActive}>{formattedLastActiveTime}</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <StatItem icon={images_map.calendar} text={t('profile.memberSince', { date: toShamsiDate(createdDate) })} />
              <StatItem icon={images_map.view} text={t('profile.views', { count: toPersianDigits(views) })} />
              <StatItem icon={images_map.like} text={t('profile.likes', { count: toPersianDigits(likes) })} />
            </View>
          </View>

          <View style={styles.followSection}>
            <View style={styles.followStats}>
              <View style={styles.followStatItem}>
                <Text style={styles.followStatValue}>{toPersianDigits(followers)}</Text>
                <Text style={styles.followStatLabel}>{t('profile.followers')}</Text>
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.followStatItem}>
                <Text style={styles.followStatValue}>{toPersianDigits(following)}</Text>
                <Text style={styles.followStatLabel}>{t('profile.followingCount')}</Text>
              </View>
            </View>
            {renderFollowButton()}
          </View>

          <View style={styles.detailsSection}>
              {userName && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{t('profile.usernameLabel')}</Text>
                  <Text style={styles.detailValue}>@{userName}</Text>
                </View>
              )}
              {refCode && (
                <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.detailLabel}>{t('profile.refCodeLabel')}</Text>
                  <Text style={styles.detailValue}>{toPersianDigits(refCode)}</Text>
                </View>
              )}
          </View>
        </View>
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