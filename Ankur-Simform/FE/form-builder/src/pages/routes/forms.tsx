import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../../components/PageHeader';
import FormList from '../../components/ListForms'

const Forms: React.FC = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push('/addForm')
  }, [history])

  return (
    <div>
      <Header heading="Forms" btnText="Add Form" onClick={handleClick} />
      <FormList />
    </div>
  )
}

export default Forms;