import _ from 'lodash';
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss'

import { Theme } from '../../theme.js';
import { Geo, GeoPosition } from './constants';
import Dice from './Dice';
import Player from './Player';
import Token from './Token';

import bg from '../../Board/img/purty-wood.png';

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    display: "block",
    height: "calc(var(--board-unit, 0.9vmin) * 100)",
    width: "calc(var(--board-unit, 0.9vmin) * 100)",
    backgroundColor: "#f0c7af",
    backgroundImage: `radial-gradient(circle farthest-corner at center, transparent 50%, rgba(0,0,0,0.25)), url(${bg})`,
    backgroundSize: "contain",
    boxShadow: "0 5px 5px black",
  },

  paint0: {
    fill: theme.seats[0].paint,
    fillOpacity: 0.4,
  },
  paint1: {
    fill: theme.seats[1].paint,
    fillOpacity: 0.4,
  },
  paint2: {
    fill: theme.seats[2].paint,
    fillOpacity: 0.4,
  },
  paint3: {
    fill: theme.seats[3].paint,
    fillOpacity: 0.4,
  },
}));

const renderGrid = () => {
  const minor = "#bdbdbd";
  const major = "#9e9e9e";
  return (
    <g pointerEvents="none">
      {_.range(-210, 210, 6).map(y => (
        <line key={y} x1="-200" y1={y} x2="200" y2={y} stroke={y % 30 === 0 ? major : minor} />
      ))}
      {_.range(-210, 210, 6).map(x => (
        <line key={x} x1={x} y1="-200" x2={x} y2="200" stroke={x % 30 === 0 ? major : minor} />
      ))}
    </g>
  )
}

const renderCell = (position: GeoPosition) => {
  const coord = Geo[position];
  return (
    <circle cx={coord.x} cy={coord.y} r={10} fill="url('#cellGradient')" />
  )
}

interface Props {
  showGrid?: boolean;
}

const SvgBoard: React.FC<Props> = ({ showGrid=false, children }) => {
  const theme = useTheme() as Theme;
  const classes = useStyles(theme);
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

        <radialGradient id="cellGradient" fx="30%" fy="70%">
          <stop offset="0%" stopColor="black" stopOpacity="0.25" />
          <stop offset="80%" stopColor="black" stopOpacity="0.4" />
        </radialGradient>

        <radialGradient id="boardGradient">
          <stop offset="50%" stopColor="transparent" />
          <stop offset="100%" stopColor="black" stopOpacity="0.25" />
        </radialGradient>

        <radialGradient id="tokenGradient1" fx="70%" fy="25%">
          <stop offset="15%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="20%" stopColor="transparent" stopOpacity="0.0" />
          <stop offset="80%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
        </radialGradient>

        <radialGradient id="shadowGradient1">
          <stop offset="50%" stopColor="#000000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      { showGrid && renderGrid() }

      <g pointerEvents="none" className={classes.paint0}>
        <rect x={-15} y={-60} width={30} height={120} rx={15}
          transform="rotate(0) translate(0 -105)" />
        <rect x={-60} y={-15} width={120} height={30} rx={15}
          transform="rotate(45) translate(0 -211)" />
      </g>

      <g pointerEvents="none" className={classes.paint1}>
        <rect x={-60} y={-15} width={120} height={30} rx={15}
          transform="rotate(135) translate(0 -211)" />
        <rect x={-15} y={-60} width={30} height={120} rx={15}
          transform="rotate(90) translate(0 -105)" />
      </g>

      <g pointerEvents="none" className={classes.paint2}>
        <rect x={-60} y={-15} width={120} height={30} rx={15}
          transform="rotate(225) translate(0 -211)" />
        <rect x={-15} y={-60} width={30} height={120} rx={15}
          transform="rotate(180) translate(0 -105)" />
      </g>

      <g pointerEvents="none" className={classes.paint3}>
        <rect x={-60} y={-15} width={120} height={30} rx={15}
          transform="rotate(315) translate(0 -211)" />
        <rect x={-15} y={-60} width={30} height={120} rx={15}
          transform="rotate(270) translate(0 -105)" />
      </g>

      <g>
        { _.keys(Geo).map(renderCell) }
      </g>

      {children}
    </svg>
  )
};

export default SvgBoard;
