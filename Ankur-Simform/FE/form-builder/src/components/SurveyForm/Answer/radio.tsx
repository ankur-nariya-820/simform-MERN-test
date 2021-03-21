import React, { useCallback } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { ANSWER_TYPES } from '../../../constants/appConstants';

interface PropTypes {
  onAnswer: (answerType: string, options?: string | string[], text?: string) => void;
  options: any[];
  answer?: any;
}

const RadioAnswer = ({ onAnswer, options, answer }: PropTypes) => {
  const handleChange = useCallback((event) => {
    onAnswer(ANSWER_TYPES.radio, event.target.value, undefined)
  }, [onAnswer])
  
  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup name="form-answer-radio" value={answer && answer.option} onChange={handleChange}>
          {
            options.map(option => {
              return <FormControlLabel key={option._id} value={option._id} control={<Radio color="primary" />} label={option.text} />
            })
          }
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default RadioAnswer;