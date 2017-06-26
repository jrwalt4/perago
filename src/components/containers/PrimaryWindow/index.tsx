import * as React from 'react';

import './PrimaryWindow.css';

export let PrimaryWindow = (props: React.Props<null> & React.HTMLProps<null>) => (
  <div className={'PrimaryWindow ' + props.className}>
    {props.title ? <h4>{props.title}</h4> : null}
    {props.children}
  </div>
);