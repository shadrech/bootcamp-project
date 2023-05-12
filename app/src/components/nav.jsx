import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav>
      <Link to="/"><img className="header" src="/codemonya.png" alt="CodeMonya Logo" /></Link>
      <div>
        <Link to="/students">Students</Link>
        <Link to="/courses">Courses</Link>
      </div>
    </nav>
  )
}
