import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState, PgModelState } from '../../../store';
import { PgEntry } from '../../../store/models';
import { PropertyMap } from '../../../store/models/pg-types';
import { selectEntry, startTask } from '../../../store/actions';

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
  onSelectEntry: React.MouseEventHandler<DataElement & HTMLTableRowElement>
  onCopyEntry: React.MouseEventHandler<DataElement>
  onContinueEntry: React.MouseEventHandler<DataElement>
} & React.HTMLAttributes<HTMLTableElement>;

export let TimecardComponent = (props: TimecardComponentProps) => (
  <table className="Timecard table table-sm table-hover table-striped">
    <thead>
      <tr>
        {propertyMap.map(({ name, alias }, i) => <th key={name}>{alias}</th>)}
      </tr>
    </thead>
    <tbody>
      {props.model.entries.map((entry: PgEntry, i) => (
        <tr key={entry._id} onClick={props.onSelectEntry}
          data-id={entry._id}
          className={props.selectedEntry === entry._id ? 'table-info' : ''}>
          <td>Lookup Job</td>
          <td>{props.model.tasks.getIn([entry.taskId, 'name'], 'unknown')}</td>
          <td><TimeField value={entry.start} format="h:mm a" /></td>
          <td><TimeField value={entry.end} format="h:mm a" /></td>
          <td><DurationField from={entry.start} to={entry.end} /></td>
          <td className="Timecard-controls">
            <span className="fa fa-retweet" data-task-id={entry.taskId} onClick={props.onContinueEntry} />
            <span className="fa fa-copy" />
          </td>
        </tr>
      )).toArray()}
    </tbody>
  </table>
);

export let Timecard = connect(
  (state: PgAppState) => ({
    model: state.model,
    selectedEntry: state.view.selectedEntry
  }),
  (dispatch) => ({
    onSelectEntry: (ev: React.MouseEvent<DataElement>) => {
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
    onCopyEntry: (ev) => {
      // do something
    }
  }))(TimecardComponent);