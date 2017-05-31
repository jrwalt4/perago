import * as React from 'react';
import { App } from './App';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  function render() {
    return shallow(<App />);
  }
  expect(render).not.toThrow('Could not shallow render');
});
