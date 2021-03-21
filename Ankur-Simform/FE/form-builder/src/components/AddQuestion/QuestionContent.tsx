import React, { useCallback, useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ANSWER_TYPES } from './../../constants/appConstants';

const useStyles = makeStyles((theme: Theme) => ({
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2)
  },
  formControl: {
    width: '100%',
    '& .MuiInput-multiline': {
      maxHeight: 'unset'
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(3)
  }
}));

interface PropTypes {
  handleValidation: (question: string, answerType: string, options: string[]) => void;
}

const QuestionContent = ({ handleValidation }: PropTypes) => {
  const classes = useStyles();
  
  const [question, setQuestion] = useState<string>('');
  const [answerType, setAnswerType] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [optionsValue, setOptionsValue] = useState<string>('');

  const handleQuestionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
    handleValidation(event.target.value, answerType, options);
  }, [setQuestion, handleValidation, answerType, options])

  const handleAnswerTypeChange = useCallback(event => {
    setAnswerType(event.target.value);
    handleValidation(question, event.target.value, options)
  }, [setAnswerType, handleValidation, question, options])

  const handleChange = useCallback((event) => {
    setOptionsValue(event.target.value);
    let optionsToValidate = event.target.value.split("\n");
    optionsToValidate = optionsToValidate.filter((item: string) => item)
    setOptions(optionsToValidate);
    handleValidation(question, answerType, optionsToValidate);
  }, [setOptionsValue, setOptions, handleValidation, question, answerType])

  const menuItems = Object.keys(ANSWER_TYPES).map((answerType: string) => {
    return <MenuItem key={answerType} value={ANSWER_TYPES[answerType]}>{ANSWER_TYPES[answerType]}</MenuItem>
  })

  let optionsContent;
  if (answerType === ANSWER_TYPES.checkboxes || answerType === ANSWER_TYPES.radio) {
    optionsContent = <div className={classes.formField}>
      <TextField
        id="options-textarea"
        label="Options"
        placeholder="Add options in separate line"
        className={classes.formControl}
        multiline
        value={optionsValue}
        onChange={handleChange}
      />
    </div>
  }

  return (
    <form className={classes.formRoot} noValidate autoComplete="off">
      <div className={classes.formField}>
        <TextField required className={classes.formControl} id="question" label="Question" value={question} onChange={handleQuestionChange} />
      </div>
      <div className={classes.formField}>
        <FormControl required className={classes.formControl}>
          <InputLabel id="answer-type">Answer Type</InputLabel>
          <Select
            labelId="answer-type-select"
            id="answer-type-select-required"
            value={answerType}
            onChange={handleAnswerTypeChange}
            className={classes.selectEmpty}
          >
            {menuItems}
          </Select>
        </FormControl>
      </div>
      {optionsContent}
    </form>
  )
}

export default QuestionContent;