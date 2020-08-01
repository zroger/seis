import React from 'react';
import styled, { keyframes } from 'styled-components';

import { DiceValue } from '@seis/core';
import DiceIcon from './DiceIcon';


interface Props {
  value: DiceValue,
  seat: number,
  random?: number,
}

const DiceRoll = keyframes`
  0% {
    top: 100%;
    left: 50%;
    transform: scale(1.5) rotate(0deg);
  }
  100% {
    top: var(--top, 50%);
    left: var(--left, 50%);
    transform: scale(1.0) rotate(var(--rotate, 1080deg));
    animation-timing-function: ease-out;
  }
`;

// By seat number
const variants = [
  { color: "#c62828", top: "27.5%", left: "72.5%" },
  { color: "#1565c0", top: "72.5%", left: "72.5%" },
  { color: "#ffab00", top: "72.5%", left: "27.5%" },
  { color: "#288e3c", top: "27.5%", left: "27.5%" },
];

const Root = styled.div<Pick<Props, "seat">>`
  --top: ${({ seat }) => variants[seat].top};
  --left: ${({ seat }) => variants[seat].left};
  top: var(--top);
  left: var(--left);
  position: absolute;
  height: 8%;
  width: 8%;
  margin-top: -4%;
  margin-left: -4%;
  animation: ${DiceRoll} 800ms;
  transform: scale(1.0) rotate(var(--rotate, 540deg));
  border: solid 1px;
  background-image: radial-gradient(
    circle farthest-corner,
    transparent 25%,
    rgba(0, 0, 0, 0.35)
  );
  background-color: ${({ seat }) => variants[seat].color};
  border-radius: 10%;
  border-width: 10%;
  border-color: ${({ seat }) => variants[seat].color};

  & > svg {
    height: 100%;
    width: 100%;
    fill: #f0f0f0;
  }
`

/**
 * Display a single die on the board.
 *
 * This is rendered as a positioned SVG element. To ensure consistent animation,
 * the transitions are performed on an internal element.
 */
const Dice: React.FC<Props> = ({
  value,
  seat,
  random = 0,
}) => {
  const style = {
    '--rotate': `${Math.floor(1080 + (360 * random))}deg`,
  } as React.CSSProperties;

  return (
    <Root seat={seat} style={style}>
      <DiceIcon value={value} />
    </Root>
  )
};

export default Dice;
