import * as React from 'react';

import { EntryDetail } from '../EntryDetail';

export let Rightbar = (props: React.HTMLProps<null>) => (
  <div className={props.className}>
    <EntryDetail />
  </div>
);