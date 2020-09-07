import { ReactNode } from 'react';

import { TableCellProps as ColumnRenderProps } from '@material-ui/core/TableCell';

type RenderFn<T, V> = (value: V, item: T) => ReactNode;

type AccessorFn<T, V> = (item: T) => V;

interface ColumnDefCommon<T, V> {
  title?: ReactNode;
  render?: RenderFn<T, V>;
  primary?: boolean;
  hidden?: boolean;
  props?: ColumnRenderProps;
}

export interface ColumnDefAccessor<T, V> extends ColumnDefCommon<T, V> {
  accessor: AccessorFn<T, V>;
  id: string;
}

export interface ColumnDefField<T, V> extends ColumnDefCommon<T, V> {
  accessor: Extract<keyof T, string>;
  id?: string;
}

export type ColumnDef<T, V> = ColumnDefAccessor<T, V> | ColumnDefField<T, V>;

function isColumnDefField<T, V>(
  colDef: ColumnDef<T, V>
): colDef is ColumnDefField<T, V> {
  return typeof colDef.accessor === 'string';
}

function identity<T>(t: T) {
  return t;
}

export class Column<T, V> {
  private _id: string | Extract<keyof T, string | number>;
  private _title: string | React.ReactNode;
  private _accessor: AccessorFn<T, V>;
  private _hidden: boolean;
  private _props: ColumnRenderProps;

  private _renderCell: (value: V, item: T) => React.ReactNode;

  constructor(def: ColumnDef<T, V>) {
    this._hidden = Boolean(def.hidden);
    this._props = def.props || {};
    if (isColumnDefField(def)) {
      this._id = def.id ? def.id : def.accessor;
      this._accessor = (d: T) => (d[def.accessor] as unknown) as V;
    } else {
      this._id = def.id;
      this._accessor = def.accessor as AccessorFn<T, V>;
    }
    this._title = typeof def.title === 'string' ? def.title : this._id;
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

  get props(): ColumnRenderProps {
    return this._props;
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
