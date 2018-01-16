import { PgModel, PgEntry, PgTask } from 'store/models';
import { PgModelRecord } from 'store/models/pg-model';
import {
  PgAction, createEntry, deleteEntry, createTask, setEntryTask,
  setTaskName, setTaskJob, startTask, setEntryStartTime, setEntryEndTime, setEntryDate
} from 'store/actions';
import { PgModelState, initialModelState } from './initial-model';

export { PgModelState } from './initial-model';

export function modelReducer(
  model: PgModelRecord = initialModelState as PgModelRecord,
  action: PgAction): PgModelState {
  switch (action.type) {
    case createEntry.type:
      return PgModel.addEntry(PgModel.stopAllEntries(model), PgEntry.from(action.payload));
    case deleteEntry.type:
      return PgModel.deleteEntry(model, action.payload);
    case createTask.type:
      return PgModel.addTask(model, PgTask.from(action.payload));
    case setTaskName.type:
      return PgModel.setTaskName(model as PgModelRecord, action.payload._id, name);
    case setTaskJob.type:
      return PgModel.setTaskParent(model as PgModelRecord, action.payload._id, action.payload.jobId);
    case startTask.type:
      let stoppedModel = PgModel.stopAllEntries(model as PgModelRecord);
      let newEntry = PgEntry.createAndStart().set('taskId', action.payload);
      return PgModel.addEntry(stoppedModel, newEntry);
    case setEntryTask.type:
      return PgModel.setEntryTask(model, action.payload._id, action.payload.taskId);
    case setEntryStartTime.type: {
      let { _id, hour, minute } = action.payload;
      return PgModel.setEntryStartTime(model as PgModelRecord, _id, hour, minute);
    }
    case setEntryEndTime.type: {
      let { _id, hour, minute } = action.payload;
      return PgModel.setEntryEndTime(model as PgModelRecord, _id, hour, minute);
    }
    case setEntryDate.type: {
      return PgModel.setEntryDate(model as PgModelRecord, action.payload._id, action.payload.date);
    }
    default:
      return model;
  }
}