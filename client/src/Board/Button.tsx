import React, {FunctionComponent} from 'react';
import classes from './dice.module.css';

interface Props extends React.SVGAttributes<SVGElement> {
  action: () => void,
  seat?: number,
  value?: string,
}

const Button: FunctionComponent<Props> = ({
  action,
  seat,
  value,
  ...props
}) => {
  const color = typeof seat === "undefined" ? ["white", "black"] : [
    ["red", "white"],
    ["blue", "white"],
    ["yellow", "white"],
    ["green", "white"],
  ][seat];

  return (
    <svg className={classes.icon} viewBox="-20 -10 40 20" onClick={() => action()} {...props}>
      <defs>
        <radialGradient id="overlayGradient">
          <stop offset="50%" stopColor="transparent" />
          <stop offset="100%" stopColor="black" stopOpacity="0.25" />
        </radialGradient>
      </defs>

      <rect x="-20" y="-10" width="40" height="20" rx="2" fill={color[0]} />
      <rect x="-20" y="-10" width="40" height="20" rx="2" fill="url(#overlayGradient)" />
      <text x={0} y={3}
        dominant-baseline="middle"
        text-anchor="middle"
        fill={color[1]}
        style={{
          fontFamily: "Rye",
          fontSize: 12,
          fontWeight: "bold",
        }}
      >{value}</text>
      <rect x="-20" y="-10" width="40" height="20" rx="2" stroke={color[0]} stroke-width="1" fill="transparent" />
    </svg>
  )
};

export default Button;
