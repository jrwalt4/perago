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
  }

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

  export function setDate(entry: PgEntryRecord, newDate: moment.MomentInput): PgEntryRecord {
    let mutableEntry = entry.asMutable();
    return setStartDate(setEndDate(mutableEntry, newDate), newDate).asImmutable();
  }

  export function setTask(entry: PgEntryRecord, taskId: string): PgEntryRecord {
    return entry.set('taskId', taskId);
  }

  export function getDuration({ start, end }: PgEntry): number {
    return (typeof end === 'undefined' ? Date.now() : end) - start;
  }

}
