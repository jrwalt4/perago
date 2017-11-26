import * as React from 'react';

import { shallow } from 'enzyme';

import { EntryListComponent } from './EntryList';
import { PgModel } from 'store/models';

it('renders', () => {
  let noop = () => void 0;
  let render = () => shallow(
    (
      <EntryListComponent
        model={PgModel.create()}
        selectedEntry="1"
        deselectEntry={noop}
        onSelectEntry={noop}
        onCopyEntry={noop}
        onContinueEntry={noop}
        onNewEntry={noop}
        onDeleteEntry={noop}
      />
    )
  );
  expect(render).not.toThrow();
});
