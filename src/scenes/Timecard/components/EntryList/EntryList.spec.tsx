import * as React from 'react';

import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});

import { EntryListComponent } from './EntryList';
import { PgModel } from 'store/models';

it('renders', () => {
  let noop = () => void 0;
  let render = () => shallow(
    (
      <EntryListComponent
        entries={PgModel.create().entries.toArray()}
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
