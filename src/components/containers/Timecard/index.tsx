import * as React from 'react';

import { PgModelState, PgViewState } from '../../../store/reducers';
import { PgEntry } from '../../../store/models';
import { PropertyMap } from '../../../store/models/pg-types';

import { DateField } from '../../common/DateField';

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

export let Timecard = (props: { model: PgModelState, view: PgViewState }) => (
  <table className="Timecard">
    <thead>
      <tr>
        {propertyMap.map(({ alias }, i) => <th key={i}>{alias}</th>)}
      </tr>
    </thead>
    <tbody>
      {props.model.entries.map((entry: PgEntry, i) => (
        <tr key={entry._id}>
          <td>Lookup Job</td>
          <td>{entry.taskId}</td>
          <td><DateField value={entry.start} format="h:mm a" /></td>
          <td><DateField value={entry.end} format="h:mm a" /></td>
          <td>{entry.end.getTime() - entry.start.getTime()}</td>
        </tr>
      )).toArray()}
    </tbody>
  </table>
);
