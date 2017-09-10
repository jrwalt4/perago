import * as React from 'react';

export let Sidebar = (props: React.HTMLProps<HTMLDivElement>) => (
  <div className={props.className}>
    {props.title ? <h4>{props.title}</h4> : null}
    {props.children}
  </div>
);