import React from "react";
import { useNavigate } from 'react-router-dom';
import { studentApi } from '../api/students';

export const StudentForm = ({ student }) => {
  const navigate = useNavigate()
  const [state, setState] = React.useState({
    name: '',
    email: ''
  })

  const handleUpdate = async () => {
    await studentApi.update(student.id, state)
    return navigate('/')
  }

  const handleCreate = async () => {
    await studentApi.create(state.name, state.email)
    return navigate('/')
  }

  const handleFormSubmit = () => {
    if (student) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  const handleCancel = () => {
    return navigate('/')
  }

  const handleInputChange = (evt, key) => {
    setState(currentState => ({
      ...currentState,
      [key]: evt.target.value
    }));
  }

  React.useEffect(() => {
    if (student) {
      setState({
        name: student.name,
        email: student.email,
      })
    }
  }, [student])

  return (
    <div className="user-form">
      <input type="text" name="name" value={state.name} placeholder="Name" onChange={evt => handleInputChange(evt, "name")} />
      <input type="text" name="email" value={state.email} placeholder="Email" onChange={evt => handleInputChange(evt, "email")} />
      <div className="form-submit">
        <button onClick={handleFormSubmit}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
