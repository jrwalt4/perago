import * as React from 'react';
import { Timecard } from './Timecard';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  function render() {
    return shallow(<Timecard />);
  }
  expect(render).not.toThrow('Could not shallow render');
});
