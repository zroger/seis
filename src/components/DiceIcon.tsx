import React, {FunctionComponent} from 'react';
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

interface Props {
  value?: DiceValue,
}

const DiceIcon: FunctionComponent<Props> = ({
  value,
}) => {
  const Component = value ? Icons[value] : RandomIcon;
  const className = value ? `dice-${value}` : 'dice-random';

  return (
    <Component className={`dice ${className}`} />
  );
};

export default DiceIcon;
