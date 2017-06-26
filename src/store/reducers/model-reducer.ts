import { PgModel } from '../models';
import { PgAction, setTaskName, setTaskJob } from '../actions';
import { PgModelState, initialModelState } from './initial-model';

export { PgModelState } from './initial-model';

export function modelReducer(
  state: PgModelState = initialModelState,
  action: PgAction): PgModelState {
  switch (action.type) {
    case setTaskName.Type:
      return state.setIn(
        ['tasks', action.payload._id, 'name'], 
        name) as PgModel;
    case setTaskJob.Type:
      return state.setIn(
        ['tasks', action.payload._id, 'project'],
        action.payload.jobId) as PgModel;
    default:
      return state;
  }
}