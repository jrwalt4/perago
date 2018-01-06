import { createSelector } from 'reselect';
import { PgAppState } from 'store';

const entriesSelector = (state: PgAppState) => state.model.entries;

export const getEntries = createSelector(
  [entriesSelector],
  (entries) => entries.toArray()
);