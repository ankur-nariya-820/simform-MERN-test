import React, { useCallback } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { ANSWER_TYPES } from '../../../constants/appConstants';
import TextAnswer from './text';
import CheckboxesAnswer from './checkboxes';
import RadioAnswer from './radio';

const useStyles = makeStyles((theme) => ({
  answerRoot: {
    padding: theme.spacing(2, 3),
    marginTop: theme.spacing(2)
  }
}));

interface PropTypes {
  questionId: string;
  answerType: string;
  options: any[];
  answer?: any;
  handleSubmitResponse: (questionId: string, answerId?: string | string[], text?: string) => void;
}

const Answer = ({ questionId, answerType, options, answer, handleSubmitResponse }: PropTypes) => {
  const classes = useStyles();

  const handleAnswer = useCallback((answerType: string, option?: string | string[], text?: string) => {
    if (answerType === ANSWER_TYPES.text) {
      handleSubmitResponse(questionId, undefined, text)
    } else if (answerType === ANSWER_TYPES.checkboxes || answerType === ANSWER_TYPES.radio) {
      handleSubmitResponse(questionId, option, undefined)
    }
  }, [handleSubmitResponse, questionId])

  let answerContent;
  if (answerType === ANSWER_TYPES.text) {
    answerContent = <TextAnswer onAnswer={handleAnswer} />
  } else if (answerType === ANSWER_TYPES.checkboxes) {
    answerContent = <CheckboxesAnswer options={options} answer={answer} onAnswer={handleAnswer} />
  } else if (answerType === ANSWER_TYPES.radio) {
    answerContent = <RadioAnswer options={options} onAnswer={handleAnswer} />
  }

  return (
    <div className={classes.answerRoot}>
      {answerContent}
    </div>
  )
}

export default Answer;