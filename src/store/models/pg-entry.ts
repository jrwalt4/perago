/**
 * Modifiers include mutations, assuming will be used with immer library
 */

import * as cuid from 'cuid';
import * as moment from 'moment';

import { isValidDateTime, mergeDateAndTime } from 'util/time';

export interface PgEntry {
  _id: string;
  taskId: string;
  notes: string;
  start: number; // timestamp
  end: number | undefined;  // timestamp
}

export function create(): PgEntry {
  return {
    _id: cuid(),
    taskId: '',
    notes: '',
    start: 0,
    end: void 0
  };
}

export function createAndStart(): PgEntry {
  const temp = create();
  temp.start = Date.now();
  return temp;
}

export function from(props: Partial<PgEntry>): PgEntry {
  return Object.assign(create(), props);
}

export function setStart(entry: PgEntry, newStart: number): PgEntry {
  if (isValidDateTime(newStart)) {
    entry.start = newStart;
    return entry;
  }
  throw new TypeError('Not valid PgEntry#start type: ' + newStart);
}

export function setEnd(entry: PgEntry, newEnd: number): PgEntry {
  if (isValidDateTime(newEnd)) {
    entry.end = newEnd;
    return entry;
  }
  throw new TypeError('Not valid PgEntry#end type: ' + newEnd);
}

export function clearEnd(entry: PgEntry): PgEntry {
  entry.end = void 0;
  return entry;
}

export function setStartDate(entry: PgEntry, startDate: moment.MomentInput): PgEntry {
  entry.start = mergeDateAndTime(startDate, entry.start);
  return entry;
}

export function setEndDate(entry: PgEntry, endDate: moment.MomentInput): PgEntry {
  if (entry.end) {
    // only set the end date if it already has one
    entry.end = mergeDateAndTime(endDate, entry.end);
  }
  // otherwise return the entry with an empty end date
  return entry;
}

export function setStartTime(entry: PgEntry, hour: number, minute: number = 0): PgEntry {
  let entryStart = new Date(entry.start);
  let newStart = moment({
    year: entryStart.getFullYear(),
    month: entryStart.getMonth(),
    date: entryStart.getDate(),
    hour,
    minute
  }).valueOf();
  entry.start = newStart;
  return entry;
}

export function setEndTime(entry: PgEntry, hour: number, minute: number = 0): PgEntry {
  let entryEnd = entry.end ? new Date(entry.end) : new Date();
  let newEnd = moment({
    year: entryEnd.getFullYear(),
    month: entryEnd.getMonth(),
    date: entryEnd.getDate(),
    hour,
    minute
  }).valueOf();
  entry.end = newEnd;
  return entry;
}

export function setDate(entry: PgEntry, newDate: moment.MomentInput): PgEntry {
  setStartDate(entry, newDate);
  if (entry.end) {
    setEndDate(entry, newDate);
  }
  return entry;
}

export function setTask(entry: PgEntry, taskId: string): PgEntry {
  entry.taskId = taskId;
  return entry;
}

export function getDuration({ start, end }: PgEntry): number {
  return (typeof end === 'undefined' ? Date.now() : end) - start;
}
