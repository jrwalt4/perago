import * as moment from 'moment';
import * as PgEntry from './pg-entry';

it('Should create a new PgEntry with a cuid', () => {
  let e = PgEntry.create();
  expect(e._id).not.toEqual('');
});

it('Should create a new PgEntry with the provided _id', () => {
  let _id = '12345';
  let e = PgEntry.from({ _id });
  expect(e._id).toEqual(_id);
});

it('Should copy all fields from provided PgEntry', () => {
  let e = PgEntry.create();
  let start = moment('2017-07-07T04:00-04:00');
  PgEntry.setStart(e, start.valueOf());
  let end = start.add(2, 'h');
  PgEntry.setEnd(e, end.valueOf());
  PgEntry.setTask(e, '1');

  let e2 = PgEntry.from(e);
  expect(e2.start).toEqual(e.start);
  expect(e2.end).toEqual(e.end);
  expect(e2.taskId).toEqual(e.taskId);
});

it('Should return a new PgEntry with the provided start date', () => {
  let newStart = Date.now();
  let e = PgEntry.from({ start: newStart });
  expect(e.start).toEqual(newStart);
});

it('Sets entry date', () => {
  let start = moment('2017-07-07T04:00-04:00');
  let end = start.clone().add(2, 'h');
  let entry = PgEntry.from({ start: start.valueOf(), end: end.valueOf() });
  let newDate = moment('2017-07-06');
  expect(moment(PgEntry.setStartDate(entry, newDate).start).toISOString())
    .toEqual(moment('2017-07-06T04:00-04:00').toISOString());
  expect(moment(PgEntry.setEndDate(entry, newDate).end).toISOString())
    .toEqual(moment('2017-07-06T06:00-04:00').toISOString());
});
