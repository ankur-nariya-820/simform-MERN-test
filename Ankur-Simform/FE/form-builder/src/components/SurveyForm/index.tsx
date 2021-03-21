import React, { useCallback, useState } from 'react';
import {
  Typography,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ANSWER_TYPES } from '../../constants/appConstants';
import Question from './question'

const useStyles = makeStyles((theme) => ({
  formRoot: {
    padding: theme.spacing(4)
  },
  title: {
    textAlign: 'center'
  },
  titleHelperText: {
    textAlign: 'center',
    fontStyle: 'italic'
  },
  questionsRoot: {
    paddingTop: theme.spacing(2)
  }
}));

type Responses = {
  question: string,
  option?: string | string[],
  text?: string
}

interface PropTypes {
  formData: any,
  formDataLoading: boolean;
  handleValidateAndSubmitForm: (_: Responses[]) => void;
}

const SurveyForm = ({ formData, formDataLoading, handleValidateAndSubmitForm }: PropTypes) => {
  const classes = useStyles();

  const [responses, setResponses] = useState<Responses[]>([])

  const handleSubmitResponse = useCallback((questionId: string, answerId?: string | string[], text?: string) => {
    const tempResponses = [...responses]
    const index = tempResponses.findIndex(response => response.question === questionId)
    if (index !== -1) {
      const question = formData.questions.find((question: any) => question._id === questionId)
      if (question.answerType === ANSWER_TYPES.text) {
        tempResponses[index].text = text
      } else {
        tempResponses[index].option = answerId
      }
      setResponses(tempResponses)
      handleValidateAndSubmitForm(tempResponses)
    } else {
      const newResp = {
        question: questionId,
        option: answerId,
        text: text
      }
      const newResponses = [...responses, newResp]
      setResponses(responses => newResponses)
      handleValidateAndSubmitForm(newResponses)
    }
  }, [responses, setResponses, formData.questions, handleValidateAndSubmitForm])

  let questionsContent;
  if (formDataLoading) {
    questionsContent = <CircularProgress size={30} />
  } else if (formData && formData.questions && formData.questions.length > 0) {
    questionsContent = <div className={classes.questionsRoot}>
      {formData.questions.map((question: any, index: number) => {
        return <Question key={question._id} index={index + 1} question={question} answer={responses.find(response => response.question === question._id)} handleSubmitResponse={handleSubmitResponse} />
      })}
    </div>
  }

  return (
    <div className={classes.formRoot}>
      <Typography variant="h3" className={classes.title}>Questions</Typography>
      <Typography variant="body2" className={classes.titleHelperText}>(All questions are required*)</Typography>
      {questionsContent}
    </div>
  )
}

export default SurveyForm;