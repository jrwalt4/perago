import * as cuid from 'cuid';
import { Record } from 'immutable';

import { RecordType, RecordTypeConstructor, PgBase } from './pg-types';

export interface PgEntry extends PgBase {
  taskId: string;
  notes: string;
  start: Date;
  end: Date;
}

export const defaultEntry: PgEntry = {
  _id: '',
  taskId: '',
  notes: '',
  start: new Date(),
  end: new Date()
};

// There is an error in the type definitnions for Immutable.Record,
// so temporarily disable 'no-any' until Immutable v4 is released.
// tslint:disable-next-line:no-any
const PgEntryConstructor: RecordTypeConstructor<PgEntry> = Record(defaultEntry, 'PgEntry') as any;
export type PgEntryRecord = RecordType<PgEntry>;

export namespace PgEntry {

  export function create(): PgEntry {
    return new PgEntryConstructor({ _id: cuid() });
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
}