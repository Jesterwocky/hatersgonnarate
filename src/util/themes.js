// colors. dark colors are for main pages. light theme is for modals, etc.
const pageBackgroundColor = '#2b3179';
const buttonBackground = '#504dad';
const headerBackground = '#1d1b67';
const footerBackground = headerBackground;
const starColor = '#fdc726';
const starBackground = '#af8918';
const movieTitleColor = '#ffcc3c';
const textColor = '#bcbbff';

export const themes = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
  GREEN: 'GREEN',
  FIELD_SIZE_NORMAL: 'FIELD_SIZE_NORMAL',
  FIELD_SIZE_SMALL: 'FIELD_SIZE_SMALL',
};

const starBaseStyling = {
  color: starColor,
  background: starBackground,
};

export const DARK = {
  background: pageBackgroundColor,
  color: textColor,
  movieTitleColor,
  button: {
    background: buttonBackground,
  },
  header: {
    background: headerBackground,
  },
  footer: {
    background: footerBackground,
  },
  field: {
    background: headerBackground,
    color: textColor,
    placholderColor: '#56558c',
  },
  star: {
    ...starBaseStyling,
  },
};

// themes
export const LIGHT = { // modals and stuff
  color: '#8685dc',
  field: {
    color: buttonBackground,
    background: '#f4f4fd',
    placholderColor: '#bab8ea',
  },
  star: {
    ...starBaseStyling,
    hasBorder: true,
  },
  button: {
    disabledBackground: '#dadaf7',
  },
};

export const GREEN = {
  background: '#24e29d',
  color: '#0d9866',
  star: {
    ...starBaseStyling,
  },
};

// Banner position
export const BANNER = {
  THIN_TOP: {
    bannerThickness: 95,
    distanceFromTop: 15,
  },
  WIDE_CENTERED: {
    bannerThickness: 130,
    distanceFromTop: 190,
  },
};

// Search sizes
export const FIELD_SIZE_SMALL = {
  fieldHeight: 32,
  fieldFontSize: 12,
  buttonPadding: 13,
  buttonMargin: 5,
};

export const FIELD_SIZE_NORMAL = {
  fieldHeight: 37,
  fieldFontSize: 14,
  buttonPadding: 15,
  buttonMargin: 10,
};
