import { PgEntry, defaultEntry, createEntry, setStart } from './pg-entry';

it('Should create a default PgEntry', () => {
  let e = new PgEntry;
  expect(e.entryId).toEqual(defaultEntry.entryId);
});

it('Should create a new PgEntry with a cuid', () => {
  let e = createEntry();
  expect(e.entryId).not.toEqual('');
});

it('Should return a new PgEntry with the provided start date', () => {
  let e = createEntry();
  let newStart = new Date();
  let e2 = setStart(e, newStart);
  expect(e2.start).toEqual(newStart);
  expect(e).not.toEqual(e2);
});