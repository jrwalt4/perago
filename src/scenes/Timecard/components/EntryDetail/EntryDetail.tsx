import * as React from 'react';
import { connect } from 'react-redux';
import { Options, Option } from 'react-select';
import * as moment from 'moment';

import { PgAppState } from 'store';
import {
  toggleEditing,
  setEntryTask,
  setEntryStartTime,
  setEntryEndTime,
  setEntryDate
} from 'store/actions';
import { PgEntry, PgTask } from 'store/models';
import { parseTimeString } from 'util/time';
import { DateField } from 'components/DateField';
import { TimeField } from 'components/TimeField';
import { TaskField } from 'components/TaskField';
import { DurationField } from 'components/DurationField';
import { NewTask } from 'scenes/Timecard/components/NewTask';

import './EntryDetail.css';
import { ConnectedProjectField } from 'components/ProjectField';

type EntryDetailStateProps = {
  entry: PgEntry
  selectableTasks: Options
  isEditing: boolean
};

type EntryDetailDispatchProps = {
  onToggleEditing: React.MouseEventHandler<HTMLButtonElement>
  setTask: (entry: string, task: string) => void
  onSetStart?: React.FormEventHandler<HTMLInputElement>
  onSetEnd?: React.FormEventHandler<HTMLInputElement>
  onSetDate?: (entryId: string, value: moment.MomentInput) => void
};

export type EntryDetailProps = EntryDetailStateProps & EntryDetailDispatchProps;

interface EntryDetailState {
  isNewTaskDialogOpen: boolean;
  newTaskName?: string;
}

export class EntryDetailComponent extends React.Component<EntryDetailProps, EntryDetailState> {
  constructor(props: EntryDetailProps) {
    super(props);
    this.state = {
      isNewTaskDialogOpen: false,
      newTaskName: ''
    };
  }

  openNewTaskDialog = (taskName?: string) => {
    this.setState({
      isNewTaskDialogOpen: true,
      newTaskName: taskName
    });
  }

  closeNewTaskDialog = () => {
    this.setState({
      isNewTaskDialogOpen: false
    });
  }

  handleDateChange = (newDate: moment.Moment) => {
    if (this.props.onSetDate) {
      this.props.onSetDate(this.props.entry._id, newDate);
    }
  }

  render() {
    const props = this.props;
    const header = (
      <div className="row">
        <div className="col-9">
          <h4>Entry Details</h4>
        </div>
        <div className="col-3">
          <button className={'btn btn-sm fa ' + (props.isEditing ? 'btn-success fa-check-square' : 'btn-info fa-edit')}
            onClick={props.onToggleEditing} />
        </div>
      </div>
    );
    let body: JSX.Element;
    if (props.entry) {
      let entry = props.entry;
      body = (
        <table className="EntryDetail table table-sm table-bordered">
          <tbody>
            <tr>
              <th>Job:</th><td><ConnectedProjectField taskId={entry.taskId} /></td>
            </tr>
            <tr>
              <th>Task:</th>
              <td>
                <TaskField taskId={entry.taskId} isEditing={props.isEditing} selectableTasks={props.selectableTasks}
                  onChange={({ value }: Option) => { if (value) { props.setTask(entry._id, value as string); } }}
                  onCreateTask={this.openNewTaskDialog} />
                <NewTask isOpen={this.state.isNewTaskDialogOpen} defaultName={this.state.newTaskName}
                  requestClose={this.closeNewTaskDialog} />
              </td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>
                <DateField value={entry.start} isEditing={props.isEditing}
                  onSetDate={this.handleDateChange} format="MMM D" />
              </td>
            </tr>
            <tr>
              <th>Start:</th>
              <td>
                <TimeField value={entry.start} isEditing={props.isEditing}
                  onSetTime={props.onSetStart} _id={entry._id} format="h:mm a" />
              </td>
            </tr>
            <tr>
              <th>End:</th>
              <td>
                <TimeField value={entry.end} isEditing={props.isEditing}
                  onSetTime={props.onSetEnd} _id={entry._id} format="h:mm a" />
              </td>
            </tr>
            <tr>
              <th>Duration:</th><td><DurationField from={entry.start} to={entry.end} /></td>
            </tr>
            <tr>
              <th>Notes:</th><td>{entry.notes || <i>none</i>}</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      body = (
        <div>
          <span>None Selected</span>
        </div>
      );
    }
    return (
      <div>
        {header}
        {body}
      </div>
    );
  }
}

export let EntryDetail = connect<EntryDetailStateProps, EntryDetailDispatchProps, {}>(
  ({ view, model }: PgAppState) => ({
    entry: model.entries.get(view.selectedEntry),
    selectableTasks: model.tasks.toArray().map((task: PgTask) => ({ value: task._id, label: task.name })),
    isEditing: view.isEditing
  }),
  (dispatch) => ({
    onToggleEditing: () => {
      dispatch(toggleEditing());
    },
    setTask: (entry: string, task: string) => {
      dispatch(setEntryTask(entry, task));
    },
    onSetStart: (ev: React.FormEvent<HTMLInputElement>) => {
      let _id = ev.currentTarget.dataset.id;
      if (_id) {
        let { hour, minute } = parseTimeString(ev.currentTarget.value);
        dispatch(setEntryStartTime(_id, hour, minute));
      }
    },
    onSetEnd: (ev: React.FormEvent<HTMLInputElement>) => {
      let _id = ev.currentTarget.dataset.id;
      if (_id) {
        let { hour, minute } = parseTimeString(ev.currentTarget.value);
        dispatch(setEntryEndTime(_id, hour, minute));
      }
    },
    onSetDate: (entryId: string, newDate: moment.MomentInput) => {
      if (entryId && PgEntry.isValidDateTime(newDate)) { // make sure we have a valid date
        dispatch(setEntryDate(entryId, newDate));
      }
    }
  })
)(EntryDetailComponent);