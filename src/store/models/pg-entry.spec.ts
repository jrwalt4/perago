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
  let newStart = new Date();
  let e = PgEntry.from({ start: newStart });
  expect(e.start).toEqual(newStart);
});

it('Should parse a string representation of date and/or time', () => {
  let testStrings = [
    { pattern: '1:30', expectation: moment({ hour: 13, minutes: 30 }).toDate() },
    { pattern: '130', expectation: moment({ hour: 13, minutes: 30 }).toDate() },
    { pattern: '130a', expectation: moment({ hour: 1, minutes: 30 }).toDate() },
    { pattern: '13', expectation: moment({ hour: 13 }).toDate() },
    { pattern: '730', expectation: moment({ hour: 7, minutes: 30 }).toDate() },
    { pattern: '730p', expectation: moment({ hour: 19, minutes: 30 }).toDate() },
    { pattern: '1200', expectation: moment({ hour: 12 }).toDate() }
  ];
  testStrings.forEach(({ pattern, expectation }) => {
    expect(PgEntry.parseTimeString(pattern).getTime()).toEqual(expectation.getTime());
  });
});