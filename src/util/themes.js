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
    borderColor: buttonBackground,
    border: 'none',
    color: 'white',
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
    background: 'white',
    color: '#8585dd',
    borderColor: '#e4e4ff',
    border: '1px solid #e4e4ff',
  },
};

export const GREEN = {
  background: '#24e29d',
  color: '#0d9866',
  button: {
    border: 'none',
    color: 'white',
    borderColor: 'transparent',
    background: 'transparent',
  },
  star: {
    ...starBaseStyling,
  },
};

// Banner position
export const BANNER = {
  TOP: {
    bannerDistanceFromTop: 15,
  },
  CENTER: {
    bannerDistanceFromTop: 180,
  },
  BOTTOM: {
    bannerDistanceFromTop: 290,
  },
  THIN: {
    bannerThickness: 95,
  },
  WIDE: {
    bannerThickness: 130,
  },
};

export const CURTAIN_COLOR = '#b71503';

export const SHAME_COLOR = '#ff604e';
export const SHAME_BACKGROUND = '#ffefed';
export const SHAME_BORDER_HIGHLIGHT = '#ffdcd8';

export const LIKE_BACKGROUND = '#defbe4';
export const LIKE_COLOR = '#409e57';
export const LIKE_BORDER_HIGHLIGHT = '#b8f5c6';

export const MESSAGE_THEMES = {
  seed: {
    messagesContainer: {
      background: '#2e0a0a',
    },
    messagesLeft: {
      background: '#0583e6',
      color: 'white',
      borderHighlight: '#25caff',
      overleaf: '#b90000',
    },
    messagesRight: {
      background: '#ec5800',
      color: 'white',
      borderHighlight: '#ffb082',
      overleaf: '#b90000',
    },
  },
  privateOrPublic: {
    messagesContainer: {
      background: '#2e0a0a',
    },
    messagesLeft: {
      background: '#0583e6',
      color: 'white',
      borderHighlight: '#25caff',
      overleaf: '#c3210d',
    },
    messagesRight: {
      background: '#ec5800',
      color: 'white',
      borderHighlight: '#ffb082',
      overleaf: '#c3210d',
    },
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
