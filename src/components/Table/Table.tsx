import * as React from 'react';
import MTable, { TableProps as MTableProps } from '@material-ui/core/Table';
import MTableBody from '@material-ui/core/TableBody';
import MTableRow from '@material-ui/core/TableRow';
import MTableHead from '@material-ui/core/TableHead';
import MTableCell from '@material-ui/core/TableCell';

type RenderFn<T, V> = (value: V, item: T) => React.ReactNode;

// type IdFn<T> = (item: T) => string;

type AccessorFn<T, V= {}> = (item: T) => V;

interface ColumnDefCommon<T, V> {
  title?: React.ReactNode;
  render?: RenderFn<T, V>;
  primary?: boolean;
  hidden?: boolean;
}

export interface ColumnDefAccessor<T, V> extends ColumnDefCommon<T, V> {
  accessor: AccessorFn<T>;
  id: string;
}

export interface ColumnDefField<T, V> extends ColumnDefCommon<T, V> {
  accessor: Extract<keyof T, string>;
  id?: string;
}

export type ColumnDef<T, V = {}> = ColumnDefAccessor<T, V> | ColumnDefField<T, V>;

function isColumnDefField<T, V>(
  colDef: ColumnDef<T, V>
): colDef is ColumnDefField<T, V> {
  return typeof colDef.accessor === 'string';
}

function identity<T>(t: T) {
  return t;
}

class Column<T, V = {}> {
  private _id: string | Extract<keyof T, string | number>;
  private _title: string | React.ReactNode;
  private _accessor: AccessorFn<T, V>;
  private _hidden: boolean;

  private _renderCell: (value: V, item: T) => React.ReactNode;

  constructor(def: ColumnDef<T, V>) {
    this._hidden = Boolean(def.hidden);
    if (isColumnDefField(def)) {
      this._id = def.id ? def.id : def.accessor;
      this._accessor = (d: T) => (d[def.accessor] as unknown) as V;
    } else {
      this._id = def.id;
      this._accessor = def.accessor as AccessorFn<T, V>;
    }
    this._title = def.title || this._id;
    if (typeof def.render === 'function') {
      this._renderCell = def.render;
    } else {
      this._renderCell = identity;
    }
  }

  get isHidden(): boolean {
    return this._hidden;
  }

  get id() {
    return this._id;
  }

  getValue(item: T): V {
    return this._accessor(item);
  }

  renderTitle() {
    return this._title;
  }

  renderCell(item: T) {
    return this._renderCell(this._accessor(item), item);
  }
}

interface THeadProps {
  columns: Column<{}>[];
}

function THead(props: THeadProps) {
  const { columns } = props;
  return (
    <MTableHead>
      <MTableRow>
        {columns.map(col => (
          <MTableCell key={col.id}>{col.renderTitle()}</MTableCell>
        ))}
      </MTableRow>
    </MTableHead>
  );
}

interface UserRowProps<T> {
  isSelected?: boolean;
}

interface TRowProps<T> {
  rowData: T;
  columns: Column<T>[];
  rowId: React.ReactText;
  onClick: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  userProps: UserRowProps<T>;
}

function TRow<T>(props: TRowProps<T>) {
  const { rowData, rowId, columns, onClick, userProps } = props;
  return (
    <MTableRow
      hover={true}
      selected={userProps.isSelected}
      data-id={rowId}
      onClick={onClick}
    >
      {columns.map(col => (
        <MTableCell key={col.id}>{col.renderCell(rowData)}</MTableCell>
      ))}
    </MTableRow>
  );
}

interface TableProps<T> extends MTableProps {
  data: T[];
  columns: ColumnDef<T>[];
  rowProps?: UserRowProps<T> | ((item: T) => UserRowProps<T>);
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

  getRowProps(item: T, index: number): UserRowProps<T> {
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
        <THead columns={displayColumns} />
        <MTableBody>
          {this.props.data.map((item, index) => {
            let id = this.getRowKey(item, index);
            return (
              <TRow
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
