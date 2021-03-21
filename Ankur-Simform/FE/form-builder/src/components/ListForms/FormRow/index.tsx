import React, { useCallback } from "react";
import {
  TableRow,
  TableCell,
  Link
} from "@material-ui/core";
import { mediumDateTimeFormat } from '../../../services/util';

export type PropTypes = {
  row: any;
  handleUrlClick: (url: string) => void;
}

const FormRow = ({ row, handleUrlClick }: PropTypes) => {
  const handleClick = useCallback(() => {
    handleUrlClick(row.url)
  }, [handleUrlClick, row.url])

  return (
    <TableRow
      hover
      tabIndex={-1}
      key={row.name}
    >
      <TableCell
        component="th"
        scope="row"
        padding="default"
      >
        {row.name}
      </TableCell>
      <TableCell align="left">
        <Link style={{ cursor: 'pointer' }} onClick={handleClick}>
          {row.url}
        </Link>
      </TableCell>
      <TableCell align="left">
        {row.createdAt ? mediumDateTimeFormat(row.createdAt) : '-'}
      </TableCell>
      <TableCell align="center">
        {row.responses}
      </TableCell>
    </TableRow>
  );
};

export default FormRow;
