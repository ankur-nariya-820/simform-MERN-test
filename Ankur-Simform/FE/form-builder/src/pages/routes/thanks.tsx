import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    height: "3em",
    width: "3em",
  },
  buttonContainer: {
    marginTop: "1em",
  },
}));

const Forms: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const goToForms = useCallback(() => {
    history.push('/')
  }, [history])

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "80vh" }}
      className={classes.root}
    >
      <Grid item>
        <CheckCircleOutlineIcon fontSize="large" color="secondary" className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography variant="h6" align="center">
          Your response recorded successfully.
        </Typography>
        <Typography variant="h6" align="center">
          Thanks for submitting the response. 
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" className={classes.buttonContainer} onClick={goToForms}>Go to Forms!</Button>
      </Grid>
    </Grid>
  );
}

export default Forms;