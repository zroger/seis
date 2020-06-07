import React, {FunctionComponent} from 'react';
import { IconType} from 'react-icons';
import {
  GiDiceSixFacesOne,
  GiDiceSixFacesTwo,
  GiDiceSixFacesThree,
  GiDiceSixFacesFour,
  GiDiceSixFacesFive,
  GiDiceSixFacesSix,
  GiInvertedDice1,
  GiInvertedDice2,
  GiInvertedDice3,
  GiInvertedDice4,
  GiInvertedDice5,
  GiInvertedDice6,
  GiPerspectiveDiceSixFacesRandom,
} from 'react-icons/gi';
import { DiceValue } from "../constants";
import classes from './dice.module.css';

const RandomIcon = GiPerspectiveDiceSixFacesRandom;
const Icons: Record<string, Record<DiceValue, IconType>> = {
  default: {
    1: GiDiceSixFacesOne,
    2: GiDiceSixFacesTwo,
    3: GiDiceSixFacesThree,
    4: GiDiceSixFacesFour,
    5: GiDiceSixFacesFive,
    6: GiDiceSixFacesSix,
  },
  inverted: {
    1: GiInvertedDice1,
    2: GiInvertedDice2,
    3: GiInvertedDice3,
    4: GiInvertedDice4,
    5: GiInvertedDice5,
    6: GiInvertedDice6,
  },
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  seat: number,
  size?: number,
  value?: DiceValue,
  variant?: keyof typeof Icons,
}

const DiceIcon: FunctionComponent<Props> = ({
  seat,
  size = 10,
  value,
  variant = 'default',
  ...props
}) => {
  const Component = value ? Icons[variant][value] : RandomIcon;
  const className = value ? classes.icon : classes.iconRandom;
  const style = {"--icon-size": size} as React.CSSProperties;
  return (
    <div className={className + ' ' + classes[`seat-${seat}`]} style={style} {...props}>
      <Component />
    </div>
  );
};

export default DiceIcon;
