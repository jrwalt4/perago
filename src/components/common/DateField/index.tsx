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

let noop = () => void 0;

export class DateField extends React.Component<DateFieldProps, { value?: string }> {
  constructor(props: DateFieldProps) {
    super(props);
    this.state = {
      value: moment(props.value).format('h:mm a')
    };
  }

  componentWillReceiveProps(props: DateFieldProps) {
    this.setState({
      value: moment(props.value).format('h:mm a')
    });
  }

  handleTimeChange = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      value: ev.currentTarget.value
    });
  }

  render() {
    if (!this.props.isEditing) {
      return (
        <span className="DateField" data-id={this.props._id || ''}>
          {this.props.value ? moment(this.props.value).format(this.props.format || 'd/M h:mm') : ''}
        </span >
      );
    } else {
      return (
        <input data-id={this.props._id || ''}
          onFocus={(ev) => ev.currentTarget.select()}
          onChange={this.handleTimeChange}
          onBlur={this.props.onSetTime || noop}
          className="DateField form-control" value={this.state.value} />
      );
    }
  }
};