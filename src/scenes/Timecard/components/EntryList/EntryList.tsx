import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState } from 'store';
import { PgEntry } from 'store/models';
import { selectEntry, stopEditing, startTask, createEntry, deleteEntry, clearSelection } from 'store/actions';
import { entriesArraySelector } from 'store/selectors';

import { TimeField } from 'components/TimeField';
import { DurationField } from 'components/DurationField';
import { TaskField } from 'components/TaskField';
import { DateField } from 'components/DateField';
import { ConnectedProjectField } from 'components/ProjectField';
import { Table, ColumnDef } from 'components/Table';
import { getFullDate } from 'util/time';
import './EntryList.css';

import 'font-awesome/css/font-awesome.min.css';

interface EntryListStateProps {
  entries: PgEntry[];
  selectedEntry: string;
}

interface EntryListDispatchProps {
  deselectEntry: () => void;
  selectEntry: (entryId: string) => void;
  continueTask: (taskId: string) => void;
  onNewEntry: React.MouseEventHandler<HTMLButtonElement>;
  deleteEntry: (entryId: string) => void;
}

interface EntryListOwnProps { }

type EntryListComponentProps = EntryListStateProps & EntryListDispatchProps & EntryListOwnProps;

interface EntryListComponentState {
  columns: ColumnDef<PgEntry>[];
}

export class EntryListComponent extends React.Component<EntryListComponentProps, EntryListComponentState> {
  constructor(props: EntryListComponentProps) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Date',
          id: 'date',
          accessor: (entry: PgEntry) => getFullDate(entry.start),
          render: (date: number) => <DateField value={date} />,
        },
        {
          title: 'Job',
          id: 'project',
          accessor: 'taskId',
          render: (id: string) => <ConnectedProjectField taskId={id} />,
        },
        {
          title: 'Task',
          accessor: 'taskId',
          render: (id: string) => {
            return <TaskField taskId={id} />;
          },
        },
        {
          title: 'Start',
          accessor: 'start',
          render: (start: number) => <TimeField value={start} format="h:mm a" />,
        },
        {
          title: 'End',
          accessor: 'end',
          render: (end: number) => <TimeField value={end} format="h:mm a" />,
        },
        {
          title: 'Duration',
          id: 'duration',
          accessor: (entry: PgEntry) => PgEntry.getDuration(entry),
          render: function (duration: number) {
            return <DurationField value={duration} />;
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
          columns={this.state.columns}
        />
        <div className="EntryList-control-container btn-group">
          <span className="EntryList-control btn btn-sm btn-primary fa fa-plus" onClick={this.props.onNewEntry} />
        </div>
      </div>
    );
  }
}

export let EntryList = connect<EntryListStateProps, EntryListDispatchProps, EntryListOwnProps, PgAppState>(
  (state: PgAppState) => ({
    entries: entriesArraySelector(state),
    selectedEntry: state.view.selectedEntry
  }),
  (dispatch) => ({
    deselectEntry: () => {
      dispatch(clearSelection());
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
    onNewEntry: () => {
      dispatch(createEntry({ start: Date.now() }));
    }
  })
)(EntryListComponent);
