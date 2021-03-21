import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  tableHeadRoot: {
    borderBottom: "2px solid",
    borderBottomColor: "rgba(58,14,151,0.5)",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableCellOverride: {
    height: 48,
    paddingTop: `${theme.spacing(1)}px !important`,
    paddingBottom: `${theme.spacing(1)}px !important`,
  },
}));

export type Order = "asc" | "desc";

export type HeadCell = {
  disablePadding: boolean;
  id: string;
  label: string;
  align: "left" | "right" | "center";
  sortEnabled: boolean;
  width: string;
}

type TableHeadProps = {
  onRequestSort?: (
    event: React.MouseEvent<unknown>,
    property: any,
  ) => void;
  order?: Order;
  orderBy?: string;
  headCells: Array<HeadCell>;
}

const TableHeader = (props: TableHeadProps) => {
  const classes = useStyles();

  const {
    order,
    orderBy,
    headCells,
    onRequestSort,
  } = props;
  const createSortHandler = (property: any) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort && onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.tableHeadRoot}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ width: headCell.width }}
            className={classes.tableCellOverride}
          >
            {headCell.sortEnabled ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                IconComponent={ArrowDropDownIcon}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;