import * as moment from 'moment';

export function getFullDate(timestamp: number): number {
  return moment(timestamp).startOf('day').valueOf();
}

// const dateExp = /(\d{1,2})?[\\/-\s]+(\d{1,2})?[\\/-\s]+(\d{1,2})?/;

export function parseDateString(dateString: string): Date {
  // new Date(dateString.replace(dateExp, '$1/$2/$3')));
  throw new Error('PgEntry.parseDateString() not implemented yet');
}

/**
 * parse a string representing time and return a set of possible autocomplete matches as UNIX timestamps.
 * @param {string} timeString  string input to parse for possible time matches
 * @param {number} [seed]  UNIX timestamp to use as the basis for year, month, and date of the return values
 * @returns {number[]} array of possible timestamps that match the input string
 */
export function parseTimeString(timeString: string, seed?: number): number[] {

  const nullReturn: number[] = [];

  // capture time with or without colon (e.g. '1', '11:00', '1:00', '100', '130', etc.)
  const regExResult = (/\s*(\d{0,2})(\s*:?\s*)(\d{0,2})/).exec(timeString);
  if (null == regExResult) {
    return nullReturn;
  }

  const [fullMatch, hourInput, delimited, minuteInput] = regExResult;

  const matches: [number, number][] = [];

  if (!!delimited) {
    // time was input with colon delimiter, representing hh:mm
    matches.push(
      [parse(hourInput), parse(minuteInput)]
    );
  } else {
    // time was input without colon delimiter
    switch (fullMatch.length) {
      case 1:
        // input is in the form `h`
        matches.push(
          [parse(hourInput), 0]
        );
        break;
      case 2:
        matches.push(
          // input could be in the form `hh`
          [parse(hourInput), 0],
          // input could be in the form `h:m`
          [parse(fullMatch[0]), parse(fullMatch[1])],
          // input could be in the form `h:m0`
          [parse(fullMatch[0]), parse(fullMatch[1] + '0')]
        );
        break;
      case 3:
        matches.push(
          // input could be in the form h:mm
          [parse(fullMatch[0]), parse(fullMatch.slice(1, 3))],
          // input could be in the form hh:0m
          [parse(hourInput), parse(minuteInput)],
          // input could be ommiting trailing '0' (i.e. hh:m0)
          [parse(hourInput), parse(minuteInput + '0')]
        );
        break;
      case 4:
        // input represents hh:mm
        matches.push(
          [parse(hourInput), parse(minuteInput)]
        );
        break;
      default:
        // time cannot be longer than 4 characters
        return nullReturn;
    }
  }
  return matches
    // turn hour/minute combonations into timestamps using provided seed
    .map(([hour, minute]) => buildTimeStamp(hour, minute, seed))
    // remove invalide timestamps (i.e. 34 o'clock)
    .filter((timestamp) => !Number.isNaN(timestamp))
    // remove duplicates (algorithm taken from 
    // gomakethings.com/removing-duplicates-from-an-array-with-vanilla-javascript/)
    .filter((timestamp, index, array) => array.indexOf(timestamp) >= index);
}

/**
 * Shorthand for Number.parseInt
 * @param {string} n 
 */
function parse(n: string): number {
  return Number.parseInt(n);
}

function buildTimeStamp(hour: number, minute: number, seed?: number): number {
  return moment(seed).startOf('day').set({ hour, minute }).valueOf();
}
