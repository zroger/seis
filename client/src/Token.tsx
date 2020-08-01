import React from 'react';
import styled from 'styled-components';

import { BoardPosition } from '@seis/core';
import Cell from './Cell';


type Color = 'red' | 'blue' | 'yellow' | 'green';
interface StyledProps {
  color: Color
}

const StyledToken = styled.div<StyledProps>`
  height: 80%;
  width: 80%;
  border-radius: 50%;
  background-image:
    radial-gradient(
      circle at 65% 25%,
      rgba(255, 255, 255, 0.5) 5%,
      rgba(255, 255, 255, 0.0) 30%
    ),
    radial-gradient(
      circle at 52% 45%,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 1) 80%
    ),
    radial-gradient(
      circle at 65% 25%,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.25) 70%
    );
  background-color: ${props => (
    {
      red: '#c62828',
      blue: '#1565c0',
      yellow: '#ffab00',
      green: '#388e3c',
    }[props.color]
  )};
`

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  pos: BoardPosition,
  seat: number,
  action?: (pos: string) => void,
}

const Token: React.FC<Props> = ({pos, seat, action, ...props}) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (action) {
      action(pos);
    }
  }

  return (
    <Cell position={pos} {...props}>
      <StyledToken
        color={['red', 'blue', 'yellow', 'green'][seat] as Color}
        onClick={handleClick}
      />
    </Cell>
  )
}

export default Token;
