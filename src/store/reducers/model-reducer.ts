import { createReducer } from '@reduxjs/toolkit';

import * as PgEntry from 'store/models/pg-entry';
import * as PgTask from 'store/models/pg-task';
import * as PgModel from 'store/models/pg-model';
import * as actions from 'store/actions';

export type PgModelState = PgModel.PgModel;

export const modelReducer = createReducer<PgModelState>(PgModel.create(), {
    [actions.loadModelSuccess.type]: (model, action: actions.loadModelSuccess) => {
      return PgModel.from(action.payload);
    },
    [actions.createEntrySuccess.type]: (model, action) => {
      return PgModel.addEntry(PgModel.stopAllEntries(model), PgEntry.from(action.payload));
    },
    [actions.deleteEntry.type]: (model, action) => {
      return PgModel.deleteEntry(model, action.payload);
    },
    [actions.createTask.type]: (model, action) => {
      return PgModel.addTask(model, PgTask.from(action.payload));
    },
    [actions.setTaskName.type]: (model, action: actions.setTaskName) => {
      const task = action.payload;
      return PgModel.setTaskName(model, task._id, task.name);
    },
    [actions.setTaskJob.type]: (model, action) => {
      return PgModel.setTaskParent(model, action.payload._id, action.payload.jobId);
    },
    [actions.startTask.type]: (model, action: actions.startTask) => {
      let stoppedModel = PgModel.stopAllEntries(model);
      let newEntry = PgEntry.setTask(PgEntry.createAndStart(), action.payload);
      return PgModel.addEntry(stoppedModel, newEntry);
    },
    [actions.setEntryTask.type]: (model: PgModelState, action: actions.setEntryTask) => {
      const args = action.payload;
      return PgModel.setEntryTask(model, args._id, args.taskId);
    },
    [actions.setEntryStartTime.type]: (model, action: actions.setEntryStartTime) => {
      let { _id, hour, minute } = action.payload;
      return PgModel.setEntryStartTime(model, _id, hour, minute);
    },
    [actions.setEntryEndTime.type]: (model, action: actions.setEntryEndTime) => {
      let { _id, hour, minute } = action.payload;
      return PgModel.setEntryEndTime(model, _id, hour, minute);
    },
    [actions.setEntryDate.type]: (model, action) => {
      PgModel.setEntryDate(model, action.payload._id, action.payload.date);
    }
});
