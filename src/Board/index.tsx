import React from 'react';

import classes from './layout.module.css';
import Controls from './Controls';
import GameBoard from './GameBoard';
import Header from './Header';
import ViewPortUnits from '../components/ViewPortUnits';
import NewBoard from '../components/Board';

const Board = (props: any) => {
  return (
    <ViewPortUnits>
      <div className={classes.container}>
        <header>
          <Header />
        </header>

        <main>
          { //<GameBoard {...props} />
          }
          <NewBoard {...props} />
        </main>

        <footer>
          <Controls {...props} />
        </footer>
      </div>
    </ViewPortUnits>
  );
};

export default Board;
