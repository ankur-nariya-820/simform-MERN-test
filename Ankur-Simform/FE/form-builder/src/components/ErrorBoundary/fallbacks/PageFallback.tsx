import React from "react";

import WarningIcon from "@material-ui/icons/Warning";
import { Grid, Typography } from "@material-ui/core";
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

type FallbackProps = {
  eventId: string;
  name?: string;
};

const PageFallback: React.FC<FallbackProps> = ({ eventId }) => {
  const classes = useStyles();

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
        <WarningIcon fontSize="large" color="error" className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography variant="h6" align="center">
          We apologize, there was an error while trying to load the page.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color="textSecondary" align="center">
          Please refresh the page to try again
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageFallback;
