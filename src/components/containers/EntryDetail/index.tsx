import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState, PgModelState } from '../../../store';
import { toggleEditing, setEntryStartTime, setEntryEndTime } from '../../../store/actions';
import { PgEntry } from '../../../store/models';
import { DateField } from '../../common/DateField';
import { DurationField } from '../../common/DurationField';

import './EntryDetail.css';

export type EntryDetailProps = {
  selectedEntry: string
  isEditing: boolean
  onToggleEditing: React.MouseEventHandler<HTMLButtonElement>
  model: PgModelState
  onSetStart?: React.FormEventHandler<HTMLInputElement>
  onSetEnd?: React.FormEventHandler<HTMLInputElement>
};

export let EntryDetailComponent = (
  {
    selectedEntry,
    isEditing,
    model,
    onToggleEditing,
    onSetStart,
    onSetEnd
  }: EntryDetailProps) => {
  const header = (
    <div className="row">
      <div className="col-9">
        <h4>Entry Details</h4>
      </div>
      <div className="col-3">
        <button className={'btn btn-sm fa ' + (isEditing ? 'btn-success fa-check-square' : 'btn-info fa-edit')}
          onClick={onToggleEditing} />
      </div>
    </div>
  );
  let body: JSX.Element;
  if (selectedEntry) {
    let entry = model.entries.get(selectedEntry);
    let task = model.tasks.get(entry.taskId);
    body = (
      <table className="EntryDetail table table-sm table-bordered">
        <tbody>
          <tr>
            <th>Job:</th><td>Lookup Job</td>
          </tr>
          <tr>
            <th>Task:</th><td>{task && task.name}</td>
          </tr>
          <tr>
            <th>Date:</th><td><DateField value={entry.start} format="MMM / d"/></td>
          </tr>
          <tr>
            <th>Start:</th>
            <td>
              <DateField value={entry.start} isEditing={isEditing}
                onSetTime={onSetStart} _id={entry._id} format="h:mm a"/>
            </td>
          </tr>
          <tr>
            <th>End:</th>
            <td>
              <DateField value={entry.end} isEditing={isEditing}
                onSetTime={onSetEnd} _id={entry._id} format="h:mm a"/>
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
};

export let EntryDetail = connect(
  ({ view, model }: PgAppState) => ({
    selectedEntry: view.selectedEntry,
    isEditing: view.isEditing,
    model
  }),
  (dispatch) => ({
    onToggleEditing: () => {
      dispatch(toggleEditing());
    },
    onSetStart: (ev: React.FormEvent<HTMLInputElement>) => {
      let _id = ev.currentTarget.dataset.id;
      if (_id) {
        let { hour, minute } = PgEntry.parseTimeString(ev.currentTarget.value);
        dispatch(setEntryStartTime(_id, hour, minute));
      }
    },
    onSetEnd: (ev: React.FormEvent<HTMLInputElement>) => {
      let _id = ev.currentTarget.dataset.id;
      if (_id) {
        let { hour, minute } = PgEntry.parseTimeString(ev.currentTarget.value);
        dispatch(setEntryEndTime(_id, hour, minute));
      }
    }
  })
)(EntryDetailComponent);