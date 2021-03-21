import React from 'react';
import {
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Answer from './Answer'

const useStyles = makeStyles((theme) => ({
  questionMain: {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`
  },
}));

interface PropTypes {
  question: any;
  index: number;
  answer?: any;
  handleSubmitResponse: (questionId: string, answerId?: string | string[], text?: string) => void;
};

const Question = ({ question, index, answer, handleSubmitResponse }: PropTypes) => {
  const classes = useStyles();

  return (
    <div className={classes.questionMain}>
      <div>
        <Typography variant="body1">{<b><i>Q{index}: </i></b>}{question.question}</Typography>
      </div>
      <div>
        <Typography variant="body1">{<b><i>Ans: </i></b>}</Typography>
        <Answer {...{questionId: question._id, answerType: question.answerType, options: question.options, answer, handleSubmitResponse}} />
      </div>
    </div>
  )
}

export default Question;