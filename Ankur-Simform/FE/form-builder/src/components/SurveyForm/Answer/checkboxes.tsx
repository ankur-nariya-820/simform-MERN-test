import React, { useCallback } from 'react';
import {
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { ANSWER_TYPES } from '../../../constants/appConstants';

interface PropTypes {
  onAnswer: (answerType: string, options?: string | string[], text?: string) => void;
  options: any[];
  answer?: any;
}

const CheckboxesAnswer = ({ onAnswer, options, answer }: PropTypes) => {
  const handleChange = useCallback((optionId: string) => {
    let tempAnswers = answer && answer.option && Array.isArray(answer.option) ? answer.option : []
    const index = tempAnswers.findIndex((tempAnswer: string) => tempAnswer === optionId)
    if(index !== -1) {
      tempAnswers = tempAnswers.filter((tempAnswer: string) => tempAnswer !== optionId)
    } else {
      tempAnswers.push(optionId)
    }
    onAnswer(ANSWER_TYPES.checkboxes, tempAnswers, undefined)
  }, [onAnswer, answer])

  return (
    <>
      {
        options.map(option => {
          return <FormGroup key={option._id} row>
            <FormControlLabel
              control={<Checkbox checked={answer && answer.option && answer.option.includes(option._id) ? true : false} onChange={() => handleChange(option._id)} color="primary" name={option._id} />}
              label={option.text}
            />
          </FormGroup>
        })
      }
    </>
  )
}

export default CheckboxesAnswer;