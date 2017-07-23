import * as cuid from 'cuid';
import { Record } from 'immutable';

import * as moment from 'moment';

import { RecordType, RecordTypeConstructor, PgBase } from './pg-types';

export interface PgEntry extends PgBase {
  taskId: string;
  notes: string;
  start: number; // timestamp
  end: number | undefined;  // timestamp
}

export const defaultEntry: PgEntry = {
  _id: '',
  taskId: '',
  notes: '',
  start: 0,
  end: void 0
};

// There is an error in the type definitnions for Immutable.Record,
// so temporarily disable 'no-any' until Immutable v4 is released.
// tslint:disable-next-line:no-any
const PgEntryConstructor: RecordTypeConstructor<PgEntry> = Record(defaultEntry, 'PgEntry') as any;
export type PgEntryRecord = RecordType<PgEntry>;

export namespace PgEntry {

  export function create(): PgEntryRecord {
    return new PgEntryConstructor({
      _id: cuid()
    });
  }

  export function createAndStart(): PgEntryRecord {
    return new PgEntryConstructor({
      _id: cuid(),
      start: Date.now()
    });
  }

  // Same as PgEntry, but allows for MomentInputs to be used in PgEntry.from constructor
  interface PgEntryAlternates extends PgBase {
    taskId: string;
    start: moment.MomentInput;
    end: moment.MomentInput;
    notes: string;
  };

  export function from(props: Partial<PgEntry> | Partial<PgEntryAlternates>): PgEntryRecord {
    let _id = props._id || cuid();
    let start: number = typeof props.start === 'number' ? props.start : moment(props.start).valueOf();
    let end: number | undefined = props.end === void 0 ? void 0 : (
      typeof props.end === 'number' ? props.end : moment(props.end).valueOf()
    );
    return new PgEntryConstructor(Object.assign({}, props, { _id, start, end }));
  }

  export function formatDateTimeString(date: moment.MomentInput): string {
    return date ? moment(date).toISOString() : '';
  }

  export function isValidDateTime(dateTime: moment.MomentInput): boolean {
    return Boolean(dateTime) && moment(dateTime).isValid();
  }

  export function setStart(entry: PgEntryRecord, newStart: number): PgEntryRecord {
    if (isValidDateTime(newStart)) {
      return entry.set('start', newStart);
    }
    throw new TypeError('Not valid PgEntry#start type: ' + newStart);
  }

  export function setEnd(entry: PgEntryRecord, newEnd: number): PgEntryRecord {
    if (isValidDateTime(newEnd)) {
      return entry.set('end', newEnd);
    }
    throw new TypeError('Not valid PgEntry#end type: ' + newEnd);
  }

  export function clearEnd(entry: PgEntryRecord): PgEntryRecord {
    return entry.set('end', void 0);
  }

  const millisecondsInDay = 86400000; // 24 * 60 * 60 * 1000

  export function mergeDateAndTime(date: moment.MomentInput, time: moment.MomentInput): number {
    let dateValue = moment(date).valueOf();
    let timeValue = moment(time).valueOf();
    return dateValue - dateValue % millisecondsInDay + timeValue % millisecondsInDay;
  }

  export function setStartDate(entry: PgEntryRecord, startDate: moment.MomentInput): PgEntryRecord {
    return entry.set('start', mergeDateAndTime(startDate, entry.start));
  }

  export function setEndDate(entry: PgEntryRecord, endDate: moment.MomentInput): PgEntryRecord {
    if (entry.end) {
      // only set the end date if it already has one
      return entry.set('end', mergeDateAndTime(endDate, entry.end));
    }
    // otherwise return the entry with an empty end date
    return entry;
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
}