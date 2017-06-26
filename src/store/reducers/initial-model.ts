import { PgModel } from '../models';

export type PgModelState = PgModel;

export const initialModelState: PgModelState = PgModel.from({
  entries: [
    {
      taskId: '1',
      _id: '2',
      start: new Date('2017-6-22 6:00'),
      end: new Date('2017-6-22 8:00'),
      notes: 'Talked to Jim'
    },
    {
      taskId: '1',
      _id: '3',
      start: new Date('2017-6-22 8:00'),
      end: new Date('2017-6-22 10:00')
    },
    {
      taskId: '5',
      _id: '4',
      start: new Date('2017-6-22 10:00'),
      end: new Date('2017-6-22 12:00')
    }
  ],
  tasks: [
    {
      _id: '1',
      name: 'Task 1'
    },
    {
      _id: '5',
      name: 'Task 2'
    }
  ]
});
