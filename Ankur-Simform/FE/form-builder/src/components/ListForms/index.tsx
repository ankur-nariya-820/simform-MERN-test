import React, { useCallback, useMemo, useState, useEffect } from 'react';
import TableHeader from '../../components/TableComponents/TableHeader';
import type { HeadCell  } from "../../components/TableComponents/TableHeader";
import FormRow from "./FormRow";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getForms
} from '../../actions'
import { useDispatch, useSelector } from 'react-redux';


interface Data {
  id: string;
  name: string;
  url: string;
  createdAt: number;
  responses: number
}

type Order = "asc" | "desc";

const HEAD_CELLS: HeadCell[] = [
  {
    id: "name",
    align: "left",
    disablePadding: false,
    sortEnabled: true,
    label: "Form Name",
    width: "25%",
  },
  {
    id: "url",
    align: "left",
    disablePadding: false,
    sortEnabled: false,
    label: "URL",
    width: "50%",
  },
  {
    id: "createdAt",
    align: "left",
    disablePadding: false,
    sortEnabled: true,
    label: "Created At",
    width: "15%",
  },
  {
    id: "responses",
    align: "left",
    disablePadding: false,
    sortEnabled: false,
    label: "Responses",
    width: "10%",
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


const ListForms = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    data,
    total,
    loading
  } = useSelector((state: any) => state.forms);

  useEffect(() => {
    dispatch(getForms({page, rowsPerPage, orderBy, order}));
  }, [dispatch, page, rowsPerPage, orderBy, order ])

  const headCells = useMemo(() => {
    return HEAD_CELLS;
  }, []);

  const handleRequestSort = useCallback((
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }, [orderBy, order]);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleUrlClick = useCallback((url: string) => {
    window.open(url, "_blank")
  }, [])

  let body;
  if (loading) {
    body = (
      <TableBody>
        <TableRow style={{ height: 53 }}>
          <TableCell
            style={{ textAlign: "center", fontSize: "16px" }}
            colSpan={4}
          >
            <CircularProgress />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  } else {
    let emptyMessageRow;
    let formRows;
    if (!data || data.length <= 0) {
      emptyMessageRow = (
        <TableRow style={{ height: 53 }}>
          <TableCell
            style={{ textAlign: "left", fontSize: "16px" }}
            colSpan={4}
          >
            No results found.
          </TableCell>
        </TableRow>
      );
    } else if (data) {
      formRows = data.map((row: Data) => {
        return <FormRow key={row.id} row={row} handleUrlClick={handleUrlClick} />
      })
    }

    body = (
      <TableBody>
        {emptyMessageRow}
        {formRows}
      </TableBody>
    );
  }

  return (
    <div className={classes.rootTable}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            // stickyHeader={true}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="forms table"
          >
            <TableHeader
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            {body}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default ListForms;