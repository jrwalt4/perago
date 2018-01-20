import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState } from 'store';
import { PgEntry } from 'store/models';
import { selectEntry, stopEditing, startTask, createEntry, deleteEntry } from 'store/actions';
import { entriesArraySelector } from 'store/selectors';

import { TimeField } from 'components/TimeField';
import { DurationField } from 'components/DurationField';
import { TaskField } from 'components/TaskField';
import { DateField } from 'components/DateField';
import { ConnectedProjectField } from 'components/ProjectField';
import { Table, Column, RowRenderProps, FinalState, RowInfo } from 'components/Table';
import { getFullDate } from 'util/time';
import './EntryList.css';

import 'font-awesome/css/font-awesome.min.css';

interface EntryListComponentProps {
  entries: PgEntry[];
  selectedEntry: string;
  deselectEntry: () => void;
  selectEntry: (entryId: string) => void;
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
          Header: 'Date',
          id: 'date',
          accessor: (entry: PgEntry) => getFullDate(entry.start),
          pivot: true,
          PivotValue: (rowProps: RowRenderProps) => {
            // rowProps.value will return the date timestamp as a string
            let timestamp = parseInt(rowProps.value, 10);
            return <DateField value={timestamp} format="MMM D" />;
          },
          Cell: (rowProps: RowRenderProps) => <DateField value={rowProps.value} />,
          Aggregated: (rowProps: RowRenderProps) => <DateField value={rowProps.value} />
        },
        {
          Header: 'Job',
          id: 'project',
          accessor: 'taskId',
          Cell: (rowProps: RowRenderProps) => <ConnectedProjectField taskId={rowProps.value} />,
          // Aggregated: () => <i>Multiple</i>
        },
        {
          Header: 'Task',
          accessor: 'taskId',
          Cell: (rowProps: RowRenderProps) => {
            return <TaskField taskId={rowProps.value} />;
          },
          // Aggregated: () => <i>Multiple</i>
        },
        {
          Header: 'Start',
          accessor: 'start',
          Cell: (rowProps: RowRenderProps) => <TimeField value={rowProps.value} format="h:mm a" />,
          Aggregated: (rowProps: RowRenderProps) => <i>Multiple</i>
        },
        {
          Header: 'End',
          accessor: 'end',
          Cell: (rowProps: RowRenderProps) => <TimeField value={rowProps.value} format="h:mm a" />,
          Aggregated: (rowProps: RowRenderProps) => <i>Multiple</i>
        },
        {
          Header: 'Duration',
          id: 'duration',
          accessor: (entry: PgEntry) => PgEntry.getDuration(entry),
          aggregate: (values: number[]) => {
            return values.reduce((total: number, duration: number) => {
              return duration + total;
              // tslint:disable-next-line:align
            }, 0);
          },
          Cell: function (rowProps: RowRenderProps) {
            return <DurationField value={rowProps.value} />;
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
      <div className="col-12 EntryList">
        <h4>Timecard</h4>
        <Table data={this.props.entries}
          className="-striped -highlight"
          defaultPageSize={10}
          collapseOnDataChange={false}
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
          getTrProps={(state: FinalState, rowInfo: RowInfo) => {
            if (rowInfo && rowInfo.row) {
              let { row } = rowInfo;
              let _id = row && row._id;
              if (_id && (_id === this.props.selectedEntry)) {
                return {
                  className: 'EntryList-row' + ' EntryList-selected',
                  style: { background: 'rgba(173,216,230,0.5)' }
                };
              }
            }
            return {
              className: 'EntryList-row'
            };
          }}
          getTdProps={(state: FinalState, rowInfo: RowInfo) => ({
            onClick: (e: Event, handleOriginal: () => void) => {
              if (rowInfo && rowInfo.row) {
                this.props.selectEntry((rowInfo.row as PgEntry)._id);
              } else {
                this.props.deselectEntry();
              }
              if (handleOriginal && typeof handleOriginal === 'function') {
                handleOriginal();
              }
            },
            className: 'EntryList-data'
          })}
          getTheadThProps={() => ({
            style: { outline: 'none' }
          })}
          pivotBy={['date']}
        />
        <div className="EntryList-control-container btn-group">
          <span className="EntryList-control btn btn-sm btn-primary fa fa-plus" onClick={this.props.onNewEntry} />
        </div>
      </div>
    );
  }
}

export let EntryList = connect(
  (state: PgAppState) => ({
    entries: entriesArraySelector(state),
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