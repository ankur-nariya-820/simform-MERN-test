import React from "react";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: '100%'
  },
  content: {
    flex: "1 0 auto",
    padding: theme.spacing(1, 2, 0, 2),
  },
}));

const PageLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={clsx(classes.root)}>
        <div className={classes.content}>{children}</div>
      </main>
    </div>
  );
};

export default PageLayout;
