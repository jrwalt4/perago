import * as React from 'react';

import './Rightbar.css';

export type RightbarProps = {
  title: string,
  editIcon?: JSX.Element
} & React.HTMLAttributes<HTMLDivElement>;

export let Rightbar = (props: RightbarProps) => (
  <div className={'Rightbar ' + props.className}>
    <div className="Rightbar-header row">
      {props.title ? <h4 className="col-9">{props.title}</h4> : null}
      {props.editIcon || null}
    </div>
    {props.children}
  </div>
);