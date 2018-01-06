import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState } from 'store';
import { PgEntry } from 'store/models';
import { selectEntry, stopEditing, startTask, createEntry, deleteEntry } from 'store/actions';

import { TimeField } from 'components/TimeField';
import { DurationField } from 'components/DurationField';
import { TaskField } from 'components/TaskField';
import { Table, Column, RowRenderProps, FinalState, RowInfo } from 'components/Table';

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
  selectEntry: (entryId: string) => void;
  onCopyEntry: React.MouseEventHandler<DataElement>;
  onContinueEntry: React.MouseEventHandler<DataElement>;
  onNewEntry: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteEntry: React.MouseEventHandler<DataElement>;
}

interface EntryListComponentState {
  columns: Column[];
}

export class EntryListComponent extends React.Component<EntryListComponentProps, EntryListComponentState> {
  constructor(props: EntryListComponentProps) {
    super(props);
    this.state = {
      columns: [
        // add '_id' column so entry._id can be accessed from row onClick handler
        {
          Header: 'Id',
          accessor: '_id',
          show: false
        },
        {
          Header: 'Job',
          Cell: 'Lookup'
        },
        {
          id: 'task',
          Header: 'Task',
          accessor: 'taskId',
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
          Cell: (rowProps: RowRenderProps) => (
            <DurationField from={(rowProps.value as PgEntry).start} to={(rowProps.value as PgEntry).end} />
          )
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
    let selectFn = this.props.selectEntry;
    return (
      <div className="col-12 EntryList">
        <h4>Timecard</h4>
        <Table data={this.props.entries}
          className="-striped -highlight"
          pageSize={this.props.entries.length}
          showPagination={false}
          columns={this.state.columns}
          getTrProps={(state: FinalState, rowInfo: RowInfo) => ({
            onClick: (e: Event, handleOriginal: () => void) => {
              selectFn((rowInfo.row as PgEntry)._id);
              if (handleOriginal && typeof handleOriginal === 'function') {
                handleOriginal();
              }
            },
            className: 'EntryListRow'
          })}
          getTdProps={() => ({
            className: 'EntryListData'
          })}
          getTheadThProps={() => ({
            style: {outline: 'none'}
          })}/>
      </div>
    );
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
    selectEntry: (entryId: string) => {
      dispatch(selectEntry(entryId));
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