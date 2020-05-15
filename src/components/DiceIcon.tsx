import React, {FunctionComponent} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconType} from 'react-icons';
import {
  GiDiceSixFacesOne,
  GiDiceSixFacesTwo,
  GiDiceSixFacesThree,
  GiDiceSixFacesFour,
  GiDiceSixFacesFive,
  GiDiceSixFacesSix,
  GiPerspectiveDiceSixFacesRandom,
} from 'react-icons/gi';
import { DiceValue } from "../constants";

const RandomIcon = GiPerspectiveDiceSixFacesRandom;
const Icons: Record<DiceValue, IconType> = {
  1: GiDiceSixFacesOne,
  2: GiDiceSixFacesTwo,
  3: GiDiceSixFacesThree,
  4: GiDiceSixFacesFour,
  5: GiDiceSixFacesFive,
  6: GiDiceSixFacesSix,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      userSelect: 'none',
      width: '1em',
      height: '1em',
      display: 'inline-block',
      fill: 'currentColor',
      flexShrink: 0,
      fontSize: 'inherit',
      transition: theme.transitions.create('fill', {
	duration: theme.transitions.duration.shorter,
      }),
    },
  }),
);

interface Props {
  value?: DiceValue,
}

const DiceIcon: FunctionComponent<Props> = ({
  value,
}) => {
  const Component = value ? Icons[value] : RandomIcon;
  const classes = useStyles();

  return (
    <Component className={classes.root} />
  );
};

export default DiceIcon;
