import _ from 'lodash';
import React, {useRef, useEffect} from 'react';
import { motion, MotionStyle } from 'framer-motion';
import { useTheme } from 'react-jss'

import { Theme } from '../../theme.js';
import { Geo, GeoPosition } from './constants';
import { calculateNextPosition } from '../../game/board';


const buildTrail = (from: GeoPosition, to: GeoPosition, seat: number, max: number = 80): GeoPosition[] => {
  let i = 0;
  const trail = [from];
  while (trail[trail.length - 1] !== to && i++ < max) {
    const next = calculateNextPosition(trail[trail.length - 1], seat);
    if (next === "INVALID_MOVE") {
      break;
    }
    trail.push(next);
  }
  if (trail[trail.length - 1] !== to) {
    return [from, to]
  }
  return trail;
}

interface Props {
  pos: GeoPosition,
  seat: number,
  action?: (pos: string) => void,
}

const Token: React.FC<Props> = ({pos, seat, action}) => {

  // Use the previous value of the pos prop for animation.
  const prevPos = useRef<string|undefined>();
  useEffect(() => {
    prevPos.current = pos;
  }, [prevPos, pos]);

  const origin = prevPos.current;
  const trail = (origin && origin !== pos) ? buildTrail(origin, pos, seat) : [pos] ;

  const cellRadius = 10;
  const tokenRadius = 12;
  const animate = trail.length > 1 ? {
    attrX: trail.map(p => Geo[p].x - tokenRadius),
    attrY: trail.map(p => Geo[p].y - (tokenRadius * 2 - cellRadius)),
    transition: { duration: Math.max(1, trail.length / 2), ease: "easeOut" },
  } : {
    attrX: Geo[pos].x - tokenRadius,
    attrY: Geo[pos].y - (tokenRadius * 2 - cellRadius)
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (action) {
      action(pos);
    }
  }

  const tokenId = _.uniqueId('TokenGradient')
  const shadowId = _.uniqueId('ShadowGradient')

  const theme = useTheme() as Theme;

  return (
    <motion.svg
      viewBox="-10 -10 20 20" x="0" y="0"
      height={tokenRadius * 2}
      width={tokenRadius * 2}
      animate={animate}
      initial={{
        attrX: Geo[pos].x - tokenRadius,
        attrY: Geo[pos].y - (tokenRadius * 2 - cellRadius),
      } as MotionStyle}
      fill={theme.seats[seat].diceBg}
      onClick={handleClick}
    >
      <defs>
        <radialGradient id={tokenId} fx="70%" fy="25%">
          <stop offset="15%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="20%" stopColor="transparent" stopOpacity="0.0" />
          <stop offset="80%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
        </radialGradient>

        <radialGradient id={shadowId}>
          <stop offset="50%" stopColor="#000000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        fill={`url("#${shadowId}")`}
        cx="0"
        cy="8"
        rx="10"
        ry="2"
      />
      <circle cx="0" cy="0" r="10" />
      <circle
        fill={`url("#${tokenId}")`}
        cx="0"
        cy="0"
        r="10"
      />
    </motion.svg>
  )
}

export default Token;
