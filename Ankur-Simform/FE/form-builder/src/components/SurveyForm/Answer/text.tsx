import React, { useCallback, useState } from 'react';
import {
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ANSWER_TYPES } from '../../../constants/appConstants';

const useStyles = makeStyles((theme) => ({
  answerTextField: {
    width: '100%'
  }
}));

interface PropTypes {
  onAnswer: (answerType: string, options?: string | string[], text?: string) => void;
}

const TextAnswer = ({ onAnswer }: PropTypes) => {
  const classes = useStyles();

  const [answer, setAnswer] = useState<string>('')

  const handleAnswer = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
    onAnswer(ANSWER_TYPES.text, undefined, event.target.value)
  }, [setAnswer, onAnswer])

  return (
    <>
      <TextField required className={classes.answerTextField} label="Answer" value={answer} onChange={handleAnswer} />
    </>
  )
}

export default TextAnswer;