const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishDigits = /[\u0030-\u0039]/g; // RegExp for all English digits


export const toPersianDigits = (input) => {
  if (input === null || input === undefined) return '';
  return String(input).replace(englishDigits, (d) => persianDigits[parseInt(d)]);
};

export const toShamsiDate = (date) => {
  if (!date) return 'تاریخ نامشخص';

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
    return 'تاریخ نامشخص';
  }
};