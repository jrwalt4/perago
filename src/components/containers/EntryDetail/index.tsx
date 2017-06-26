import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState } from '../../../index';
import { DateField } from '../../common/DateField';

export let EntryDetailComponent = (props: PgAppState) => {
  let entryID: string;
  if (entryID = props.view.selectedEntry) {
    let entry = props.model.entries.get(entryID);
    let task = props.model.tasks.get(entry.taskId);
    return (
      <div>
        <label>Task:</label><span>{task && task.name}</span><br />
        <label>Start:</label><DateField value={entry.start} /><br />
        <label>End:</label><DateField value={entry.end} /><br />
      </div>
    );
  }
  return (
    <div>
      <span>None Selected</span>
    </div>
  );
};

export let EntryDetail = connect((state: PgAppState) => state)(EntryDetailComponent);