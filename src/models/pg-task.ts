import * as cuid from 'cuid';
import { Record } from 'immutable';

import { RecordType, RecordTypeConstructor } from './pg-types';

export interface PgTaskType {
  taskId: string;
  parentTaskId: string;
  jobId: string;
  duration: number;
};

let defaultTask: PgTaskType = {
  taskId: '',
  parentTaskId: '',
  jobId: '',
  duration: 0
};

// There is an error in the type definitnions for Immutable.Record,
// so temporarily disable 'no-any' until Immutable v4 is released.
// tslint:disable-next-line:no-any
export const PgTask: RecordTypeConstructor<PgTaskType> = Record(defaultTask, 'PgTask') as any;
export type PgTask = RecordType<PgTaskType>;

export function setParentTaskId(task: PgTask, parentTaskId: string): PgTask {
  return task.set('parentTaskId', parentTaskId);
}

export function createTask(): PgTask {
  return new PgTask({ taskId: cuid() });
}