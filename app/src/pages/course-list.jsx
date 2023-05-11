import React from "react";
import { Link } from "react-router-dom";
import { courseApi } from '../api/course';
import { Course } from '../components/course';
import { AppWrapper } from '../components/app-wrapper';

export const CourseList = () => {
  const [courses, setCourses] = React.useState([])

  const fetchCourses = async () => {
    const { courses } = await courseApi.fetchAll()
    setCourses(courses)
  }

  React.useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <AppWrapper>
      <Link to="/courses/create" className="add-btn"><i className="fa fa-plus" aria-hidden="true"></i><span>New Course</span></Link>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </AppWrapper>
  );
}
