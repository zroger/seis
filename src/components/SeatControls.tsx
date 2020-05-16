import _ from 'lodash';
import React, { FunctionComponent } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { IPlayer } from '../game';


const useStyles = makeStyles((theme) => ({
  root: {},
}));


interface Props {
  onSelect: (seat: number) => void,
  players: IPlayer[],
}


const SeatControls: FunctionComponent<Props> = ({
  onSelect,
  players,
}) => {
  const classes = useStyles();

  const onClick = (seat: number) => {
    return ((e: any) => {
      e.preventDefault();
      onSelect(seat);
    });
  }

  const colors = ['Red', 'Blue', 'Yellow', 'Green'];

  return (
    <ButtonGroup className={classes.root} size="large" variant="contained">
      {colors.map( (color, i) => (
        <Button key={i} onClick={onClick(i)} disabled={!!players.find(p => p.seat === i)}>
          {color}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SeatControls;
