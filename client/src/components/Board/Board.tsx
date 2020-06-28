import _ from 'lodash';
import React from 'react';

import { Cells, CellPosition } from '../positions';
import classes from './Board.module.css';

import useGrid from '../Grid/useGrid';


const Board: React.FC = ({ children }) => {
  const grid = useGrid();

  const renderCell = (position: CellPosition) => {
    return (
      <div
        className={grid.itemClass + " " + classes.cell}
        style={grid.getStyle(position, 10)}
      />
    )
  }

  const renderPaint = (pos1: CellPosition, pos2: CellPosition, className: string) => {
    return <div
      className={grid.itemClass + " " + className}
      style={grid.getStyle([pos1, pos2], 13)}
    />;
  }

  return (
    <div className={classes.root}>

      <div className="paint">
        { renderPaint("H00", "H03", classes.paint0) }
        { renderPaint("H10", "H13", classes.paint1) }
        { renderPaint("H20", "H23", classes.paint2) }
        { renderPaint("H30", "H33", classes.paint3) }
        { renderPaint("S00", "S03", classes.paint0) }
        { renderPaint("S10", "S13", classes.paint1) }
        { renderPaint("S20", "S23", classes.paint2) }
        { renderPaint("S30", "S33", classes.paint3) }
      </div>

      <div className="cells">
        { _.keys(Cells).map(renderCell) }
      </div>

      {children}

    </div>
  )
};

export default Board;
