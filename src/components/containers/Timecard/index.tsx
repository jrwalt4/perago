import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState, PgModelState } from '../../../store';
import { PgEntry } from '../../../store/models';
import { PropertyMap } from '../../../store/models/pg-types';
import { selectEntry, startTask, createEntry, deleteEntry } from '../../../store/actions';

import { TimeField } from '../../common/TimeField';
import { DurationField } from '../../common/DurationField';

import './Timecard.css';

import 'font-awesome/css/font-awesome.min.css';

let propertyMap: PropertyMap<PgEntry, 'job' | 'duration'>[] = [
  {
    name: 'job',
    alias: 'Job',
    render: (e) => <span>Job</span>
  },
  {
    name: 'taskId',
    alias: 'Task'
  },
  {
    name: 'start',
    alias: 'Start'
  },
  {
    name: 'end',
    alias: 'End'
  },
  {
    name: 'duration',
    alias: 'Duration'
  }
];

interface DataElement extends HTMLElement {
  dataset: {
    id: string,
    taskId?: string
  };
}

type TimecardComponentProps = {
  model: PgModelState
  selectedEntry: string
  deselectEntry: () => void
  onSelectEntry: React.MouseEventHandler<DataElement & HTMLTableRowElement>
  onCopyEntry: React.MouseEventHandler<DataElement>
  onContinueEntry: React.MouseEventHandler<DataElement>
  onNewEntry: React.MouseEventHandler<HTMLButtonElement>
  onDeleteEntry: React.MouseEventHandler<DataElement>
} & React.HTMLAttributes<HTMLTableElement>;

export class TimecardComponent extends React.Component<TimecardComponentProps, {}> {
  componentWillMount() {
    document.addEventListener('keyup', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }
  handleKeyPress = (ev: KeyboardEvent) => {
    if (ev.keyCode === 27) {
      this.props.deselectEntry();
    }
  }
  render() {
    return (
      <table className="Timecard table table-sm table-hover table-striped">
        <thead>
          <tr>
            {propertyMap.map(({ name, alias }, i) => <th key={name}>{alias}</th>)}
          </tr>
        </thead>
        <tbody>
          {this.props.model.entries.map((entry: PgEntry, i) => (
            <tr key={entry._id} onClick={this.props.onSelectEntry}
              data-id={entry._id}
              className={this.props.selectedEntry === entry._id ? 'table-info' : ''}>
              <td>Lookup Job</td>
              <td>{this.props.model.tasks.getIn([entry.taskId, 'name'], 'unknown')}</td>
              <td><TimeField value={entry.start} format="h:mm a" /></td>
              <td><TimeField value={entry.end} format="h:mm a" /></td>
              <td><DurationField from={entry.start} to={entry.end} /></td>
              <td className="Timecard-controls">
                <span className="fa fa-retweet" data-task-id={entry.taskId} onClick={this.props.onContinueEntry} />
                <span className="fa fa-trash" data-id={entry._id} onClick={this.props.onDeleteEntry} />
              </td>
            </tr>
          )).toArray()}
        </tbody>
        <tfoot>
          <tr>
            <td><button className="btn btn-sm btn-primary fa fa-plus" onClick={this.props.onNewEntry} /></td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export let Timecard = connect(
  (state: PgAppState) => ({
    model: state.model,
    selectedEntry: state.view.selectedEntry
  }),
  (dispatch) => ({
    deselectEntry: () => {
      dispatch(selectEntry(''));
    },
    onSelectEntry: (ev: React.MouseEvent<DataElement>) => {
      ev.stopPropagation();
      dispatch(selectEntry(ev.currentTarget.dataset.id));
    },
    onContinueEntry: (ev: React.MouseEvent<DataElement>) => {
      // prevent row from being selected
      ev.stopPropagation();
      let taskId = ev.currentTarget.dataset.taskId;
      if (taskId) {
        dispatch(startTask(taskId));
      }
    },
    onDeleteEntry: (ev: React.MouseEvent<DataElement>) => {
      // prevent row from being selected
      ev.stopPropagation();
      let entryId = ev.currentTarget.dataset.id;
      if (entryId) {
        dispatch(deleteEntry(entryId));
      }
    },
    onNewEntry: (ev) => {
      dispatch(createEntry({ start: Date.now() }));
    }
  }))(TimecardComponent);