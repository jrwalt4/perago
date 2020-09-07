import * as React from 'react';

import MTableHead from '@material-ui/core/TableHead';
import MTableRow from '@material-ui/core/TableRow';
import MTableCell from '@material-ui/core/TableCell';

import { Column } from './Column';

export interface TableHeadProps {
  // tslint:disable-next-line: no-any
  columns: Column<any, any>[];
}

export function TableHead(props: TableHeadProps) {
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
