import * as cuid from 'cuid';
import { Record } from 'immutable';

import { RecordType, RecordTypeConstructor } from './pg-types';

export interface PgEntryType {
  entryId: string;
  taskId: string;
  start: Date;
  end: Date;
}

export const defaultEntry: PgEntryType = {
  entryId: '',
  taskId: '',
  start: new Date(),
  end: new Date()
};

// There is an error in the type definitnions for Immutable.Record,
// so temporarily disable 'no-any' until Immutable v4 is released.
// tslint:disable-next-line:no-any
export const PgEntry: RecordTypeConstructor<PgEntryType> = Record(defaultEntry, 'PgEntry') as any;
export type PgEntry = RecordType<PgEntryType>;

export function createEntry(props?: Partial<PgEntryType>): PgEntry {
  return new PgEntry({ entryId: cuid(), ...props });
}

export function setStart(entry: PgEntry, newStart: Date): PgEntry {
  return entry.set('start', newStart);
}