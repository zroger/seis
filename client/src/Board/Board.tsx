import React from 'react';

import { BoardPosition, boardPositions } from '@seis/core';
import classes from './Board.module.css';
import Cell from '../Cell';

const Board: React.FC = ({ children }) => {
  const renderCell = (position: BoardPosition) => {
    return (
      <Cell key={position} position={position}><div className={classes.cell} /></Cell>
    )
  }

  return (
    <div className={classes.root}>
      <div className="paint">
        <div className={classes.startRed} />
        <div className={classes.startBlue} />
        <div className={classes.startYellow} />
        <div className={classes.startGreen} />
        <div className={classes.homeRed} />
        <div className={classes.homeBlue} />
        <div className={classes.homeYellow} />
        <div className={classes.homeGreen} />
      </div>

      <div className="cells">
        { boardPositions.map(renderCell) }
      </div>

      {children}

      <div />
    </div>
  )
};

export default Board;
