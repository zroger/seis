import React, { FunctionComponent } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './Home';
import PlayOnline from './PlayOnline';
import OfflineGame from './pages/OfflineGame';
import ViewPortUnits from './components/ViewPortUnits';
import SvgBoard from './SvgBoard';

import './App.css';

const App: FunctionComponent = () => {
  return (
    <ViewPortUnits>
      <Router>
        <Switch>
          <Route exact path="/games/:game_id">
            <PlayOnline />
          </Route>

          <Route exact path="/svg">
            <SvgBoard />
          </Route>

          <Route exact path="/offline">
            <OfflineGame />
          </Route>

          <Route>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ViewPortUnits>
  )
};

export default App;
