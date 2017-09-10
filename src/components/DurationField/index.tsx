import * as React from 'react';

import * as moment from 'moment';

type DurationFieldProps = {
  from: moment.MomentInput
  to?: moment.MomentInput
};

export let DurationField = ({ from, to }: DurationFieldProps) => (
  <span>{to ? moment.duration({ from, to }).humanize() : moment(from).toNow(true)}</span>
);