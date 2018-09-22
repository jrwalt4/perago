import * as React from 'react';

export let Sidebar = (props: React.HTMLProps<HTMLDivElement>) => (
  <div className={props.className}>
    {props.children}
  </div>
);
