import React, {
  Fragment,
  FunctionComponent,
} from 'react';

const Template: FunctionComponent<{}> = ({
  children,
}) => {
  return (
    <Fragment>
      { children }
    </Fragment>
  )
};

export default Template;
