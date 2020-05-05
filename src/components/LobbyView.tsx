import React, {FunctionComponent} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LobbyListView from './LobbyListView';
import LobbyLoginForm from './LobbyLoginForm';

enum LobbyPhase {
  ENTER = 'enter',
  PLAY = 'play',
  LIST = 'list',
}

interface Props {
  errorMsg: string,
  gameComponents: any[],
  rooms: any[],
  phase: LobbyPhase,
  playerName: string,
  runningGame: any,
  handleEnterLobby: (playerName: string) => void,
  handleExitLobby: () => void,
  handleCreateRoom: (gameName: string, numPlayers: number) => void,
  handleJoinRoom: (gameName: string, gameID: string, playerID: string) => void,
  handleLeaveRoom: (gameName: string, gameID: string) => void,
  handleExitRoom: () => void,
  handleRefreshRooms: () => void,
  handleStartGame: (gameName: string, gameOpts: any) => void,
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const LobbyView: FunctionComponent<Props> = ({
  errorMsg,
  gameComponents,
  rooms,
  phase,
  playerName,
  runningGame,
  handleEnterLobby,
  handleExitLobby,
  handleCreateRoom,
  handleJoinRoom,
  handleLeaveRoom,
  handleExitRoom,
  handleRefreshRooms,
  handleStartGame,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap={true} className={classes.toolbarTitle}>
            ¡seis!
          </Typography>
        </Toolbar>
      </AppBar>
      { (phase === LobbyPhase.ENTER) && (
        <LobbyLoginForm playerName={playerName} onJoin={handleEnterLobby} />
      )}
      { (phase === LobbyPhase.LIST) && (
        <LobbyListView
          rooms={rooms}
          playerName={playerName}
          createRoom={handleCreateRoom}
          refreshRooms={handleRefreshRooms}
        />
      )}
    </React.Fragment>
  )
};

export default LobbyView;
