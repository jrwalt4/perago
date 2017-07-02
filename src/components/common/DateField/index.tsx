import * as React from 'react';

import * as moment from 'moment';

type DateFieldProps = {
  value: Date | undefined
  format?: string
  isEditing?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export let DateField = ({ value, format, isEditing, onChange }: DateFieldProps) => {
  if (!isEditing) {
    return (
      <span>
        {value ? moment(value).format(format || 'd/M h:mm') : ''}
      </span>
    );
  } else {
    return (
      <input onChange={onChange} />
    );
  }
};