import React from "react";
import { useParams } from "react-router-dom";

import { StudentForm } from "./student-form.jsx";
import { studentApi } from '../api/students.js';

export function StudentCreateEdit() {
  const params = useParams()
  const [student, setStudent] = React.useState()

  const fetchStudent = async () => {
    const { student } = await studentApi.fetchOne(params.id)
    setStudent(student)
  }

  React.useEffect(() => {
    if (params.id) {
      fetchStudent()
    }
  }, [])

  return (
    <div className="app-wrapper">
      {student ? <h3>Edit {student.name}'s profile</h3> : <h3>Create New Student</h3>}
      <hr />
      <StudentForm student={student} />
    </div>
  )
}
