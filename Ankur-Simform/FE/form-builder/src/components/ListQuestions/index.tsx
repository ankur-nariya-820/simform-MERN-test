import React, { useCallback, useMemo } from 'react';
import TableHeader from '../../components/TableComponents/TableHeader';
import type { HeadCell } from "../../components/TableComponents/TableHeader";
import QuestionRow from "./QuestionRow";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import {
  updateQuestions
} from '../../actions';

interface Data {
  id: number;
  question: string;
  answerType: string;
  options: string[];
}

const HEAD_CELLS: HeadCell[] = [
  {
    id: "question",
    align: "left",
    disablePadding: false,
    sortEnabled: false,
    label: "Question",
    width: "40%",
  },
  {
    id: "answerType",
    align: "left",
    disablePadding: false,
    sortEnabled: false,
    label: "Answer Type",
    width: "15%",
  },
  {
    id: "options",
    align: "left",
    disablePadding: false,
    sortEnabled: false,
    label: "Options",
    width: "40%",
  },
  {
    id: "actions",
    align: "left",
    disablePadding: false,
    sortEnabled: false,
    label: "Action",
    width: "5%",
  }
];

const useStyles = makeStyles((theme) => ({
  rootTable: {
    marginTop: theme.spacing(3),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    boxShadow: "0px 1px 6px 0px #274868 25%",
  },
  table: {
    minWidth: 750,
  },
}));

interface PropTypes {
  actionDisabled: boolean;
}


const ListQuestions = ({ actionDisabled }: PropTypes) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    draftQuestions
  } = useSelector((state: any) => state.questions);

  const headCells = useMemo(() => {
    return HEAD_CELLS;
  }, []);

  const handleRemoveQuestion = useCallback((questionId: string) => {
    const questions = draftQuestions.filter((que: any) => que.id !== questionId)
    dispatch(updateQuestions(questions));
  }, [draftQuestions, dispatch])

  let body;
  let emptyMessageRow;
  let formRows;
  if (!draftQuestions || draftQuestions.length <= 0) {
    emptyMessageRow = (
      <TableRow style={{ height: 53 }}>
        <TableCell
          style={{ textAlign: "left", fontSize: "16px" }}
          colSpan={3}
        >
          No questions found.
        </TableCell>
      </TableRow>
    );
  } else if (draftQuestions) {
    formRows = draftQuestions.map((row: Data) => {
      return <QuestionRow key={row.id} actionDisabled={actionDisabled} row={row} handleRemove={handleRemoveQuestion}/>
    })
  }

  body = (
    <TableBody>
      {emptyMessageRow}
      {formRows}
    </TableBody>
  );

  return (
    <div className={classes.rootTable}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            // stickyHeader={true}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="questions table"
          >
            <TableHeader
              headCells={headCells}
            />
            {body}
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default ListQuestions;