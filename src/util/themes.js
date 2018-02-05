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
  GREEN_BANNER: 'GREENBANNER',
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
    background: '#e7e7fb',
    placholderColor: '#bab8ea',
  },
  star: {
    ...starBaseStyling,
    hasBorder: true,
  },
};

export const GREEN_BANNER = {
  background: '#24e29d',
  color: '#0d9866',
  star: {
    ...starBaseStyling,
  },
};
