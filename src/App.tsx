import React, { FunctionComponent } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'react-jss';

import Home from './Home';
import PlayOnline from './PlayOnline';
import OfflineGame from './pages/OfflineGame';
import ViewPortUnits from './components/ViewPortUnits';
import SvgBoard from './SvgBoard';
import theme from './theme';

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
      </ThemeProvider>
    </ViewPortUnits>
  )
};

export default App;
