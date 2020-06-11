import _ from 'lodash';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'react-jss'

import { Theme } from '../../theme.js';
import { DiceValue } from "../../constants";
import DiceIcon from '../../Board/DiceIcon2';

interface Props extends React.HTMLAttributes<HTMLElement> {
  value: DiceValue,
  seat: number,
  random?: number,
}

const Dice: React.FC<Props> = ({
  value,
  seat,
  random,
}) => {
  const theme = useTheme() as Theme;
  const gradRef = useRef(_.uniqueId('DiceGradient'))
  const randRef = useRef(Math.random());
  random = random || randRef.current;
  const seatTheme = theme.seats[seat];
  const x = [70, 70, -100, -100][seat];
  const y = [-100, 70, 70, -100][seat];
  return (
    <motion.svg
      initial={{
        scale: 0,
      }}
      style={{ x: x, y: y }}
      animate={{
        scale: [null, 1.5, 1],
        rotate: [
          null,
          360,
          360 * (2 + Math.random()),
        ],
        transition: {
          ease: ["easeIn", "linear", "easeOut"],
        },
      }}
    >
      <defs>
        <radialGradient id={gradRef.current}>
          <stop offset="25%" stopColor="transparent" />
          <stop offset="100%" stopColor="black" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      <rect
        fill={seatTheme.diceBg}
        height={30}
        width={30}
        rx={5}
      />
      <rect
        fill={`url("#${gradRef.current}")`}
        height={30}
        width={30}
        rx={5}
      />
      <DiceIcon
        value={value}
        height={30}
        width={30}
        fill={seatTheme.diceFg}
      />
      <rect
        height={30}
        width={30}
        rx={5}
        stroke={seatTheme.diceBg}
        strokeWidth={1}
        fill="transparent"
      />
    </motion.svg>
  )
};

export default Dice;
