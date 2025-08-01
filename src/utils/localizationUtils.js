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

  const dateObj = typeof date === 'number' ? new Date(date * 1000) : date;

  try {
    const formattedDate = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dateObj);

    return toPersianDigits(formattedDate);
  } catch (error) {
    console.error("Error formatting date:", error);
    return t('common.unknownDate');
  }
};