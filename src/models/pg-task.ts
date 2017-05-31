import * as cuid from 'cuid';
import { Record } from 'immutable';

import { RecordType, RecordTypeConstructor, PgBase } from './pg-types';

export interface PgTaskBase extends PgBase {
  parentTaskId: string;
  jobId: string;
  duration: number;
  name: string;
};

const defaultTask: PgTaskBase = {
  _id: '',
  parentTaskId: '',
  jobId: '',
  duration: 0,
  name: ''
};

// There is an error in the type definitnions for Immutable.Record,
// so temporarily disable 'no-any' until Immutable v4 is released.
// tslint:disable-next-line:no-any
const PgTaskConstructor: RecordTypeConstructor<PgTaskBase> = Record(defaultTask, 'PgTask') as any;
export type PgTask = RecordType<PgTaskBase>;

export namespace PgTask {
  export function create() {
    return new PgTaskConstructor({ _id: cuid() });
  }
  export function from(props: Partial<PgTaskBase>): PgTask {
    props._id = props._id || cuid();
    return PgTaskConstructor(props);
  }

  export function setParent(task: PgTask, parentTaskId: string): PgTask;
  export function setParent(task: PgTask, parentTask: PgTask): PgTask;
  export function setParent(task: PgTask, taskOrId: string | PgTask): PgTask {
    return task.set('parentTaskId', typeof taskOrId === 'string' ? taskOrId : taskOrId.parentTaskId);
  }
}