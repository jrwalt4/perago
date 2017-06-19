import * as React from 'react';

export let PrimaryWindow = (props: React.Props<null>) => (
  <div className="col-6">
    {props.children}
  </div>
);