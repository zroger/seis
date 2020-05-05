import React, {FunctionComponent} from 'react';

interface Props {
  color: string,
  x: number,
  y: number,
  h: number,
  highlight?: boolean,
}

const Cell: FunctionComponent<Props> = ({
  color,
  x,
  y,
  h,
  highlight,
  children,
}) => {
  const style = {
    top: x,
    left: y,
    height: h,
    width: h,
    borderWidth: h * 0.1,
  }
  return (
    <div className={"Cell " + color + (highlight ? " highlight" : "")} style={style}>{children}</div>
  )
};

export default Cell;
