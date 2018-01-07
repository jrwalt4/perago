import * as React from 'react';

import { shallow } from 'enzyme';

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
