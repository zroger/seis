import React from 'react';

interface Props {
  seat: number,
  name: string,
}

const Player: React.FC<Props> = ({seat, name}) => {
  const transform = [
    "rotate(45) translate(0 -195)",
    "rotate(-45) translate(0 170)",
    "rotate(45) translate(0 170)",
    "rotate(-45) translate(0 -195)",
  ][seat];

  return (
    <text x={0} y={15}
      pointerEvents="none"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Rye"
      fill="black"
      fillOpacity="0.8"
      transform={transform}
    >
      {name}
    </text>
  )
}

export default Player;
