import { PgModel, PgEntry, PgTask } from 'store/models';
import { PgModelRecord } from 'store/models/pg-model';
import {
  PgAction, loadModelSuccess, createEntry, deleteEntry, createTask, setEntryTask,
  setTaskName, setTaskJob, startTask, setEntryStartTime, setEntryEndTime, setEntryDate
} from 'store/actions';

export type PgModelState = PgModel;

export function modelReducer(
  model: PgModelRecord = PgModel.create(),
  action: PgAction): PgModelState {
  switch (action.type) {
    case loadModelSuccess.type:
      return PgModel.from(action.payload);
    case createEntry.type:
      return PgModel.addEntry(PgModel.stopAllEntries(model), PgEntry.from(action.payload));
    case deleteEntry.type:
      return PgModel.deleteEntry(model, action.payload);
    case createTask.type:
      return PgModel.addTask(model, PgTask.from(action.payload));
    case setTaskName.type:
      return PgModel.setTaskName(model, action.payload._id, name);
    case setTaskJob.type:
      return PgModel.setTaskParent(model, action.payload._id, action.payload.jobId);
    case startTask.type:
      let stoppedModel = PgModel.stopAllEntries(model);
      let newEntry = PgEntry.createAndStart().set('taskId', action.payload);
      return PgModel.addEntry(stoppedModel, newEntry);
    case setEntryTask.type:
      return PgModel.setEntryTask(model, action.payload._id, action.payload.taskId);
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