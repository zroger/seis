import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import ConfettiGenerator from 'confetti-js';


const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
`

const rotate = keyframes`
  from {
    transform: scale(0) translate3d(0, -500%, 0);
  }

  to {
    transform: scale(1.0) translate3d(0, 0, 0) rotate(1080deg);
  }
`

const StyledText = styled.div`
  font-family: Anton;
  font-size: 96px;
  color: #fdfcdc;
  display: block;
  position: relative;
  -webkit-text-stroke: 16px #0081a7;
  text-decoration: none;
  text-align: center;
  animation: ${rotate} 2000ms ease-in-out;

  &::after {
    content: "${props => (props.children as string)}";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-text-stroke: 0;
  }

`

interface Props {
  winner: string;
}

const GameOver: React.FC<Props> = ({ winner }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const confetti = new ConfettiGenerator({ target: canvasRef.current })
    confetti.render();
    return () => confetti.clear();
  }, [canvasRef])

  return ReactDOM.createPortal(
    (
      <Backdrop>
        <StyledCanvas ref={canvasRef} />
        <StyledText>{`${winner} Wins!!!`}</StyledText>
      </Backdrop>
    ),
    document.body,
  );
};

export default GameOver;
