import * as React from 'react';

import * as moment from 'moment';

type DurationFieldProps = {
  from: Date
  to: Date
};

export let DurationField = ({ from, to }: DurationFieldProps) => (
  <span>{moment.duration({ from, to }).humanize()}</span>
);