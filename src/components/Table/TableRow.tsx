import * as React from 'react';
import MTableRow, { TableRowProps as MTableRowProps } from '@material-ui/core/TableRow';
import MTableCell from '@material-ui/core/TableCell';

import { Column } from './Column';

export type UserRowProps = MTableRowProps;

export interface TableRowProps<T> {
  rowData: T;
  columns: Column<T>[];
  rowId: React.ReactText;
  onClick: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  userProps: UserRowProps;
}

export function TableRow<T>(props: TableRowProps<T>) {
  const { rowData, rowId, columns, onClick, userProps } = props;
  return (
    <MTableRow
      {...userProps}
      data-id={rowId}
      onClick={onClick}
    >
      {columns.map(col => (
        (
          <MTableCell
            key={col.id}
            {...col.props}
          >
            {col.renderCell(rowData)}
          </MTableCell>
        )
      ))}
    </MTableRow>
  );
}
