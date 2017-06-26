import { PgEntry, defaultEntry } from './pg-entry';

it('Should create a default PgEntry', () => {
  let e = PgEntry.create();
  expect(e._id).toEqual(defaultEntry._id);
});

it('Should create a new PgEntry with a cuid', () => {
  let e = PgEntry.create();
  expect(e._id).not.toEqual('');
});

it('Should return a new PgEntry with the provided start date', () => {
  let newStart = new Date();
  let e = PgEntry.from({ start: newStart });
  expect(e.start).toEqual(newStart);
});