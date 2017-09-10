import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState, PgModelState } from '../../../../store';
import { PgEntry } from '../../../../store/models';
import { PropertyMap } from '../../../../store/models/pg-types';
import { selectEntry, stopEditing, startTask, createEntry, deleteEntry } from '../../../../store/actions';

import { TimeField } from '../../../../components/TimeField';
import { DurationField } from '../../../../components/DurationField';
import { TaskField } from '../../../../components/TaskField';

import './EntryList.css';

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

type EntryListComponentProps = {
  model: PgModelState
  selectedEntry: string
  deselectEntry: () => void
  onSelectEntry: React.MouseEventHandler<DataElement & HTMLTableRowElement>
  onCopyEntry: React.MouseEventHandler<DataElement>
  onContinueEntry: React.MouseEventHandler<DataElement>
  onNewEntry: React.MouseEventHandler<HTMLButtonElement>
  onDeleteEntry: React.MouseEventHandler<DataElement>
} & React.HTMLAttributes<HTMLTableElement>;

export class EntryListComponent extends React.Component<EntryListComponentProps, {}> {
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
      <table className="EntryList table table-sm table-hover table-striped">
        <thead>
          <tr>
            {propertyMap.map(({ name, alias }, i) => <th key={name}>{alias}</th>)}
          </tr>
        </thead>
        <tbody>
          {this.props.model.entries.map((entry: PgEntry, i) => (
            <tr key={entry._id} onClick={this.props.onSelectEntry}
              data-id={entry._id} title={entry._id}
              className={this.props.selectedEntry === entry._id ? 'table-info' : ''}>
              <td>Lookup Job</td>
              <td><TaskField taskId={entry.taskId}/></td>
              <td><TimeField value={entry.start} format="h:mm a" /></td>
              <td><TimeField value={entry.end} format="h:mm a" /></td>
              <td><DurationField from={entry.start} to={entry.end} /></td>
              <td className="EntryList-controls">
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

export let EntryList = connect(
  (state: PgAppState) => ({
    model: state.model,
    selectedEntry: state.view.selectedEntry
  }),
  (dispatch) => ({
    deselectEntry: () => {
      dispatch(selectEntry(''));
      dispatch(stopEditing());
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
  }))(EntryListComponent);