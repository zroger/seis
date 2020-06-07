import _ from 'lodash';
import React, {useRef, useEffect} from 'react';
import { motion, SVGMotionProps } from 'framer-motion';
import classes from './SvgBoard.module.css';

import { calculateNextPosition } from './game/board';


interface Coord {
  x: number,
  y: number,
}

const Geo: Record<string, Coord> = {
  S00: {x: 180, y: -120},
  S01: {x: 160, y: -140},
  S02: {x: 140, y: -160},
  S03: {x: 120, y: -180},

  S10: {x: 120, y: 180},
  S11: {x: 140, y: 160},
  S12: {x: 160, y: 140},
  S13: {x: 180, y: 120},

  S20: {x: -180, y: 120},
  S21: {x: -160, y: 140},
  S22: {x: -140, y: 160},
  S23: {x: -120, y: 180},

  S30: {x: -120, y: -180},
  S31: {x: -140, y: -160},
  S32: {x: -160, y: -140},
  S33: {x: -180, y: -120},

  C00: {x: 30,  y: -180},
  C01: {x: 30,  y: -150},
  C02: {x: 30,  y: -120},
  C03: {x: 30,  y: -90 },
  C04: {x: 30,  y: -60 },
  C05: {x: 30,  y: -30 },
  C06: {x: 60,  y: -30 },
  C07: {x: 90,  y: -30 },
  C08: {x: 120, y: -30 },
  C09: {x: 150, y: -30 },
  C0A: {x: 180, y: -30 },
  C0B: {x: 180, y: 0   },

  C10: {x: 180, y: 30 },
  C11: {x: 150, y: 30 },
  C12: {x: 120, y: 30 },
  C13: {x: 90,  y: 30 },
  C14: {x: 60,  y: 30 },
  C15: {x: 30,  y: 30 },
  C16: {x: 30,  y: 60 },
  C17: {x: 30,  y: 90 },
  C18: {x: 30,  y: 120},
  C19: {x: 30,  y: 150},
  C1A: {x: 30,  y: 180},
  C1B: {x: 0,   y: 180},

  C20: {x: -30,  y: 180},
  C21: {x: -30,  y: 150},
  C22: {x: -30,  y: 120},
  C23: {x: -30,  y: 90 },
  C24: {x: -30,  y: 60 },
  C25: {x: -30,  y: 30 },
  C26: {x: -60,  y: 30 },
  C27: {x: -90,  y: 30 },
  C28: {x: -120, y: 30 },
  C29: {x: -150, y: 30 },
  C2A: {x: -180, y: 30 },
  C2B: {x: -180, y: 0  },

  C30: {x: -180, y: -30},
  C31: {x: -150, y: -30},
  C32: {x: -120, y: -30},
  C33: {x: -90,  y: -30},
  C34: {x: -60,  y: -30},
  C35: {x: -30,  y: -30},
  C36: {x: -30,  y: -60},
  C37: {x: -30,  y: -90},
  C38: {x: -30,  y: -120},
  C39: {x: -30,  y: -150},
  C3A: {x: -30,  y: -180},
  C3B: {x: 0,    y: -180},

  H00: {x: 0, y: -150},
  H01: {x: 0, y: -120},
  H02: {x: 0, y: -90},
  H03: {x: 0, y: -60},

  H10: {x: 150, y: 0},
  H11: {x: 120, y: 0},
  H12: {x: 90,  y: 0},
  H13: {x: 60,  y: 0},

  H20: {x: 0, y: 150},
  H21: {x: 0, y: 120},
  H22: {x: 0, y: 90 },
  H23: {x: 0, y: 60 },

  H30: {x: -150, y: 0},
  H31: {x: -120, y: 0},
  H32: {x: -90,  y: 0},
  H33: {x: -60,  y: 0},
};

type GeoPosition = keyof typeof Geo;

interface RoundedRectProps extends React.SVGAttributes<SVGElement> {
  a: GeoPosition,
  b: GeoPosition,
  radius?: number,
}

const RoundedRect = ({a, b, radius=15, ...props}: RoundedRectProps) => {
  const r1 = Geo[a];
  const r2 = Geo[b];
  const center = {x: (r1.x + r2.x) / 2, y: (r1.y + r2.y) / 2};
  const slope = (r2.x - r1.x) / (r2.y - r1.y);
  const distance = Math.sqrt((r2.x - r1.x)**2 + (r2.y - r1.y)**2) + radius * 2
  console.log(slope, distance)
  const rotation = (slope === Infinity ? 90 : (slope === -Infinity ? -90 : slope * -45))
  return (
    <rect
      x={center.x - radius}
      y={center.y - (distance / 2)}
      width={radius * 2}
      height={distance}
      rx={radius}
      transform={`rotate(${rotation} ${center.x} ${center.y})`}
      {...props}
    />)
}


const GridLines = () => {
  return (
    <g pointerEvents="none">
      {_.range(-201, 200, 6).map(y => (
          <line key={y} x1="-200" y1={y} x2="200" y2={y} className={classes.gridMinor} />
      ))}
      {_.range(-201, 200, 6).map(x => (
          <line key={x} x1={x} y1="-200" x2={x} y2="200" className={classes.gridMinor} />
      ))}
      {_.range(-180, 200, 30).map(y => (
          <line key={y} x1="-200" y1={y} x2="200" y2={y} className={classes.gridMajor} />
      ))}
      {_.range(-180, 200, 30).map(x => (
          <line key={x} x1={x} y1="-200" x2={x} y2="200" className={classes.gridMajor} />
      ))}
    </g>
  )
}


interface CellProps extends React.SVGAttributes<SVGElement> {
  position: GeoPosition,
  r?: number,
}

const Cell = ({ position, r = 10, ...props }: CellProps) => {
  const coord = Geo[position];
  return (
    <circle cx={coord.x} cy={coord.y} r={r} {...props} />
  )
}


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

interface TokenProps extends SVGMotionProps<SVGElement> {
  pos: GeoPosition,
  seat: number,
}

const Token = ({pos, seat, ...props}: TokenProps) => {

  // Use the previous value of the pos prop for animation.
  const prevPos = useRef<string|undefined>();
  useEffect(() => {
    prevPos.current = pos;
  }, [prevPos, pos]);

  const origin = prevPos.current;
  const trail = (origin && origin !== pos) ? buildTrail(origin, pos, seat) : [pos] ;

  const cellRadius = 10;
  const tokenRadius = 12;
  const className = [
    classes.tokenRed,
    classes.tokenBlue,
    classes.tokenYellow,
    classes.tokenGreen,
  ][seat];

  const animate = trail.length > 1 ? {
    x: trail.map(p => Geo[p].x - tokenRadius),
    y: trail.map(p => Geo[p].y - (tokenRadius * 2 - cellRadius)),
    transition: { duration: Math.max(1, trail.length / 2), ease: "easeOut" },
  } : {
    x: Geo[pos].x - tokenRadius,
    y: Geo[pos].y - (tokenRadius * 2 - cellRadius)
  };

  return (
    <motion.use
      xlinkHref="#token"
      height={tokenRadius * 2}
      width={tokenRadius * 2}
      animate={animate}
      style={{x: Geo[pos].x - tokenRadius, y: Geo[pos].y - (tokenRadius * 2 - cellRadius)}}
      className={className}
    />
  )
}


interface Props {
  showGrid?: boolean;
  children?: React.ReactNode;
}

const SvgBoard = ({
  showGrid = false,
  children,
}: Props) => {

  const handleClick = (pos: GeoPosition) => {
    return () => {
      console.log(pos);
    }
  };

  return (
    <svg
      viewBox="-200 -200 400 400"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={classes.root}
    >
      <defs>
        <linearGradient id="buttonGradient" gradientTransform="rotate(70)">
          <stop offset="0%" stopColor="#ffcdd2" />
          <stop offset="100%" stopColor="#d32f2f" />
        </linearGradient>

        <radialGradient id="cellGradient" fx="70%" fy="70%">
          <stop offset="0%" stopColor="black" stopOpacity="0.25" />
          <stop offset="80%" stopColor="black" stopOpacity="0.5" />
        </radialGradient>

        <radialGradient id="boardGradient">
          <stop offset="50%" stopColor="transparent" />
          <stop offset="100%" stopColor="black" stopOpacity="0.25" />
        </radialGradient>

        <radialGradient id="tokenGradient1" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="80%" stopColor="#0a0a0a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id="shadowGradient1">
          <stop offset="50%" stopColor="#000000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <symbol id="token" viewBox="-10 -10 20 20" x="0" y="0">
          <ellipse
            fill="url(#shadowGradient1)"
            cx="0"
            cy="8"
            rx="10"
            ry="2"
          />
          <circle cx="0" cy="0" r="10" />
          <circle fill="url(#tokenGradient1)" cx="0" cy="0" r="10" />
        </symbol>

      </defs>

      { showGrid && <GridLines /> }

      <g pointerEvents="none" className={classes.paintedRed}>
        <rect x={-15} y={-60} width={30} height={120} rx={15}
          transform="rotate(0) translate(0 -105)" />
        <rect x={-60} y={-15} width={120} height={30} rx={15}
          transform="rotate(45) translate(0 -211)" />
        <text x={0} y={15}
          dominant-baseline="middle"
          text-anchor="middle"
          transform="rotate(45) translate(0 -195)">
        </text>
      </g>

      <g className={classes.button} transform="translate(100 -80)">
        <rect x={-30} y={-15} width={60} height={30} rx={5} />
        <text x={0} y={5} fill="black"
          dominant-baseline="middle"
          text-anchor="middle">
          Play!
        </text>
      </g>

      <g pointerEvents="none" className={classes.paintedBlue}>
        <rect x={-60} y={-15} width={120} height={30} rx={15}
          transform="rotate(135) translate(0 -211)" />
        <rect x={-15} y={-60} width={30} height={120} rx={15}
          transform="rotate(90) translate(0 -105)" />
        <text x={0} y={15}
          dominant-baseline="middle"
          text-anchor="middle"
          transform="rotate(-45) translate(0 170)">
          Blue
        </text>
      </g>

      <g pointerEvents="none" className={classes.paintedYellow}>
        <rect x={-60} y={-15} width={120} height={30} rx={15}
          transform="rotate(225) translate(0 -211)" />
        <rect x={-15} y={-60} width={30} height={120} rx={15}
          transform="rotate(180) translate(0 -105)" />
        <text x={0} y={15}
          dominant-baseline="middle"
          text-anchor="middle"
          transform="rotate(45) translate(0 170)">
          Yellow
        </text>
      </g>

      <g pointerEvents="none" className={classes.paintedGreen}>
        <rect x={-60} y={-15} width={120} height={30} rx={15}
          transform="rotate(315) translate(0 -211)" />
        <rect x={-15} y={-60} width={30} height={120} rx={15}
          transform="rotate(270) translate(0 -105)" />
        <text x={0} y={15}
          dominant-baseline="middle"
          text-anchor="middle"
          transform="rotate(-45) translate(0 -195)">
          Green
        </text>
      </g>

      <g>
        { _.keys(Geo).map(key => (
          <Cell
            key={key}
            position={key}
            r={10}
            className={classes.cell}
            onClick={handleClick(key)}
          />
        ))}
      </g>

      <Token pos="S00" seat={0} />
      <Token pos="S01" seat={0} />
      <Token pos="S02" seat={0} />
      <Token pos="S03" seat={0} />

      <Token pos="S10" seat={1} />
      <Token pos="S11" seat={1} />
      <Token pos="S12" seat={1} />
      <Token pos="S13" seat={1} />

      <Token pos="S20" seat={2} />
      <Token pos="S21" seat={2} />
      <Token pos="S22" seat={2} />
      <Token pos="S23" seat={2} />

      <Token pos="S30" seat={3} />
      <Token pos="S31" seat={3} />
      <Token pos="S32" seat={3} />
      <Token pos="S33" seat={3} />

      <svg width="20" height="20" x="-30" y="-10" viewBox="-10 -10 20 20">
        <rect x="-10" y="-10" width="20" height="20" rx="2" fill="blue" />
        <circle cx="0" cy="0" r="2" fill="white" />
        <circle cx="-6" cy="-6" r="2" fill="white" />
        <circle cx="6" cy="-6" r="2" fill="white" />
        <circle cx="-6" cy="6" r="2" fill="white" />
        <circle cx="6" cy="6" r="2" fill="white" />
        <circle cx="0" cy="-6" r="2" fill="white" />
        <circle cx="0" cy="6" r="2" fill="white" />
      </svg>

      <svg width="60" height="20" x="10" y="-10" viewBox="-30 -10 60 20">
        <rect x="-30" y="-10" width="60" height="20" rx="2" fill="blue" />
        <rect x="-30" y="-10" width="60" height="20" rx="2" fill="url('#boardGradient')" />
        <text x={0} y={4}
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          style={{fontFamily: "Rye"}}
        >ROLL</text>
      </svg>
    </svg>
  )
};

export default SvgBoard;
