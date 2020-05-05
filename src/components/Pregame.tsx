import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  refreshRoom,
  joinGame,
  selectAll,
  selectOpenSpots,
  setPlayerName,
} from '../app/lobbySlice';

import Avatar from '@material-ui/core/Avatar';
import Button  from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import DoneIcon from '@material-ui/icons/Done';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import DiceIcon from './DiceIcon';
import { Colors } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  fieldset: {
    display: 'block',
    marginTop: theme.spacing(2),
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));


const Pregame: FunctionComponent = () => {
  const classes = useStyles();
  const state = useSelector(selectAll);
  const openSpots = useSelector(selectOpenSpots);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshRoom());
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const [formName, setFormName] = useState(state.playerName);
  const [formPlayerID, setFormPlayerID] = useState("");

  const onNameChange = (e: any) => {
    setFormName(e.target.value)
  };


  const handlePlayerIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormPlayerID((event.target as HTMLInputElement).value);
  };

  const onSubmit = () => {
    dispatch(setPlayerName(formName));
    dispatch(joinGame(formPlayerID));
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <header className={classes.header}>
        <Avatar className={classes.avatar}><DiceIcon value={6} /></Avatar>
        <Typography component="h1" variant="h5">
          { state.playerID ? "Ready" : "Choose your color"}
        </Typography>
      </header>

      { state.playerID ? (
        <List>
          <ListItem>
            <ListItemIcon>
              <DoneIcon style={{color: Colors[parseInt(state.playerID, 10)]}} />
            </ListItemIcon>
            <ListItemText primary={state.playerName} />
          </ListItem>
          {
            state.players.filter(
              ({id, name}) => (!!name && id !== state.playerID)
            ).map(
              ({id, name}) => (
                <ListItem key={id}>
                  <ListItemIcon>
                    <DoneIcon style={{color: Colors[parseInt(id, 10)]}} />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              )
            )
          }
          <ListItem>
            <ListItemIcon>
              <CircularProgress size={20} />
            </ListItemIcon>
            <ListItemText primary={`Waiting for ${openSpots.length} more players`} />
          </ListItem>
        </List>
      ) : (
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="standard"
            margin="normal"
            required={true}
            fullWidth={true}
            id="playerName"
            label="Your Name"
            name="playerName"
            autoFocus={true}
            onChange={onNameChange}
            value={formName}
          />
          <FormControl component="fieldset" className={classes.fieldset}>
            <FormLabel component="legend">Choose your color</FormLabel>
            <RadioGroup name="playerID" value={formPlayerID} onChange={handlePlayerIDChange}>
              {state.players.map(({id, name}) => (
                <FormControlLabel
                  key={id}
                  value={id}
                  control={<Radio />}
                  label={Colors[parseInt(id, 10)]}
                  disabled={!!name && id !== state.playerID}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Join
          </Button>
        </form>
      )}
    </Container>
  );
};

export default Pregame;
