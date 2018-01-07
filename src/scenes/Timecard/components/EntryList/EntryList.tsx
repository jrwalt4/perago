import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState } from 'store';
import { PgEntry } from 'store/models';
import { selectEntry, stopEditing, startTask, createEntry, deleteEntry } from 'store/actions';
import { getEntries } from 'store/selectors';

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
  continueTask: (taskId: string) => void;
  onNewEntry: React.MouseEventHandler<HTMLButtonElement>;
  deleteEntry: (entryId: string) => void;
}

interface EntryListComponentState {
  columns: Column[];
}

function stopPropagation<ElementType>(e: React.MouseEvent<ElementType>) {
  e.stopPropagation();
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
    return (
      <div className="col-12 EntryList">
        <h4>Timecard</h4>
        <Table data={this.props.entries}
          className="-striped -highlight"
          pageSize={this.props.entries.length}
          showPagination={false}
          columns={this.state.columns}
          ExpanderComponent={() => <span className="EntryList-expander fa fa-ellipsis-v" />}
          SubComponent={(rowInfo: RowInfo) => (
            <div className="EntryList-control-container btn-group" onClick={stopPropagation}>
              <span className="EntryList-control btn btn-sm btn-primary fa fa-retweet" onClick={() => {
                this.props.continueTask((rowInfo.row as PgEntry).taskId);
              }} />
              <span className="EntryList-control btn btn-sm btn-danger fa fa-trash" onClick={() => {
                this.props.deleteEntry((rowInfo.row as PgEntry)._id);
              }} />
            </div>
          )}
          getTrProps={(state: FinalState, { row }: RowInfo) => ({
            className: 'EntryList-row' + (row._id === this.props.selectedEntry ? ' EntryList-selected' : ''),
            style: (row._id === this.props.selectedEntry ? { background: 'rgba(173,216,230,0.5)' } : null)
          })}
          getTdProps={(state: FinalState, rowInfo: RowInfo) => ({
            onClick: (e: Event, handleOriginal: () => void) => {
              this.props.selectEntry((rowInfo.row as PgEntry)._id);
              if (handleOriginal) {
                handleOriginal();
              }
            },
            className: 'EntryList-data'
          })}
          getTheadThProps={() => ({
            style: { outline: 'none' }
          })} />
        <div className="EntryList-control-container btn-group">
          <span className="EntryList-control btn btn-sm btn-primary fa fa-plus" onClick={this.props.onNewEntry} />
        </div>
      </div>
    );
  }
}

export let EntryList = connect(
  (state: PgAppState) => ({
    entries: getEntries(state),
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
    continueTask: (taskId: string) => {
      dispatch(startTask(taskId));
    },
    deleteEntry: (entryId: string) => {
      dispatch(deleteEntry(entryId));
    },
    onNewEntry: (ev) => {
      dispatch(createEntry({ start: Date.now() }));
    }
  }))(EntryListComponent);