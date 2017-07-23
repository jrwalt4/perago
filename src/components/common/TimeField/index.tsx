import * as React from 'react';

import * as moment from 'moment';

import './TimeField.css';

type TimeFieldProps = {
  _id?: string
  value: moment.MomentInput
  format?: string
  isEditing?: boolean
  onSetTime?: React.FormEventHandler<HTMLInputElement>
};

let noop = () => void 0;

export class TimeField extends React.Component<TimeFieldProps, { value?: string }> {
  constructor(props: TimeFieldProps) {
    super(props);
    this.state = this.buildStateFromProps(props);
  }

  buildStateFromProps(props: TimeFieldProps) {
    return {
      value: props.value ? moment(props.value).format('h:mm a') : ''
    };
  }

  componentWillReceiveProps(props: TimeFieldProps) {
    this.setState(this.buildStateFromProps(props));
  }

  handleTimeChange = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      value: ev.currentTarget.value
    });
  }

  render() {
    if (!this.props.isEditing) {
      return (
        <span className="TimeField" data-id={this.props._id || ''}>
          {this.props.value ? moment(this.props.value).format(this.props.format || 'h:mm a') : ' - '}
        </span >
      );
    } else {
      return (
        <input data-id={this.props._id || ''}
          onFocus={(ev) => ev.currentTarget.select()}
          onChange={this.handleTimeChange}
          onBlur={this.props.onSetTime || noop}
          className="TimeField form-control" value={this.state.value} />
      );
    }
  }
};