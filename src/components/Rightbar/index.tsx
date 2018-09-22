import * as React from 'react';

import './Rightbar.css';

export type RightbarProps = React.HTMLAttributes<HTMLDivElement>;

export let Rightbar = (props: RightbarProps) => (
  <div className={'Rightbar ' + props.className} >
    {props.children}
  </div>
);
