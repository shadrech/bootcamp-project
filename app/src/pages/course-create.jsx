import React from "react";
import { CourseForm } from "../components/course-form.jsx";
import { AppWrapper } from '../components/app-wrapper.jsx';

export function CourseCreate() {
  return (
    <AppWrapper>
      <h3>Create New Course</h3>
      <hr />
      <CourseForm />
    </AppWrapper>
  )
}
