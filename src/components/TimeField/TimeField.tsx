import * as React from 'react';
import * as Select from 'react-select';
import moment from 'moment';

import 'react-select/dist/react-select.css';
import './TimeField.css';

interface TimeFieldProps {
  _id?: string;
  value: moment.MomentInput;
  timeOptions?: moment.MomentInput[];
  format?: string;
  empty?: string;
  isEditing?: boolean;
  clearable?: boolean;
  onTimeChange?: (newTime: moment.Moment | null) => void;
  onInputChange?: (input: string) => void;
}

interface TimeFieldState {
  inputString?: string;
}

export class TimeField extends React.Component<TimeFieldProps, TimeFieldState> {

  static DEFAULT_FORMAT = 'h:mm a';
  static DEFAULT_EMPTY = ' - ';
  static filterOptions: Select.FilterOptionsHandler<number> = (options, filter, values) => {
    return options;
  }

  getValueString(): string {
    let value = this.props.value;
    let format = this.props.format || TimeField.DEFAULT_FORMAT;
    let empty = this.props.empty || TimeField.DEFAULT_EMPTY;
    return value ? moment(value).format(format) : empty;
  }

  getTimeOptions(): Select.Options<number> {
    if (this.props.timeOptions == null) {
      return [];
    }
    let optionValues = this.props.timeOptions;
    if (this.props.value) {
      // Place the current selected time at the front of the list
      // TODO: find a way to insert a divider between current selection
      // and other option values
      if (optionValues.indexOf(this.props.value) < 0) {
        optionValues.unshift(this.props.value);
      }
    }
    let format = this.props.format || TimeField.DEFAULT_FORMAT;
    return optionValues.map((time) => ({
      value: moment(time).valueOf(),
      label: moment(time).format(format)
    }));
  }

  handleSelect = (option: Select.Option<number> | null) => {
    if (this.props.onTimeChange) {
      this.props.onTimeChange(option && moment(option.value));
    }
  }

  handleInput = (inputString: string) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(inputString);
    }
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
          clearable={!!this.props.clearable}
          filterOptions={TimeField.filterOptions}
          value={moment(this.props.value).valueOf()}
        />
      );
    }
  }
}
