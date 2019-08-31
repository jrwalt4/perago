import * as React from 'react';
import MTable, { TableProps as MTableProps } from '@material-ui/core/Table';
import MTableBody from '@material-ui/core/TableBody';

import { Column, ColumnDef } from './Column';
import { TableRow, UserRowProps } from './TableRow';
import { TableHead } from './TableHead';
import { TableRowActions, UserRowAction } from './TableRowActions';

export { ColumnDef } from './Column';

interface TableProps<T> extends MTableProps {
  data: T[];
  columns: ColumnDef<T>[];
  rowProps?: UserRowProps | ((item: T) => UserRowProps);
  rowActions?: UserRowAction<T>[];
  onRowClick?: (rowData: T) => void;
}

interface TableState<T> {
  columns: Column<T>[];
  primaryColumnIndex?: number;
}

export class Table<T> extends React.Component<
  TableProps<T>,
  TableState<T>
  > {

  state: TableState<T> = {
    columns: [],
  };

  static getDerivedStateFromProps<T>(
    props: TableProps<T>,
    state: TableState<T>
  ): TableState<T> {
    let primaryColumnIndex: number | undefined;
    let columns = props.columns.map((colDef, index) => {
      let isPrimary = Boolean(colDef.primary);
      if (isPrimary) {
        if (null != primaryColumnIndex) {
          throw new Error('Cannot have two primary columns');
        }
        primaryColumnIndex = index;
      }
      return new Column(colDef);
    });
    const { rowActions } = props;
    if (null != rowActions) {
      columns.push(new Column<T>({
        title: '',
        id: '$$row_actions$$',
        accessor: (item: T) => item,
        props: { padding: 'none' },
        render: (item: T) => <TableRowActions item={item} actions={rowActions}/>
      }));
    }
    return {
      columns,
      primaryColumnIndex
    };
  }

  getDisplayColumns(): Column<T>[] {
    return this.state.columns.filter((col) => !col.isHidden);
  }

  getRowKey(item: T, index: number): React.ReactText {
    let primaryColumnIndex = this.state.primaryColumnIndex;
    if (null == primaryColumnIndex) {
      return index;
    }
    return this.state.columns[primaryColumnIndex].getValue(item) as React.ReactText;
  }

  getRowProps(item: T, index: number): UserRowProps {
    let rowProps = this.props.rowProps;
    if (null == rowProps) {
      return {};
    }
    return typeof rowProps === 'function' ? rowProps(item) : rowProps;
  }

  handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    if (typeof this.props.onRowClick === 'function') {
      let rowId = event.currentTarget.dataset.id;
      let item = this.props.data.find((val, index) => this.getRowKey(val, index) === rowId);
      if (null != item) {
        this.props.onRowClick(item);
      }
    }
  }

  render() {
    let displayColumns = this.getDisplayColumns();
    return (
      <MTable>
        <TableHead columns={displayColumns} />
        <MTableBody>
          {this.props.data.map((item, index) => {
            let id = this.getRowKey(item, index);
            return (
              <TableRow
                columns={displayColumns}
                rowData={item}
                rowId={id}
                key={id}
                onClick={this.handleRowClick}
                userProps={this.getRowProps(item, index)}
              />
            );
          })}
        </MTableBody>
      </MTable>
    );
  }
}
