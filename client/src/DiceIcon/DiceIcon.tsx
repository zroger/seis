import React, {FunctionComponent} from 'react';
import { DiceValue } from "../constants";

interface Props extends React.SVGAttributes<SVGElement> {
  value: DiceValue,
}

const DiceIcon: FunctionComponent<Props> = ({
  value,
  ...props
}) => {
  const pip = (cx: number, cy: number) => {
    return <circle cx={cx} cy={cy} r="2" />
  }

  return (
    <svg viewBox="-10 -10 20 20" {...props}>
      { [1, 3, 5].includes(value as number) && pip(0, 0) }
      { [2, 3, 4, 5, 6].includes(value as number) && pip(-6, -6) }
      { [4, 5, 6].includes(value as number) && pip(6, -6) }
      { [4, 5, 6].includes(value as number) && pip(-6, 6) }
      { [2, 3, 4, 5, 6].includes(value as number) && pip(6, 6) }
      { [6].includes(value as number) && pip(0, -6) }
      { [6].includes(value as number) && pip(0, 6) }
    </svg>
  )
};

export default DiceIcon;
