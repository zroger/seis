import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  open?: boolean;
}

const Overlay: React.FC<Props> = ({ open = false, children }) => {
  return ReactDOM.createPortal(
    open ? (
      <Backdrop>{ children }</Backdrop>
    ) : null,
    document.body,
  );
};

export default Overlay;
