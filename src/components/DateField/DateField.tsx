import * as React from 'react';

import * as moment from 'moment';

import './DateField.css';

type DateFieldProps = {
  _id?: string
  value: moment.MomentInput
  format?: string
  isEditing?: boolean
  onSetDate?: React.FormEventHandler<HTMLInputElement>
};

let noop = () => void 0;

export class DateField extends React.Component<DateFieldProps, { value: string }> {
  constructor(props: DateFieldProps) {
    super(props);
    this.state = this.buildStateFromProps(props);
  }

  buildStateFromProps(props: DateFieldProps) {
    return {
      value: moment(props.value).format('YYYY-MM-DD')
    };
  }

  componentWillReceiveProps(props: DateFieldProps) {
    this.setState(this.buildStateFromProps(props));
  }

  handleDateChange = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      value: ev.currentTarget.value
    });
  }

  render() {
    if (!this.props.isEditing) {
      return (
        <span className="DateField" data-id={this.props._id || ''}>
          {this.props.value ? moment(this.props.value).format(this.props.format || 'M D') : ''}
        </span >
      );
    } else {
      return (
        <input type="date"
          data-id={this.props._id || ''}
          onFocus={(ev) => ev.currentTarget.select()}
          onChange={this.handleDateChange}
          onBlur={this.props.onSetDate || noop}
          className="DateField form-control"
          value={this.state.value} />
      );
    }
  }
}