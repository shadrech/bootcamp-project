import React from "react";
import { Link } from "react-router-dom";
import { Student } from "../components/student";
import { studentApi } from '../api/students';
import { AppWrapper } from '../components/app-wrapper';

export const StudentList = () => {
  const [students, setStudents] = React.useState([])

  const fetchStudents = async () => {
    const { students } = await studentApi.fetchAll()
    setStudents(students)
  }

  const deleteStudent = (id) => {
    const idx = students.findIndex(student => id === student.id)
    setStudents([
      ...students.slice(0, idx),
      ...students.slice(idx + 1),
    ])
  }

  React.useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <AppWrapper>
      <Link to="/students/create" className="add-btn"><i className="fa fa-plus" aria-hidden="true"></i><span>New Student</span></Link>
      {students.map(student => (
        <Student
          key={student.id}
          student={student}
          deleteStudent={deleteStudent}
        />
      ))}
    </AppWrapper>
  );
}
