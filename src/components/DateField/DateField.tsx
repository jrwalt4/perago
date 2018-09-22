import * as React from 'react';

import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './DateField.css';

type DateFieldProps = {
  value: moment.MomentInput
  format?: string
  isEditing?: boolean
  onSetDate?: (value: moment.Moment) => void
};

export class DateField extends React.Component<DateFieldProps, {}> {
  constructor(props: DateFieldProps) {
    super(props);
  }

  handleDateChange = (value: moment.Moment) => {
    if (this.props.onSetDate) {
      this.props.onSetDate(value);
    }
  }

  render() {
    if (!this.props.isEditing) {
      return (
        <span className="DateField">
          {this.props.value ? moment(this.props.value).format(this.props.format || 'M D') : ''}
        </span >
      );
    } else {
      return (
        <DatePicker
          selected={moment(this.props.value)}
          onChange={this.handleDateChange}
        />
      );
    }
  }
}