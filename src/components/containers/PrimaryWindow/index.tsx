import * as React from 'react';

export let PrimaryWindow = (props: React.Props<null> & React.HTMLProps<null>) => (
  <div className={props.className}>
    {props.children}
  </div>
);