import _ from 'lodash';
import React from 'react';
import GridContext from './GridContext';
import { positions, GridPosition } from './positions';
import classes from './Grid.module.css';


const createGetStyle = (pixelSize: number) => (
  center: GridPosition | [GridPosition, GridPosition],
  radius: number,
  borderRadius?: number,
  innerWidth?: number,
) => {
  const scale = pixelSize / 400;
  const [pos1, pos2] = _.isArray(center) ? center : [center, center];
  const p1 = {
    x: positions[pos1].x * 30,
    y: positions[pos1].y * -30,
  };
  const p2 = {
    x: positions[pos2].x * 30,
    y: positions[pos2].y * -30,
  };
  const centerX = (p1.x + p2.x) / 2;
  const centerY = (p1.y + p2.y) / 2;
  const distance = _.isUndefined(innerWidth) ? (
    Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2)
  ) : innerWidth;

  const slope = (p2.y -  p1.y) / (p2.x - p1.x);
  const rotate = Math.atan(slope) * 180 / Math.PI;

  const shift = (value: number) => value + 200;
  const scaled = (value: number) => value * scale;
  return {
    'left': scaled(shift(centerX) - (distance / 2) - radius),
    'top': scaled(shift(centerY) - radius),
    'width': scaled((radius * 2) + distance),
    '--width': scaled((radius * 2) + distance),
    'height': scaled(radius * 2),
    '--height': scaled(radius * 2),
    'border-radius': scaled(_.isUndefined(borderRadius) ? radius : borderRadius),
    '--rotate': rotate,
  } as React.CSSProperties;
}


export default function useGrid() {
  const grid = React.useContext(GridContext);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(grid);
  }

  return {
    ...grid,
    baseSize: 400,
    itemClass: classes.positioned,
    getStyle: createGetStyle(grid.pixelSize),
  }
}
