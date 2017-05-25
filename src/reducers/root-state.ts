import { PgModel, defaultModel } from '../models/pg-model';

export interface RootState {
  model: PgModel;
  view: {
    selectedTask: string | null
    selectedJob: string | null
  };
}

export const initialState: RootState = {
  model: defaultModel,
  view: {
    selectedTask: null,
    selectedJob: null
  }
};