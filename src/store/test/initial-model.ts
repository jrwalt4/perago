import { PgModel } from 'store/models';

export type PgModelState = PgModel;

export const initialModel: PgModelState = PgModel.from({
  entries: [
    {
      taskId: '1',
      _id: '2',
      start: new Date('2017-06-22T06:00').getTime(),
      end: new Date('2017-06-22T08:00').getTime(),
      notes: 'Talked to Jim'
    },
    {
      taskId: '1',
      _id: '3',
      start: new Date('2017-06-22T08:00').getTime(),
      end: new Date('2017-06-22T10:00').getTime()
    },
    {
      taskId: '5',
      _id: '4',
      start: new Date('2017-06-22T10:00').getTime(),
      end: new Date('2017-06-22T12:00').getTime()
    }
  ],
  tasks: [
    {
      _id: '1',
      name: 'Task 1',
      parentId: '10'
    },
    {
      _id: '5',
      name: 'Task 2',
      parentId: '11'
    }
  ],
  projects: [
    {
      _id: '10',
      name: 'Do Something'
    },
    {
      _id: '11',
      name: 'Do Something Else'
    }
  ]
});
