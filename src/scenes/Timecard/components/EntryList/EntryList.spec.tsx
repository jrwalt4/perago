import * as React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});

import { EntryListComponent } from './EntryList';
import { create as createModel } from 'store/models/pg-model';

it('renders', () => {
  let noop = () => void 0;
  let render = () => shallow(
    (
      <EntryListComponent
        entries={Array.from(createModel().entries.values())}
        selectedEntry="1"
        deselectEntry={noop}
        selectEntry={noop}
        continueTask={noop}
        onNewEntry={noop}
        deleteEntry={noop}
      />
    )
  );
  expect(render).not.toThrow();
});
