import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState } from '../../../store';
import { DateField } from '../../common/DateField';
import { DurationField } from '../../common/DurationField';

import './EntryDetail.css';

export let EntryDetailComponent = (props: PgAppState) => {
  let entryID: string;
  if (entryID = props.view.selectedEntry) {
    let entry = props.model.entries.get(entryID);
    let task = props.model.tasks.get(entry.taskId);
    return (
      <table className="EntryDetail table table-sm table-bordered">
        <tbody>
          <tr>
            <th>Job:</th><td>Lookup Job</td>
          </tr>
          <tr>
            <th>Task:</th><td>{task && task.name}</td>
          </tr>
          <tr>
            <th>Start:</th><td><DateField value={entry.start} /></td>
          </tr>
          <tr>
            <th>End:</th><td><DateField value={entry.end} /></td>
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
  }
  return (
    <div>
      <span>None Selected</span>
    </div>
  );
};

export let EntryDetail = connect((state: PgAppState) => state)(EntryDetailComponent);