import * as React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});

import { DateField } from './DateField';

it('renders a Date', () => {
  let renderDate = () => <DateField value={new Date()} />;
  expect(renderDate).not.toThrow();
  let renderTimestamp = () => <DateField value={Date.now()} />;
  expect(renderTimestamp).not.toThrow();
  let renderString = () => <DateField value="2017-06-17T10:00" />;
  expect(renderString).not.toThrow();
});

it('renders with provided format', () => {
  let dateTime = '2017-06-17T10:00';
  let dateFieldElement = shallow(<DateField value={dateTime} format="YYYY-MM-DD h:mm" />);
  expect(dateFieldElement.childAt(0).text()).toEqual('2017-06-17 10:00');
});

it('calls callback when editing', () => {
  let dateTime = '2017-06-17T10:00';
  let onSetDateSpy = jest.fn();
  let dateFieldElement = shallow(<DateField value={dateTime} isEditing={true} onSetDate={onSetDateSpy} />);
  dateFieldElement.find('DatePicker').simulate('change');
  expect(onSetDateSpy).toBeCalled();
});
