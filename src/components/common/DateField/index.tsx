import * as React from 'react';

import * as moment from 'moment';

import './DateField.css';

type DateFieldProps = {
  _id?: string
  value: Date | undefined
  format?: string
  isEditing?: boolean
  onSetDate?: React.FormEventHandler<HTMLInputElement>
  onSetTime?: React.FormEventHandler<HTMLInputElement>
};

export let DateField = ({ _id, value, format, isEditing, onSetTime }: DateFieldProps) => {
  if (!isEditing) {
    return (
      <span className="DateField" data-id={_id || ''}>
        {value ? moment(value).format(format || 'd/M h:mm') : ''}
      </span>
    );
  } else {
    return (
      <input data-id={_id || ''} onBlur={onSetTime} className="DateField form-control" />
    );
  }
};