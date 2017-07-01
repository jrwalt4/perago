import * as React from 'react';
import { connect } from 'react-redux';

import { PgModelState } from '../../../store/reducers';
import { PgAppState } from '../../../index';
import { PgEntry } from '../../../store/models';
import { PropertyMap } from '../../../store/models/pg-types';
import { selectEntry, startTask } from '../../../store/actions';

import { DateField } from '../../common/DateField';
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

type TimecardComponentProps = {
  model: PgModelState
  selectedEntry: string
  onSelectEntry: React.MouseEventHandler<HTMLElement>
  onCopyEntry: React.MouseEventHandler<HTMLSpanElement>
  onContinueEntry: React.MouseEventHandler<HTMLSpanElement>
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
        <tr key={entry._id} onClick={props.onSelectEntry} data-id={entry._id}
          className={props.selectedEntry === entry._id ? 'table-info' : ''}>
          <td>Lookup Job</td>
          <td>{props.model.tasks.getIn([entry.taskId, 'name'], 'unknown')}</td>
          <td><DateField value={entry.start} format="h:mm a" /></td>
          <td><DateField value={entry.end} format="h:mm a" /></td>
          <td><DurationField from={entry.start} to={entry.end} /></td>
          <td className="Timecard-controls">
            <span className="fa fa-retweet" onClick={props.onContinueEntry} />
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
    onSelectEntry: (ev: React.MouseEvent<HTMLTableRowElement>) => {
      dispatch(selectEntry(ev.currentTarget.dataset.id || ''));
    },
    onContinueEntry: (ev: React.MouseEvent<HTMLSpanElement>) => {
      dispatch(startTask(ev.currentTarget.dataset.id || ''));
    },
    onCopyEntry: (ev) => {
      // do something
    }
  }))(TimecardComponent);