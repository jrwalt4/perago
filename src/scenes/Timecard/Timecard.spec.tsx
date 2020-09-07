import * as React from 'react';
import { Timecard } from './Timecard';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});

it('renders without crashing', () => {
  function render() {
    return shallow(<Timecard />);
  }
  expect(render).not.toThrow('Could not shallow render');
});
