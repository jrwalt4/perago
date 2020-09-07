import * as React from 'react';
import { connect } from 'react-redux';
import { Options } from 'react-select';
import moment from 'moment';

import { PgAppState } from 'store';
import {
  toggleEditing,
  setEntryTask,
  setEntryStartTime,
  setEntryEndTime,
  setEntryDate
} from 'store/actions';
import { selectedEntrySelector, tasksArraySelector, isEditingSelector } from 'store/selectors';
import { PgTask } from 'store/models/pg-task';
import { PgEntry, from as fromEntry, setDate, setEnd, clearEnd, setStart, setTask } from 'store/models/pg-entry';
import { DateField } from 'components/DateField';
import { TimeField } from 'components/TimeField';
import { TaskField } from 'components/TaskField';
import { DurationField } from 'components/DurationField';
import { NewTask } from 'scenes/Timecard/components/NewTask';

import './EntryDetail.css';
import { ConnectedProjectField } from 'components/ProjectField';
import { parseTimeString, isValidDateTime } from 'util/time';

interface EntryDetailStateProps {
  entry?: PgEntry;
  selectableTasks: Options<string>;
  isEditing: boolean;
}

interface EntryDetailDispatchProps {
  onToggleEditing: React.MouseEventHandler<HTMLButtonElement>;
  onSetTask: (entryId: string, taskId: string) => void;
  onSetStart?: (entryId: string, newStartTime: moment.MomentInput) => void;
  onSetEnd?: (entryId: string, newEndTime: moment.MomentInput) => void;
  onSetDate?: (entryId: string, value: moment.MomentInput) => void;
}

export type EntryDetailProps = EntryDetailStateProps & EntryDetailDispatchProps;

interface EntryDetailState {
  isNewTaskDialogOpen: boolean;
  newTaskName?: string;
  tempEntry?: PgEntry;
  startTimeOptions?: number[];
  endTimeOptions?: number[];
}

export class EntryDetailComponent extends React.Component<EntryDetailProps, EntryDetailState> {
  constructor(props: EntryDetailProps) {
    super(props);
    this.state = {
      isNewTaskDialogOpen: false,
      newTaskName: '',
      tempEntry: props.entry
    };
  }

  componentWillReceiveProps(nextProps: EntryDetailProps) {
    if (nextProps !== this.props) {
      this.setState({
        tempEntry: nextProps.entry
      });
      if (!nextProps.isEditing && this.props.isEditing) {
        // end editing mode
        this.commitEdits();
      }
    }
  }

  commitEdits() {
    if (null != this.state.tempEntry) {
      const entry = this.state.tempEntry;
      if (this.props.onSetDate) {
        this.props.onSetDate(entry._id, entry.start);
      }
      if (this.props.onSetStart) {
        this.props.onSetStart(entry._id, entry.start);
      }
      if (this.props.onSetEnd) {
        this.props.onSetEnd(entry._id, entry.end);
      }
      if (this.props.onSetTask) {
        this.props.onSetTask(entry._id, entry.taskId);
      }
    }
  }

  clearEdits() {
    this.setState({
      tempEntry: this.props.entry
    });
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

  getTempEntry(): PgEntry {
    const entry = this.state.tempEntry;
    if (!entry) {
      throw new Error('Cannot edit undefined entry');
    }
    return entry;
  }

  handleTaskChange = (newTask: string) => {
    const entry = fromEntry(this.getTempEntry());
    this.setState({
      tempEntry: setTask(entry, newTask)
    });
  }

  handleDateChange = (newDate: moment.Moment) => {
    const entry = fromEntry(this.getTempEntry());
    this.setState({
      tempEntry: setDate(entry, newDate)
    });
  }

  handleStartInputChange = (startInput: string) => {
    this.setState({
      startTimeOptions: this.parseTimeInput(startInput)
    });
  }

  handleStartTimeChange = (newStartTime: moment.Moment | null) => {
    if (!newStartTime) {
      return;
    }
    const entry = fromEntry(this.getTempEntry());
    this.setState({
      tempEntry: setStart(entry, newStartTime.valueOf())
    });
  }

  getStartTimeOptions = (): number[] => {
    if (this.state.startTimeOptions) {
      return this.state.startTimeOptions;
    }
    const entryStart = moment((this.props.entry as PgEntry).start);
    return ([7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).map((hour) => {
      return moment({
        year: entryStart.year(),
        month: entryStart.month(),
        date: entryStart.date(),
        hour
      }).valueOf();
    });
  }

  handleEndInputChange = (endInput: string) => {
    this.setState({
      endTimeOptions: this.parseTimeInput(endInput)
    });
  }

  handleEndTimeChange = (newEndTime: moment.Moment | null) => {
    const entry = fromEntry(this.getTempEntry());
    this.setState({
      tempEntry: newEndTime ? setEnd(entry, newEndTime.valueOf()) : clearEnd(entry)
    });
  }

  getEndTimeOptions = (): number[] => {
    const entryStart = moment((this.props.entry as PgEntry).start);
    return ([1, 2, 3, 4, 5, 6, 7, 8]).map((duration) => {
      return entryStart.clone().add(duration, 'hours').valueOf();
    });
  }

  parseTimeInput = (input: string): number[] => {
    return parseTimeString(input, (this.props.entry as PgEntry).start);
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
    if (this.state.tempEntry) {
      let entry = this.state.tempEntry;
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
                  onChange={this.handleTaskChange}
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
                <TimeField value={entry.start} _id={entry._id}
                  isEditing={props.isEditing} format="h:mm a"
                  timeOptions={this.getStartTimeOptions()}
                  onInputChange={this.handleStartInputChange}
                  onTimeChange={this.handleStartTimeChange} />
              </td>
            </tr>
            <tr>
              <th>End:</th>
              <td>
                <TimeField value={entry.end} _id={entry._id}
                  isEditing={props.isEditing} format="h:mm a"
                  clearable={true}
                  timeOptions={this.getEndTimeOptions()}
                  onInputChange={this.handleEndInputChange}
                  onTimeChange={this.handleEndTimeChange} />
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

export let EntryDetail = connect<EntryDetailStateProps, EntryDetailDispatchProps, {}, PgAppState>(
  (state: PgAppState) => ({
    entry: selectedEntrySelector(state),
    selectableTasks: tasksArraySelector(state).map((task: PgTask) => ({ value: task._id, label: task.name })),
    isEditing: isEditingSelector(state)
  }),
  (dispatch) => ({
    onToggleEditing: () => {
      dispatch(toggleEditing());
    },
    onSetTask: (entryId: string, taskId: string) => {
      dispatch(setEntryTask(entryId, taskId));
    },
    onSetStart: (entryId: string, newStartTime: moment.MomentInput) => {
      if (entryId) {
        const newStart = moment(newStartTime);
        let hour = newStart.get('hour');
        let minute = newStart.get('minute');
        dispatch(setEntryStartTime(entryId, hour, minute));
      }
    },
    onSetEnd: (entryId: string, newEndTime: moment.MomentInput) => {
      if (entryId) {
        const newEnd = moment(newEndTime);
        let hour = newEnd.get('hour');
        let minute = newEnd.get('minute');
        dispatch(setEntryEndTime(entryId, hour, minute));
      }
    },
    onSetDate: (entryId: string, newDate: moment.MomentInput) => {
      if (entryId && isValidDateTime(newDate)) { // make sure we have a valid date
        dispatch(setEntryDate(entryId, newDate));
      }
    }
  })
)(EntryDetailComponent);
