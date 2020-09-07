/**
 * Modifiers include mutations, assuming will be used with immer library
 */

import cuid from 'cuid';

export interface PgTask {
  _id: string;
  parentId: string;
  duration: number | undefined;
  name: string;
  number: string;
  description: string;
}

const defaultTask: PgTask = {
  _id: '',
  parentId: '',
  duration: 0,
  name: '',
  number: '',
  description: '',
};

export function create(): PgTask {
  return Object.assign({}, defaultTask, { _id: cuid() });
}
export function from(props: Partial<PgTask>): PgTask {
  return Object.assign(create(), props);
}

export function setParent(task: PgTask, taskOrId: string | PgTask): PgTask {
  let taskId = typeof taskOrId === 'string' ? taskOrId : taskOrId.parentId;
  task.parentId = taskId;
  return task;
}

export function setName(task: PgTask, name: string): PgTask {
  task.name = name;
  return task;
}
