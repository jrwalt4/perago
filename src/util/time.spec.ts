import {
  parseTimeString
} from './time';
import moment from 'moment';

expect.extend({
  toContainTimestamp(this: jest.MatcherUtils, results: number[], expectation: number) {
    const possibleMoments = results.map(r => moment(r));
    const expectMoment = moment(expectation);
    const foundMoment = possibleMoments.find((mom) => mom.isSame(expectMoment));
    return {
      pass: foundMoment != null,
      message() {
        return `${expectMoment.format('hh:mm a')} is not contained in ` +
          `[${possibleMoments.map(m => m.format('hh:mm a')).join(', ')}]`;
      }
    };
  }
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainTimestamp(timestamp: number): R;
    }
  }
}

it('Should parse a string representation of date and/or time', () => {
  let testStrings = [
    {
      pattern: '1:30',
      expectation: [
        moment().startOf('day').set({ hour: 1, minute: 30 }).valueOf()
      ]
    },
    {
      pattern: '130',
      expectation: [
        moment().startOf('day').set({ hour: 1, minute: 30 }).valueOf()
      ]
    },
    {
      pattern: '13',
      expectation: [
        moment().startOf('day').set({ hour: 13, minute: 0 }).valueOf()
      ]
    },
    {
      pattern: '730',
      expectation: [
        moment().startOf('day').set({ hour: 7, minute: 30 }).valueOf()
      ]
    },
    {
      pattern: ' 7 : 30 ',
      expectation: [
        moment().startOf('day').set({ hour: 7, minute: 30 }).valueOf()
      ]
    },
    {
      pattern: '1200',
      expectation: [
        moment().startOf('day').set({ hour: 12, minute: 0 }).valueOf()
      ]
    }
  ];
  testStrings.forEach(({ pattern, expectation }) => {
    const matches = parseTimeString(pattern);
    expectation.forEach((timestamp) => {
      expect(matches).toContainTimestamp(timestamp);
    });
  });
});
