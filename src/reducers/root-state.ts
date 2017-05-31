import { PgModel } from '../models/pg-model';

export interface RootState {
  model: PgModel;
  view: {
    selectedTask: string | null
    selectedJob: string | null
  };
}

export const initialState: RootState = {
  model: PgModel.from({
    entries: [
      {
        taskId: '1',
        _id: '2',
        start: new Date,
        end: new Date
      },
      {
        taskId: '1',
        _id: '3',
        start: new Date,
        end: new Date
      },
      {
        taskId: '1',
        _id: '4',
        start: new Date,
        end: new Date
      }
    ],
    tasks: [
      {
        _id: '1',
        name: 'nothing'
      }
    ]
  }),
  view: {
    selectedTask: null,
    selectedJob: null
  }
};