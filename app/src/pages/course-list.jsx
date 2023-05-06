import React from "react";
import { Link } from "react-router-dom";
import { Student } from "../components/student";
import { courseApi } from '../api/course';

export const CourseList = () => {
  const [courses, setCourses] = React.useState([])

  const fetchCourses = async () => {
    const { courses } = await courseApi.fetchAll()
    setCourses(courses)
  }

  React.useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div className="app-wrapper">
      <Link to="/courses/create" className="add-btn"><i className="fa fa-plus" aria-hidden="true"></i></Link>
      {courses.map(student => <Student key={student.id} student={student} />)}
    </div>
  );
}
