import styled from 'styled-components';

const footerHeight = '75px';

export const Page = styled.div`
  min-height: 100vh;

  // border-box to ignore page padding in vh calc
  box-sizing: border-box;

  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-grow: 1;
  height: calc(100% - ${footerHeight});
`;

export const Heading = styled.h1`
  font-weight: 600;
  width: 100%;
`;

export const Footer = styled.div`
  width: 100%;
  height: ${footerHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;

export const Link = styled.a`
  color: orange;
  padding: 5px 10px;
`;

export const FooterLink = Link.extend`
  font-size: 10px;
`;

// Columns
const getColumnWidth = props => (props.sidebar ? '30%' : '100%');

export const Column = styled.div`
  width: ${getColumnWidth};
`;
