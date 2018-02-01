import styled from 'styled-components';

import { footerHeight, pagePadding } from '../../util/constants.js';

export const Page = styled.div`
  // 100% of app height
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${pagePadding};
  position: relative; // so modals can be positioned on top
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  height: calc(100% - ${footerHeight});
`;

export const Heading = styled.h1`
  font-weight: 600;
  width: 100%;
  margin: 0 0 20px 0;
`;

export const SubHeading = styled.h2`
  font-weight: 400;
  margin: 0 0 10px 0;
  color: white;
`;

// Columns
const defaultSectionPadding = 20;

const getColumnMinWidth = props => (props.sidebar ? '200px' : 'initial');
const getColumnWidth = props => (props.sidebar ? '30%' : '100%');
const getColumnMaxWidth = props => (props.sidebar ? '400px' : 'initial');
const getColumnSidePadding = (props) => {
  const sidePadding = props.sidePadding ?
    `${props.sidePadding}px` : `${defaultSectionPadding}px`;

  if (props.sidebar) return `0 ${sidePadding} 0 0`;

  switch (props.position) {
    case 'left':
      return `0 0 0 ${sidePadding}`;
    case 'center':
      return `0 ${sidePadding}`;
    case 'right':
      return `0 ${sidePadding} 0 0`;
    default:
      return '0';
  }
};

export const Column = styled.div`
  min-width: ${getColumnMinWidth};
  width: ${getColumnWidth};
  max-width: ${getColumnMaxWidth};
  padding: ${getColumnSidePadding};
`;
