import React, { useCallback } from "react";
import {
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  removeQuestion: {
    color: 'red',
    cursor: 'pointer'
  }
}));

export type PropTypes = {
  row: any;
  handleRemove: (_: string) => void;
  actionDisabled: boolean;
}

const FormRow = ({ row, handleRemove, actionDisabled }: PropTypes) => {
  const classes = useStyles();

  const handleClick = useCallback(() => {
    if(!actionDisabled) {
      handleRemove(row.id)
    }
  }, [handleRemove, row, actionDisabled])

  return (
    <TableRow
      hover
      tabIndex={-1}
      key={row.id}
    >
      <TableCell
        component="th"
        scope="row"
        padding="default"
      >
        {row.question}
      </TableCell>
      <TableCell align="left">
        {row.answerType}
      </TableCell>
      <TableCell align="left">
        {row.options && row.options.length > 0 ? row.options.join(",") : '-'}
      </TableCell>
      <TableCell align="left">
        <ClearIcon className={classes.removeQuestion} onClick={handleClick} />
      </TableCell>
    </TableRow>
  );
};

export default FormRow;
