import { Action } from 'redux';

import { PgModel } from '../models';
import * as actions from '../actions';
import { PgModelState, initialModelState } from './initial-model';

export { PgModelState } from './initial-model';

export function modelReducer(
  state: PgModelState = initialModelState,
  action: Action): PgModelState {
  switch (action.type) {
    case actions.SetTaskName: {
      let { _id, name } = (action as actions.SetTaskName).payload;
      return state.setIn(['tasks', _id, 'name'], name) as PgModel;
    }
    case actions.SetTaskProject: {
      let { _id, projectId } = (action as actions.SetTaskProject).payload;
      return state.setIn(['tasks', _id, 'project'], projectId) as PgModel;
    }
    default:
      return state;
  }
}