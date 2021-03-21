import React, { useCallback, useState, useEffect } from 'react';
import {
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from '../../components/PageHeader';
import ListQuestions from '../../components/ListQuestions';
import AddQuestion from '../../components/AddQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  setAddFormReset,
  resetQuestions,
  addForm
} from '../../actions';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(10),
    textTransform: 'uppercase'
  },
  formName: {
    minWidth: 300
  }
}));


const AddForm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [formName, setFormName] = useState<string>('');
  const [isAddQuestionOpen, setAddQuestionOpen] = useState<boolean>(false);

  const {
    draftQuestions
  } = useSelector((state: any) => state.questions);

  const {
    loading,
    success
  } = useSelector((state: any) => state.addForm);

  // Clean up questions after adding form
  useEffect(() => {
    return () => {
      dispatch(setAddFormReset())
      dispatch(resetQuestions())
    }
  }, [dispatch])

  useEffect(() => {
    if(success) {
      history.push('/')
    }
  }, [success, history])

  const handleFormNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(event.target.value)
  }, [setFormName])

  const handleAddClick = useCallback(() => {
    setAddQuestionOpen(prevState => !prevState)
  }, [setAddQuestionOpen])

  const handleCloseDialog = useCallback(() => {
    setAddQuestionOpen(false)
  }, [setAddQuestionOpen])

  const handleSaveForm = useCallback(() => {
    const payload = {
      name: formName,
      questions: draftQuestions
    }
    dispatch(addForm(payload))
  }, [formName, draftQuestions, dispatch]);

  let submitButtonText;
  if(loading) {
    submitButtonText = <CircularProgress size={20} />
  } else {
    submitButtonText = "Add Form"
  }

  return (
    <div>
      <Header heading="Create Form" onClick={handleSaveForm} btnText={submitButtonText} disabled={!formName || !draftQuestions || draftQuestions.length <= 0 || loading} />
      <form className={classes.form} noValidate autoComplete="off">
        <TextField required className={classes.formName} id="form-name" label="Form Name" disabled={loading} value={formName} onChange={handleFormNameChange} />
        <Button variant="contained" color="primary" disabled={loading} className={classes.button} onClick={handleAddClick}>Add Question</Button>
      </form>
      <ListQuestions actionDisabled={loading}/>
      <AddQuestion
        open={isAddQuestionOpen}
        onClose={handleCloseDialog}
      />
    </div>
  )
}

export default AddForm;