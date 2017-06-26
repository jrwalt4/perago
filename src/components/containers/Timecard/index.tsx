import * as React from 'react';
import { connect } from 'react-redux';

import { PgModelState, PgViewState } from '../../../store/reducers';
import { PgAppState } from '../../../index';
import { PgEntry } from '../../../store/models';
import { PropertyMap } from '../../../store/models/pg-types';
import { selectEntry } from '../../../store/actions';

import { DateField } from '../../common/DateField';
import { DurationField } from '../../common/DurationField';

import './Timecard.css';

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
  view: PgViewState
} & React.HTMLAttributes<{}>;

export let TimecardComponent = (props: TimecardComponentProps) => (
  <table className="Timecard">
    <thead>
      <tr>
        {propertyMap.map(({ name, alias }, i) => <th key={name}>{alias}</th>)}
      </tr>
    </thead>
    <tbody>
      {props.model.entries.map((entry: PgEntry, i) => (
        <tr key={entry._id} onClick={props.onClick} data-id={entry._id}>
          <td>Lookup Job</td>
          <td>{props.model.tasks.getIn([entry.taskId, 'name'], 'unknown')}</td>
          <td><DateField value={entry.start} format="h:mm a" /></td>
          <td><DateField value={entry.end} format="h:mm a" /></td>
          <td><DurationField from={entry.start} to={entry.end} /></td>
        </tr>
      )).toArray()}
    </tbody>
  </table>
);

export let Timecard = connect((state: PgAppState) => state, (dispatch) => {
  return {
    onClick: (ev: React.MouseEvent<HTMLTableRowElement>) => {
      dispatch(selectEntry(ev.currentTarget.dataset.id || ''));
    }
  };
})(TimecardComponent);