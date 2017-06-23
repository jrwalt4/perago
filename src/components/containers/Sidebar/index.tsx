import * as React from 'react';

import { RecentEntries } from '../RecentEntries';

export let Sidebar = (props: React.HTMLProps<null>) => (
  <div className={props.className}>
    <p>Recent Tasks</p>
    <RecentEntries />
  </div>
);