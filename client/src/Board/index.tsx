import React from 'react';

import classes from './layout.module.css';
import Controls from './Controls';
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
