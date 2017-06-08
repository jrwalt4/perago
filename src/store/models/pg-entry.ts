import * as cuid from 'cuid';
import { Record } from 'immutable';

import { RecordType, RecordTypeConstructor, PgBase } from './pg-types';

export interface PgEntryBase extends PgBase {
  taskId: string;
  name: string;
  start: Date;
  end: Date;
}

export const defaultEntry: PgEntryBase = {
  _id: '',
  taskId: '',
  name: '',
  start: new Date(),
  end: new Date()
};

// There is an error in the type definitnions for Immutable.Record,
// so temporarily disable 'no-any' until Immutable v4 is released.
// tslint:disable-next-line:no-any
const PgEntryConstructor: RecordTypeConstructor<PgEntryBase> = Record(defaultEntry, 'PgEntry') as any;
export type PgEntry = RecordType<PgEntryBase>;

export namespace PgEntry {

  export function create(): PgEntry {
    return new PgEntryConstructor({ _id: cuid() });
  }

  export function from(props: Partial<PgEntryBase>): PgEntry {
    props._id = props._id || cuid();
    return new PgEntryConstructor(props);
  }

  export function setStart(entry: PgEntry, newStart: Date): PgEntry {
    return entry.set('start', newStart);
  }
}