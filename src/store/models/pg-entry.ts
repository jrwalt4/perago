import * as cuid from 'cuid';
import { Record } from 'immutable';

import * as moment from 'moment';

import { RecordType, RecordTypeConstructor, PgBase } from './pg-types';

export interface PgEntry extends PgBase {
  taskId: string;
  notes: string;
  start: Date | undefined;
  end: Date | undefined;
}

export const defaultEntry: PgEntry = {
  _id: '',
  taskId: '',
  notes: '',
  start: void 0,
  end: void 0
};

// There is an error in the type definitnions for Immutable.Record,
// so temporarily disable 'no-any' until Immutable v4 is released.
// tslint:disable-next-line:no-any
const PgEntryConstructor: RecordTypeConstructor<PgEntry> = Record(defaultEntry, 'PgEntry') as any;
export type PgEntryRecord = RecordType<PgEntry>;

export namespace PgEntry {

  export function create(startNow?: boolean): PgEntry {
    return new PgEntryConstructor({ _id: cuid(), start: startNow ? new Date() : void 0 });
  }

  export function from(pgEntry: PgEntryRecord): PgEntryRecord;
  export function from(props: Partial<PgEntry>): PgEntry;
  export function from(propsOrEntry: PgEntryRecord | Partial<PgEntry>) {
    let _id = propsOrEntry._id || cuid();
    return new PgEntryConstructor({ _id, ...propsOrEntry });
  }

  export function setStart(entry: PgEntry, newStart: Date): PgEntry {
    return (PgEntry.from(entry) as PgEntryRecord).set('start', newStart);
  }

  // const dateExp = /(\d{1,2})?[\\/-\s]+(\d{1,2})?[\\/-\s]+(\d{1,2})?/;

  export function parseDateString(dateString: string): Date {
    // new Date(dateString.replace(dateExp, '$1/$2/$3')));
    throw new Error('PgEntry.parseDateString() not implemented yet');
  }

  const timeExp = /([\d]{1,4})(:)?([\d]{1,2})?\s*(a|p)?m?/;

  export function parseTimeString(timeString: string, prevDate?: Date): Date {
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
      return moment({
        hour,
        minute
      }).toDate();
    } else {
      return new Date();
    }
  }
}