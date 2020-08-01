import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import Overlay from './Overlay';


const slideUp = keyframes`
  from {
    transform: translate3d(0, 100%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`

const Container = styled.div`
  background: #f7f6e7;
  color: #313638;
  width: 100%;
  border-radius: 8px;
  border: solid 4px #f7f6e7;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  padding: 8px;
  width: 320px;
  animation-name: ${slideUp};
  animation-duration: 500ms;
  animation-fill-mode: both;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: solid 2px #313638;
    border-radius: 6px;
  }
`;

const Header = styled.header`
  color: #0081a7;
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes[2]}px;
  padding: 8px 8px;
  border-bottom: solid 1px #313638;
`;

const Content = styled.div`
  padding: 8px 8px;
  font-family: ${props => props.theme.fonts.body};
`;

interface Props {
  open: boolean;
  title: string;
}

const Dialog: React.FC<Props> = ({ open, title, children }) => {
  return ReactDOM.createPortal(
    (
      <Overlay open={open}>
        <Container>
          <Header>
            { title }
          </Header>
          <Content>
            {children}
          </Content>
        </Container>
      </Overlay>
    ),
    document.body,
  );
};

export default Dialog;
