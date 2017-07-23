import * as moment from 'moment';

import { PgEntry } from './pg-entry';

it('Should create a new PgEntry with a cuid', () => {
  let e = PgEntry.create();
  expect(e._id).not.toEqual('');
});

it('Should create a new PgEntry with the provided _id', () => {
  let _id = '12345';
  let e = PgEntry.from({ _id });
  expect(e._id).toEqual(_id);
});

it('Should return a new PgEntry with the provided start date', () => {
  let newStart = Date.now();
  let e = PgEntry.from({ start: newStart });
  expect(e.start).toEqual(newStart);
});

it('Should parse a string representation of date and/or time', () => {
  let testStrings = [
    { pattern: '1:30', expectation: { hour: 13, minute: 30 } },
    { pattern: '130', expectation: { hour: 13, minute: 30 } },
    { pattern: '130a', expectation: { hour: 1, minute: 30 } },
    { pattern: '13', expectation: { hour: 13, minute: 0 } },
    { pattern: '730', expectation: { hour: 7, minute: 30 } },
    { pattern: '730p', expectation: { hour: 19, minute: 30 } },
    { pattern: '1200', expectation: { hour: 12, minute: 0 } }
  ];
  testStrings.forEach(({ pattern, expectation }) => {
    expect(PgEntry.parseTimeString(pattern)).toEqual(expectation);
  });
});

it('Sets entry date', () => {
  let start = moment('2017-07-07T04:00-04:00');
  let end = start.clone().add(2, 'h');
  let entry = PgEntry.from({ start, end });
  let newDate = moment('2017-07-06');
  expect(moment(PgEntry.setStartDate(entry, newDate).start).toISOString())
    .toEqual(moment('2017-07-06T04:00-04:00').toISOString());
  expect(moment(PgEntry.setEndDate(entry, newDate).end).toISOString())
    .toEqual(moment('2017-07-06T06:00-04:00').toISOString());
});