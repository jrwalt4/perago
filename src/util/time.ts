import * as moment from 'moment';

export function getFullDate(timestamp: number): number {
  return moment(timestamp).startOf('day').valueOf();
}

// const dateExp = /(\d{1,2})?[\\/-\s]+(\d{1,2})?[\\/-\s]+(\d{1,2})?/;

export function parseDateString(dateString: string): Date {
  // new Date(dateString.replace(dateExp, '$1/$2/$3')));
  throw new Error('PgEntry.parseDateString() not implemented yet');
}

const timeExp = /([\d]{1,4})(:)?([\d]{1,2})?\s*(a|p)?m?/;

export function parseTimeString(timeString: string): { hour: number, minute: number } {
  let execArray = timeExp.exec(timeString);
  if (execArray) {
    const [, hr, div, mn, mer] = execArray;
    var hour = 0, minute = 0, meridian;
    if (div) {
      hour = Number.parseInt(hr);
      minute = Number.parseInt(mn) || 0;
    } else {
      switch (hr.length) {
        case 1:
        case 2:
          hour = Number.parseInt(hr);
          break;
        case 3:
          hour = Number.parseInt(hr.substr(0, 1));
          minute = Number.parseInt(hr.substr(1, 2));
          break;
        case 4:
          hour = Number.parseInt(hr.substr(0, 2));
          minute = Number.parseInt(hr.substr(2, 2));
          break;
        default:
          hour = 0;
          minute = 0;
      }
    }
    if (!mer) {
      if (hour >= 7 && hour < 12) {
        meridian = 'a';
      } else {
        meridian = 'p';
      }
    } else {
      meridian = mer;
    }
    if (meridian === 'p' && hour < 12) {
      hour += 12;
    }
    return { hour, minute };
  } else {
    throw new Error('Could not parse string: ' + timeString);
  }
}
