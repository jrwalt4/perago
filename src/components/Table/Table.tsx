import * as React from 'react';
import MTable, { TableProps as MTableProps } from '@material-ui/core/Table';
import MTableBody from '@material-ui/core/TableBody';
import MTableRow from '@material-ui/core/TableRow';
import MTableHead from '@material-ui/core/TableHead';
import MTableCell from '@material-ui/core/TableCell';

type RenderFn<T, V> = (value: V, item: T) => React.ReactNode;

// type IdFn<T> = (item: T) => string;

type AccessorFn<T, V= {}> = (item: T) => V;

export type ColumnDefAccessor<T, V> = {
  title: string | React.ReactNode;
  render?: RenderFn<T, V>;
  accessor: AccessorFn<T>;
  id: string;
};

export type ColumnDefField<T, V> = {
  title: string | React.ReactNode;
  render?: RenderFn<T, V>;
  accessor: Extract<keyof T, string>;
  id?: string;
};

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

  private _renderCell: (value: V, item: T) => React.ReactNode;

  constructor(def: ColumnDef<T, V>) {
    this._title = def.title;
    if (isColumnDefField(def)) {
      this._id = def.accessor;
      this._accessor = (d: T) => (d[def.accessor] as unknown) as V;
    } else {
      this._id = def.id;
      this._accessor = def.accessor as AccessorFn<T, V>;
    }
    if (typeof def.render === 'function') {
      this._renderCell = def.render;
    } else {
      this._renderCell = identity;
    }
  }
  get id() {
    return this._id;
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

interface TRowProps<T> {
  rowData: T;
  columns: Column<T>[];
  key: string | number;
}

function TRow<T>(props: TRowProps<T>) {
  const { rowData, columns } = props;
  return (
    <MTableRow>
      {columns.map(col => (
        <MTableCell key={col.id}>{col.renderCell(rowData)}</MTableCell>
      ))}
    </MTableRow>
  );
}

interface TableProps<T> extends MTableProps {
  data: T[];
  columns: ColumnDef<T>[];
  rowKey?: (row: T) => string | number;
}

interface TableState<T> {
  columns: Column<T>[];
}

export class Table<T> extends React.Component<
  TableProps<T>,
  TableState<T>
  > {
  static getDerivedStateFromProps<T>(
    props: TableProps<T>,
    state: TableState<T>
  ): TableState<T> {
    return {
      columns: props.columns.map(colDef => new Column(colDef))
    };
  }

  getRowKey(item: T) {
    return this.props.rowKey && this.props.rowKey(item);
  }

  render() {
    return (
      <MTable>
        <THead columns={this.state.columns} />
        <MTableBody>
          {this.props.data.map((item, index) => {
            return (
              <TRow
                columns={this.state.columns}
                rowData={item}
                key={this.getRowKey(item) || index}
              />
            );
          })}
        </MTableBody>
      </MTable>
    );
  }
}
