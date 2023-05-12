import React from "react";
import { useNavigate } from 'react-router-dom';
import { studentApi } from '../api/students';

export const StudentForm = ({ student }) => {
  const navigate = useNavigate()
  const [state, setState] = React.useState({
    name: '',
    email: ''
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (student) {
      await studentApi.update(student.id, state)
    } else {
      await studentApi.create(state.name, state.email)
    }
    return navigate('/students')
  }

  const handleCancel = () => {
    return navigate('/students')
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
    <div className="custom-form">
      <input type="text" name="name" value={state.name} placeholder="Name" onChange={evt => handleInputChange(evt, "name")} />
      <input type="text" name="email" value={state.email} placeholder="Email" onChange={evt => handleInputChange(evt, "email")} />
      <div className="form-submit">
        <button onClick={handleFormSubmit}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
