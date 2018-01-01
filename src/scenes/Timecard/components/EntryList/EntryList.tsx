import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState } from 'store';
import { PgEntry } from 'store/models';
import { selectEntry, stopEditing, startTask, createEntry, deleteEntry } from 'store/actions';

import { TimeField } from 'components/TimeField';
import { DurationField } from 'components/DurationField';
import { TaskField } from 'components/TaskField';
import { Table, Column, RowRenderProps } from 'components/Table';

import './EntryList.css';

import 'font-awesome/css/font-awesome.min.css';

interface DataElement extends HTMLElement {
  dataset: {
    id: string,
    taskId?: string
  };
}

interface EntryListComponentProps {
  entries: PgEntry[];
  selectedEntry: string;
  deselectEntry: () => void;
  onSelectEntry: React.MouseEventHandler<DataElement & HTMLTableRowElement>;
  onCopyEntry: React.MouseEventHandler<DataElement>;
  onContinueEntry: React.MouseEventHandler<DataElement>;
  onNewEntry: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteEntry: React.MouseEventHandler<DataElement>;
}

interface EntryListComponentState {
  data: PgEntry[];
  columns: Column[];
}

export class EntryListComponent extends React.Component<EntryListComponentProps, EntryListComponentState> {
  constructor(props: EntryListComponentProps) {
    super(props);
    this.state = {
      data: props.entries,
      columns: [
        {
          Header: 'Job',
          Cell: 'Lookup'
        },
        {
          id: 'task',
          Header: 'Task',
          accessor: (entry: PgEntry) => entry.taskId,
          Cell: (rowProps: RowRenderProps) => {
            return <TaskField taskId={rowProps.value} />;
          }
        },
        {
          Header: 'Start',
          accessor: 'start',
          Cell: (rowProps: RowRenderProps) => <TimeField value={rowProps.value} format="h:mm a" />
        },
        {
          Header: 'End',
          accessor: 'end',
          Cell: (rowProps: RowRenderProps) => <TimeField value={rowProps.value} format="h:mm a" />
        },
        {
          Header: 'Duration',
          id: 'duration',
          accessor: (entry: PgEntry) => entry,
          Cell: (rowProps: RowRenderProps) => {
            // tslint:disable-next-line:no-console
            console.log(rowProps);
            return <DurationField from={(rowProps.value as PgEntry).start} to={(rowProps.value as PgEntry).end} />;
          }
        }
      ]
    };
  }
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
  render(): JSX.Element {
    return (
      <div className="col-12">
        <h4>Timecard</h4>
        <Table data={this.state.data}
          columns={this.state.columns} />
      </div>
    );
    /*
    return (
      <div className="col-12">
        <h4>Timecard</h4>
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
                <td><TaskField taskId={entry.taskId} /></td>
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
      </div>
    );
    // */
  }
}

export let EntryList = connect(
  (state: PgAppState) => ({
    entries: state.model.entries.toArray(),
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