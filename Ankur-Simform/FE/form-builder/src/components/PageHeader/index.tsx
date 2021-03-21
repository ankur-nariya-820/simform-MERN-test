import React from 'react';
import {
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    marginLeft: theme.spacing(2),
    textTransform: 'uppercase'
  }
}));


interface PropTypes {
  heading: string;
  onClick?: () => void;
  btnText?: any;
  disabled?: boolean;
}

const PageHeader = ({ heading, onClick, btnText, disabled }: PropTypes) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h2">{heading}</Typography>
      {btnText ? <Button variant="contained" color="primary" disabled={disabled} className={classes.button} onClick={onClick}>{btnText}</Button> : ''}
    </div>
  )
}

export default PageHeader;