import {
  parseTimeString
} from './time';

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
    expect(parseTimeString(pattern)).toEqual(expectation);
  });
});