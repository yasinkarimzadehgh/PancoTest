import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const getAvatarStyles = (size) => {
 return StyleSheet.create({
  container: {
   width: size,
   height: size,
   // استفاده از منطق نسبی: گردی گوشه‌ها همیشه یک چهارم اندازه آواتار خواهد بود
   // با این روش ظاهر خمیدگی در تمام سایزها یکسان به نظر می‌رسد
   // می‌توانید این عدد (4) را برای تغییر میزان گردی ویرایش کنید
   borderRadius: size / 2.4,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: colors.surface,
   overflow: 'hidden',
  },
  avatarImage: {
   width: '100%',
   height: '100%',
  },
  avatarText: {
   color: colors.white,
   fontSize: size * 0.5,
   fontWeight: 'bold',
  },
  loaderContainer: {
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
 });
};