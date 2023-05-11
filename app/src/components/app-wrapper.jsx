import React from 'react'
import { Link } from 'react-router-dom'

export const AppWrapper = (props) => {
  return (
    <div className="App">
      <nav>
        <h2 className="header">CodeMonya Bootcamp</h2>
        <div>
          <Link to="/students">Students</Link>
          <Link to="/courses">Courses</Link>
        </div>
      </nav>
      <div className="app-wrapper">
        {props.children}
      </div>
    </div>
  )
}
