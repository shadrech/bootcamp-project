import React from "react";
import { CourseForm } from "../components/course-form.jsx";
import { Nav } from '../components/nav.jsx';

export function CourseCreate() {
  return (
    <>
      <Nav />
      <div className="app-wrapper">
        <h3 className="page-title">Create New Course</h3>
        <hr />
        <CourseForm />
      </div>
    </>
  )
}
