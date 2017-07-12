import { PgModel, PgEntry } from '../models';
import {
  PgAction,
  setTaskName, setTaskJob, startTask, setEntryStartTime, setEntryEndTime, setEntryDate
} from '../actions';
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
      let stoppedModel = PgModel.stopAllEntries(model);
      let newEntry = PgEntry.from({ taskId: action.payload, start: new Date() });
      return PgModel.addEntry(stoppedModel, newEntry);
    case setEntryStartTime.type: {
      let { _id, hour, minute } = action.payload;
      return PgModel.setEntryStartTime(model, _id, hour, minute);
    }
    case setEntryEndTime.type: {
      let { _id, hour, minute } = action.payload;
      return PgModel.setEntryEndTime(model, _id, hour, minute);
    }
    case setEntryDate.type: {
      return PgModel.setEntryDate(model, action.payload._id, action.payload.date);
    }
    default:
      return model;
  }
}