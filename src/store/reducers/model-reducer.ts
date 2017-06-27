import { PgModel } from '../models';
import { PgAction, setTaskName, setTaskJob } from '../actions';
import { PgModelState, initialModelState } from './initial-model';

export { PgModelState } from './initial-model';

export function modelReducer(
  model: PgModelState = initialModelState,
  action: PgAction): PgModelState {
  switch (action.type) {
    case setTaskName.Type:
      return PgModel.setTaskName(model, action.payload._id, name) as PgModel;
    case setTaskJob.Type:
      return PgModel.setTaskProject(model, action.payload._id, action.payload.jobId) as PgModel;
    default:
      return model;
  }
}