import React, { useCallback, useEffect, useState } from 'react';
import {
  CircularProgress
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import Header from '../../components/PageHeader';
import SurveyForm from '../../components/SurveyForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  submitForm,
  submitFormReset,
  getForm,
  getFormReset
} from '../../actions'

type Responses = {
  question: string,
  option?: string | string[],
  text?: string
}

const AttendForm: React.FC = () => {
  const { accessToken } = useParams<any>();

  const dispatch = useDispatch();
  const history = useHistory();

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)
  const [responses, setResponses] = useState<Responses[]>([])

  const {
    formData,
    formDataLoading,
    loading,
    success
  } = useSelector((state: any) => state.fillupForm);

  useEffect(() => {
    dispatch(getForm(accessToken))

    // Clean up function
    return () => {
      dispatch(submitFormReset())
      dispatch(getFormReset())
    }
  }, [accessToken, dispatch])

  useEffect(() => {
    if(success) {
      history.push('/thanks')
    }
  }, [success, history])

  const handleValidateAndSubmitForm = useCallback((responses: Responses[]) => {
    let hasError = false
    if(!responses || responses.length !== formData.questions.length) {
      hasError = true
    } else {
      responses.forEach(item => {
        if(!item.question) {
          hasError = true
        } else if(!item.option && !item.text) {
          hasError = true
        }
      })
    }

    if(hasError) {
      setSubmitDisabled(true)
      setResponses([])
    } else {
      setResponses(responses)
      setSubmitDisabled(false)
    }
  }, [setSubmitDisabled, setResponses, formData && formData.questions && formData.questions.length])

  const handleSubmitForm = useCallback(() => {
    const payload = {
      formAccessToken: accessToken,
      response: responses
    }
    dispatch(submitForm(payload));
  }, [dispatch, accessToken, responses])

  let submitButtonText;
  if (loading || formDataLoading) {
    submitButtonText = <CircularProgress size={20} />
  } else {
    submitButtonText = "Submit Form"
  }

  let heading;
  if (loading || formDataLoading) {
    heading = "Loading ...."
  } else {
    heading = formData.name || "Fill UP Survey"
  }

  return (
    <div>
      <Header heading={heading} onClick={handleSubmitForm} btnText={submitButtonText} disabled={submitDisabled || loading || formDataLoading} />
      <SurveyForm {...{ formData, formDataLoading, handleValidateAndSubmitForm }} />
    </div>
  )
}

export default AttendForm;