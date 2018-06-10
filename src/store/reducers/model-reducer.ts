import { PgModel, PgEntry, PgTask } from 'store/models';
import { PgModelRecord } from 'store/models/pg-model';
import * as actions from 'store/actions';

export type PgModelState = PgModel;

export function modelReducer(
  model: PgModelRecord = PgModel.create(),
  action: actions.PgAction): PgModelState {
  switch (action.type) {
    case actions.loadModelSuccess.type:
      return PgModel.from(action.payload);
    case actions.createEntry.type:
      return PgModel.addEntry(PgModel.stopAllEntries(model), PgEntry.from(action.payload));
    case actions.deleteEntry.type:
      return PgModel.deleteEntry(model, action.payload);
    case actions.createTask.type:
      return PgModel.addTask(model, PgTask.from(action.payload));
    case actions.setTaskName.type:
      return PgModel.setTaskName(model, action.payload._id, name);
    case actions.setTaskJob.type:
      return PgModel.setTaskParent(model, action.payload._id, action.payload.jobId);
    case actions.startTask.type:
      let stoppedModel = PgModel.stopAllEntries(model);
      let newEntry = PgEntry.createAndStart().set('taskId', action.payload);
      return PgModel.addEntry(stoppedModel, newEntry);
    case actions.setEntryTask.type:
      return PgModel.setEntryTask(model, action.payload._id, action.payload.taskId);
    case actions.setEntryStartTime.type: {
      let { _id, hour, minute } = action.payload;
      return PgModel.setEntryStartTime(model, _id, hour, minute);
    }
    case actions.setEntryEndTime.type: {
      let { _id, hour, minute } = action.payload;
      return PgModel.setEntryEndTime(model, _id, hour, minute);
    }
    case actions.setEntryDate.type: {
      return PgModel.setEntryDate(model, action.payload._id, action.payload.date);
    }
    default:
      return model;
  }
}