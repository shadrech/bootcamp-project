import React from "react";
import { useNavigate } from 'react-router-dom';
import { courseApi } from '../api/course';

export const CourseForm = () => {
  const navigate = useNavigate()
  const [state, setState] = React.useState({
    title: '',
    description: '',
    imageUrl: '',
  })

  const handleFormSubmit = async () => {
    await courseApi.create(state)
    navigate('/courses')
  }

  const handleCancel = () => {
    return navigate('/courses')
  }

  const handleInputChange = (evt, key) => {
    setState(currentState => ({
      ...currentState,
      [key]: evt.target.value
    }));
  }

  return (
    <div className="custom-form">
      <input type="text" name="title" value={state.title} placeholder="Title" onChange={evt => handleInputChange(evt, "title")} />
      <textarea type="text" name="description" value={state.description} placeholder="Description" onChange={evt => handleInputChange(evt, "description")} rows={5} />
      <input type="text" name="imageUrl" value={state.imageUrl} placeholder="Image Url" onChange={evt => handleInputChange(evt, "imageUrl")} />
      <div className="form-submit">
        <button onClick={handleFormSubmit}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
