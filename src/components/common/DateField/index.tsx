import * as React from 'react';

import * as moment from 'moment';

export let DateField = (props: { value?: Date, format?: string }) => (
  <span>
    {props.value ? moment(props.value).format(props.format || 'd/M h:mm') : ''}
  </span>
);