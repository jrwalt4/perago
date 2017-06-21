import * as React from 'react';

import * as moment from 'moment';

export let DateField = (props: { value: Date, format?: string }) => (
  <span>
    {moment(props.value).format(props.format)}
  </span>
);