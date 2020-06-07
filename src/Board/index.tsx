import React from 'react';

import classes from './layout.module.css';
import Controls from './Controls';
import GameBoard from './GameBoard';
import Header from './Header';
import ViewPortUnits from '../components/ViewPortUnits';


const Board = (props: any) => {
  return (
    <ViewPortUnits>
      <div className={classes.container}>
        <header className={classes.header}>
          <Header />
        </header>

        <section className={classes.primary}>
          <div className={classes.board}>
            <GameBoard {...props} />
          </div>
        </section>

        <section className={classes.secondary}>
          <Controls {...props} />
        </section>
      </div>
    </ViewPortUnits>
  );
};

export default Board;
