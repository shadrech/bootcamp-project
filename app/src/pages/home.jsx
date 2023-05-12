import React from "react";
import { Link } from 'react-router-dom';
import { Nav } from '../components/nav.jsx';

export function Home() {
  return (
    <>
      <Nav />
      <section className="home">
        <div className="text">
          <h1>Welcome to CodeMonya</h1>
          <h4>This is a simple app which you can create students, course and subsequently enroll a student to a course and assign them a grade. The principles we will learn in this pair programming exercise will help cement our knowledge on how a basic node application can be setup</h4>
        </div>
        <img src="/background.png" alt="Computer" />
      </section>
      <div className="bottom">
        <Link className="course-view-btn" to="/courses">view courses</Link>
      </div>
    </>
  )
}
