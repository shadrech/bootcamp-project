import React from "react";
import { Link } from "react-router-dom";
import { Student } from "./student";
import { studentApi } from '../api/students';

export const StudentList = () => {
  const [students, setStudents] = React.useState([])

  const fetchStudents = async () => {
    const { students } = await studentApi.fetchAll()
    setStudents(students)
  }

  React.useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div className="app-wrapper">
      <Link to="/students/create" className="add-btn"><i className="fa fa-plus" aria-hidden="true"></i></Link>
      {students.map(student => <Student key={student.id} student={student} />)}
    </div>
  );
}
