import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
/* import { Lobby } from 'boardgame.io/react'; */
import Lobby from './components/Lobby';
import './App.css';

export default Lobby;

/* import 'normalize.css'; */

/* import Game from './game'; */
/* import Board from './components/Board'; */
/* import LobbyView from './components/LobbyView'; */

/* const GameClient = Client({ */
/*   game: Game, */
/*   board: Board, */
/*   numPlayers: 4, */
/*   multiplayer: SocketIO({ server: '10.0.1.27:8000' }), */
/* }); */

/* function App() { */
/*   const playerId = window.location.hash.substring(1); */
/*   return ( */
/*     <div> */
/*       <GameClient playerId={playerId} debug={playerId === "0"} /> */
/*     </div> */
/*   ) */
/* }; */

/* function LobbyRenderer(props: any): any { */
/*   return <LobbyView {...props} />; */
/* }; */

/* function AppWrapper() { */
/*   const games = [ */
/*     { */
/*       game: Game, */
/*       board: Board, */
/*     }, */
/*   ]; */
/*   return ( */
/*     <Lobby */
/*       gameServer={`http://${window.location.hostname}:8000`} */
/*       lobbyServer={`http://${window.location.hostname}:8000`} */
/*       gameComponents={games} */
/*       renderer={LobbyRenderer} */
/*     /> */
/*   ); */
/* } */

/* export default AppWrapper; */

