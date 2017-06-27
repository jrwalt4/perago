import { PgEntry } from './pg-entry';

it('Should create a new PgEntry with a cuid', () => {
  let e = PgEntry.create();
  expect(e._id).not.toEqual('');
});

it('Should create a new PgEntry with the provided _id', () => {
  let _id = '12345';
  let e = PgEntry.from({_id});
  expect(e._id).toEqual(_id);
});

it('Should return a new PgEntry with the provided start date', () => {
  let newStart = new Date();
  let e = PgEntry.from({ start: newStart });
  expect(e.start).toEqual(newStart);
});