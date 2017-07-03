import * as cuid from 'cuid';
import { Record } from 'immutable';

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

  const dateStringExp = /(\d{1,2})?[\\/-\s]+(\d{1,2})?[\\/-\s]+(\d{1,2})?/;
  const timeStringExp = /([\d]{1,4}):?([\d]{1,2})?\s*(a|p)?m?/;

  export function parseDateTimeString(dateTimeString: string, prevDate?: Date): string {
    let dateMatch = dateStringExp.exec(dateTimeString);
    let timeMatch = timeStringExp.exec(dateTimeString.replace(dateStringExp,''));
    /*
    return new Date(dateTimeString.replace(
      dateTimeStringExp,
      (match, dateMatch: string, timeMatch: string, meridianMatch: string) => {
        const time:string = timeMatch.replace(
          timeStringExp,
          (match, hourMatch, minuteMatch) => {
            return (hourMatch || '00') + ':' + (minuteMatch || '00');
          });
        let date: string;
        if (dateMatch) {
          date = dateMatch;
        } else {
          prevDate = prevDate || new Date();
          date = [prevDate.getFullYear(), prevDate.getMonth() + 1, prevDate.getDate() +1].join('/');
        }
        return date + ' ' + time;
      }))
      //*/
  }
  window['parseDateTimeString'] = parseDateTimeString;
}