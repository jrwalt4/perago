import { PgModel, PgEntry } from '../models';
import { PgAction, setTaskName, setTaskJob, startTask } from '../actions';
import { PgModelState, initialModelState } from './initial-model';

export { PgModelState } from './initial-model';

export function modelReducer(
  model: PgModelState = initialModelState,
  action: PgAction): PgModelState {
  switch (action.type) {
    case setTaskName.type:
      return PgModel.setTaskName(model, action.payload._id, name) as PgModel;
    case setTaskJob.type:
      return PgModel.setTaskProject(model, action.payload._id, action.payload.jobId) as PgModel;
    case startTask.type:
      let newEntry = PgEntry.from({ taskId: action.payload, start: new Date() });
      return PgModel.addEntry(model, newEntry);
    default:
      return model;
  }
}