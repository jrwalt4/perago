import * as React from 'react';

import './Rightbar.css';

export type RightbarProps = {
  title: string,
  editIcon?: JSX.Element
} & React.HTMLAttributes<HTMLDivElement>;

export let Rightbar = (props: RightbarProps) => (
  <div className={'Rightbar ' + props.className}>
    <div className="Rightbar-header row">
      <div className="col-9">
        {props.title ? <h4>{props.title}</h4> : null}
      </div>
      <div className="col-3">
        {props.editIcon || null}
      </div>
    </div>
    {props.children}
  </div>
);