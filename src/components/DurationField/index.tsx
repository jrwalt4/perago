import * as React from 'react';

import * as moment from 'moment';

export interface DurationFieldProps {
  from?: moment.MomentInput;
  to?: moment.MomentInput;
  value?: moment.Duration | number;
}

export let DurationField = (props: DurationFieldProps) => {
  if (props.value) {
    return <span>{moment.duration(props.value).humanize()}</span>;
  }
  let { from, to } = props;
  return <span>{to ? moment.duration({ from, to }).humanize() : moment(from).toNow(true)}</span>;
};
