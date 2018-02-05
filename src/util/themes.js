// colors. dark colors are for main pages. light theme is for modals, etc.
import {
  pageBackgroundColor,
  textColor,
  movieTitleColor,
  buttonBackground,
  headerBackground,
  footerBackground,
  starColor,
  starBackground,
} from './constants.js';

export const themes = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
  GREENBANNER: 'GREENBANNER',
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
  star: {
    color: starColor,
    background: starBackground,
  },
};

// themes
export const LIGHT = { // modals and stuff
  color: '#8685dc',
  field: {
    color: buttonBackground,
    background: '#e7e7fb',
  },
};

export const GREEN_BANNER = {
  background: '#24e29d',
  color: '#0d9866',
};
