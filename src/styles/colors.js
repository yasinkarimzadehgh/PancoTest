// src/styles/colors.js

// رنگ‌های تم روشن (بر اساس صفحه پروفایل)
export const lightTheme = {
  background: '#FFFFFF', // پس‌زمینه اصلی
  surface: '#F3F4F6',    // پس‌زمینه کارت‌ها و هدرها (خاکستری خیلی روشن)
  textPrimary: '#1F2937',  // متن اصلی (مشکی)
  textSecondary: '#6B7280', // متن ثانویه (خاکستری)
  primary: '#8B5CF6',     // رنگ اصلی بنفش
  accent: '#34D399',      // رنگ سبز برای وضعیت آنلاین یا تیک
  border: '#E5E7EB',       // رنگ جداکننده‌ها
  white: '#FFFFFF',
  black: '#000000',
  error: '#EF4444',      // رنگ قرمز برای خطا
};

// رنگ‌های تم تاریک (بر اساس صفحه لیست چت)
export const darkTheme = {
  background: '#111827',     // پس‌زمینه اصلی (سرمه‌ای تیره)
  surface: '#1F2937',        // پس‌زمینه کارت‌ها و هدر (کمی روشن‌تر)
  textPrimary: '#F9FAFB',      // متن اصلی (سفید)
  textSecondary: '#9CA3AF',    // متن ثانویه (خاکستری)
  primary: '#A78BFA',         // بنفش اصلی (برای المان‌های تاکیدی)
  badge: '#3B82F6',          // رنگ آبی برای نشان تعداد پیام
  accent: '#22C55E',          // سبز برای وضعیت آنلاین
  border: '#374151',           // رنگ جداکننده‌ها
  white: '#FFFFFF',
  black: '#000000',
  error: '#F87171',
};

// در این پروژه از تم روشن استفاده می‌کنیم، اما تم تاریک برای آینده آماده است
export const colors = lightTheme;
