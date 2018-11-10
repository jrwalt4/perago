import * as React from 'react';
import * as Select from 'react-select';
import * as moment from 'moment';

import 'react-select/dist/react-select.css';
import './TimeField.css';

interface TimeFieldProps {
  _id?: string;
  value: moment.MomentInput;
  format?: string;
  empty?: string;
  isEditing?: boolean;
  onTimeChange?: (newTime: moment.Moment) => void;
}

interface TimeFieldState {
  inputString?: string;
  timeOptions: number[];
}

export class TimeField extends React.Component<TimeFieldProps, TimeFieldState> {

  static DEFAULT_FORMAT = 'h:mm a';
  static DEFAULT_EMPTY = ' - ';
  static DEFAULT_TIMES = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00'
  ].map((timeString) => moment(timeString, 'h:mm').valueOf());

  constructor(props: TimeFieldProps) {
    super(props);
    let timeOptions = props.value ? [moment(props.value).valueOf()] : TimeField.DEFAULT_TIMES;
    this.state = {
      timeOptions
    };
  }

  getValueString(): string {
    let value = this.props.value;
    let format = this.props.format || TimeField.DEFAULT_FORMAT;
    let empty = this.props.empty || TimeField.DEFAULT_EMPTY;
    return value ? moment(value).format(format) : empty;
  }

  getTimeOptions(): Select.Options<number> {
    let optionValues = this.state.timeOptions;
    let format = this.props.format || TimeField.DEFAULT_FORMAT;
    return optionValues.map((time) => ({
      value: time,
      label: moment(time).format(format)
    }));
  }

  handleSelect = (option: Select.Option<number>) => {
    if (this.props.onTimeChange) {
      this.props.onTimeChange(moment(option.value));
    }
  }

  handleInput = (inputString: string) => {
    return inputString;
  }

  render() {
    if (!this.props.isEditing) {
      return (
        <span className="TimeField" data-id={this.props._id || ''}>
          {this.getValueString()}
        </span >
      );
    } else {
      return (
        <Select.default
          onInputChange={this.handleInput}
          options={this.getTimeOptions()}
          onChange={this.handleSelect}
          value={moment(this.props.value).valueOf()}
        />
      );
    }
  }
}
