import React, { useCallback, useState } from 'react';
import {
  Dialog,
  Button
} from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '../Dialog/DialogTitle';
import QuestionContent from './QuestionContent';
import { ANSWER_TYPES } from './../../constants/appConstants';
import {
  updateQuestions
} from '../../actions';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDialog-paper": {
      borderBottomColor: "#F09EA2",
    },
  },
  btnGroup: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(1.5, 3)
  },
  contentMain: {
    minHeight: 100,
    marginBottom: 10,
  },
  confirmTitle: {
    display: "flex",
    marginBottom: 20,
  },
  saveBtn: {
    marginLeft: theme.spacing(2)
  }
}));

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(
      2,
    )}px ${theme.spacing(2)}px`,
    borderTop: "none",
    overflowX: "hidden",
  },
}))(MuiDialogContent);

interface PropTypes {
  open: boolean;
  onClose: () => void;
}

const AddQuestion = ({ open, onClose }: PropTypes) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isSaveDisabled, setSaveDisabled] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<object>({
    question: '',
    answerType: '',
    options: []
  })

  const {
    draftQuestions
  } = useSelector((state: any) => state.questions);

  const handleAddQuestionValidation = useCallback((question: string, answerType: string, options: string[]) => {
    if (!question || !answerType) {
      setSaveDisabled(true)
    } else if ((answerType === ANSWER_TYPES.checkboxes) && (options.length <= 0)) {
      setSaveDisabled(true)
    } else if ((answerType === ANSWER_TYPES.radio) && (options.length <= 0)) {
      setSaveDisabled(true)
    } else {
      setFormValues({ question, answerType, options })
      setSaveDisabled(false)
    }
  }, [setSaveDisabled, setFormValues])

  const handleSaveQuestion = useCallback(() => {
    const newQuestion = {...formValues, id: draftQuestions.length + 1}
    const questions = [...draftQuestions, newQuestion]
    dispatch(updateQuestions(questions));
    onClose()
  }, [formValues, draftQuestions, dispatch, onClose])

  return (
    <div>
      <Dialog
        fullWidth={true}
        onClose={onClose}
        aria-labelledby="add-question-dialog"
        open={open}
        className={classes.root}
      >
        <DialogTitle id="add-question-dialog-title" onClose={onClose}>
          Add Question
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.contentMain}>
            <QuestionContent handleValidation={handleAddQuestionValidation} />
          </div>
        </DialogContent>
        <div className={classes.btnGroup}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.saveBtn}
            onClick={handleSaveQuestion}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default AddQuestion;