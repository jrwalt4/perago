import { Record } from 'immutable';

export { PgEntry } from './pg-entry';
export { PgModel } from './pg-model';
export { PgTask } from './pg-task';
export { PgProject } from './pg-project';
export * from './pg-types';

import { PgEntry } from './pg-entry';
import { PgTask } from './pg-task';
import { PgProject } from './pg-project';
import { RecordType } from './pg-types';

export type PgObject = PgEntry | PgTask | PgProject;
export type PgObjectRecord = RecordType<PgObject>;

export function isRecord<T = {}>(maybeObject: {}): maybeObject is RecordType<T> {
  return maybeObject instanceof Record;
}
