import moment from 'jalali-moment';
import fa from '../locales/fa-IR.json';

export const t = (key, replacements = {}) => {
  const keys = key.split('.');
  let value = fa;
  try {
    for (const k of keys) {
      value = value[k];
    }
  } catch (e) {
    return key;
  }

  if (typeof value === 'string') {
    Object.keys(replacements).forEach(placeholder => {
      value = value.replace(`{${placeholder}}`, replacements[placeholder]);
    });
    return value;
  }
  return key;
};

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishDigits = /[\u0030-\u0039]/g;

export const toPersianDigits = (input) => {
  if (input === null || input === undefined) return '';
  return String(input).replace(englishDigits, (d) => persianDigits[parseInt(d)]);
};

export const toShamsiDate = (date) => {
  if (!date) return t('common.unknownDate');
  return moment.unix(date).locale('fa').format('YYYY/MM/DD');
};