const avatarColors = [
    '#EF4444',
    '#F97316',
    '#EAB308',
    '#84CC16',
    '#22C55E',
    '#14B8A6',
    '#06B6D4',
    '#3B82F6',
    '#8B5CF6',
    '#D946EF',
    '#EC4899',
];

const getHashOfString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
};

export const generateColorFromName = (name) => {
    const hash = getHashOfString(name);
    const index = hash % avatarColors.length;
    return avatarColors[index];
};