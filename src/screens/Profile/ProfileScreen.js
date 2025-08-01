import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import { map } from 'rxjs/operators';
import Header from '../../components/Header/Header';
import Avatar from '../../components/Avatar/Avatar';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import useUserStore from '../../stores/user';
import styles from './ProfileScreen.styles';
import { database } from '../../db';
import images_map from '../../assets/images/images_map';
import { t, toPersianDigits, toShamsiDate } from '../../utils/localizationUtils';

const StatItem = ({ icon, value, label }) => (
  <View style={styles.statItem}>
    <Image source={icon} style={styles.statIcon} />
    <Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Text>
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

  if (isLoading && !user) {
    return <LoadingIndicator />;
  }
  if (error) {
    console.log("Error fetching profile, using cached data if available.", error);
  }
  if (!user) {
    return <LoadingIndicator />;
  }

  const { name = t('profile.defaultName'), avatarUrl, lastActiveTime, createdDate,
          views = 0, likes = 0, followers = 0, following = 0, followed = false,
          userName, remoteId: refCode, description } = user;

  const formattedLastActiveTime = lastActiveTime === 'recently' ? t('profile.recentlyActive') : (lastActiveTime || '');

  const renderFollowButton = () => {
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
              <StatItem value={toShamsiDate(createdDate)} label={t('profile.memberSinceLabel')} icon={images_map.calendar} />
              <StatItem value={toPersianDigits(views)} label={t('profile.viewsLabel')} icon={images_map.view} />
              <StatItem value={toPersianDigits(likes)} label={t('profile.likesLabel')} icon={images_map.like} />
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
          {description && (
            <View style={styles.storySection}>
              <Text style={styles.storyLabel}>{t('profile.storyLabel')}</Text>
              <Text style={styles.storyText}>{description}</Text>
            </View>
          )}
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