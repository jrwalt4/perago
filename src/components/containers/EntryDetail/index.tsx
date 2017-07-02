import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState, PgModelState } from '../../../store';
import { DateField } from '../../common/DateField';
import { DurationField } from '../../common/DurationField';

import './EntryDetail.css';

export type EntryDetailProps = {
  selectedEntry: string
  isEditing: boolean
  model: PgModelState
};

export let EntryDetailComponent = ({ selectedEntry, isEditing, model }: EntryDetailProps) => {
  if (selectedEntry) {
    let entry = model.entries.get(selectedEntry);
    let task = model.tasks.get(entry.taskId);
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
            <th>Start:</th><td><DateField value={entry.start} isEditing={isEditing} /></td>
          </tr>
          <tr>
            <th>End:</th><td><DateField value={entry.end} isEditing={isEditing} /></td>
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

export let EntryDetail = connect(
  ({ view, model }: PgAppState) => ({
    selectedEntry: view.selectedEntry,
    isEditing: view.isEditing,
    model
  })
)(EntryDetailComponent);