import React, { FunctionComponent } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './theme';
import Home from './Home';
import PlayOffline from './PlayOffline';
import PlayOnline from './PlayOnline';
import ViewPortUnits from './ViewPortUnits';

import './App.css';

const App: FunctionComponent = () => {
  return (
    <ViewPortUnits>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/games/:game_id">
              <PlayOnline />
            </Route>

            <Route exact path="/offline">
              <PlayOffline />
            </Route>

            <Route>
              <Home />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ViewPortUnits>
  )
};

export default App;
