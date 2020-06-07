import React from 'react';
import { IconType} from 'react-icons';
import {
  GiInvertedDice1,
  GiInvertedDice2,
  GiInvertedDice3,
  GiInvertedDice4,
  GiInvertedDice5,
  GiInvertedDice6,
  GiPerspectiveDiceSixFacesRandom,
} from 'react-icons/gi';
import { DiceValue } from "../constants";
import classes from "./controls.module.css";

const Icons: Record<DiceValue|"random", IconType> = {
  1: GiInvertedDice1,
  2: GiInvertedDice2,
  3: GiInvertedDice3,
  4: GiInvertedDice4,
  5: GiInvertedDice5,
  6: GiInvertedDice6,
  random: GiPerspectiveDiceSixFacesRandom,
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  value: DiceValue|"random",
}

const DiceButton = ({ value, ...props }: Props) => {
  const Component = Icons[value];
  const className = value === "random" ? classes.diceButtonRandom : classes.diceButton;

  return (
    <button className={(props.className ? props.className + ' ' : '') + className} {...props}>
      <Component />
    </button>
  );
};

export default DiceButton;
