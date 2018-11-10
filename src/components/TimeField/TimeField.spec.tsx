import * as React from 'react';

import { shallow } from 'enzyme';

import { TimeField } from '.';

it('renders a time', () => {
  let renderDate = () => <TimeField value={new Date()}/>;
  expect(renderDate).not.toThrow();
  let renderTimestamp = () => <TimeField value={Date.now()}/>;
  expect(renderTimestamp).not.toThrow();
});

it('renders with provided format', () => {
  let dateTime = '2017-06-17T10:00';
  let timeFieldElement = shallow(<TimeField value={dateTime} format="YYYY-MM-DD h:mm" />);
  expect(timeFieldElement.childAt(0).text()).toEqual('2017-06-17 10:00');  
});

it('calls callback when editing', () => {
  let dateTime = '2017-06-17T10:00';
  let onSetTimeSpy = jest.fn();
  let timeFieldElement = shallow(<TimeField value={dateTime} isEditing={true} onTimeChange={onSetTimeSpy} />);
  timeFieldElement.find('input').simulate('change');
  expect(onSetTimeSpy).toBeCalled();
});
