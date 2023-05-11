import React from "react";

export const Course = (props) => {
  const { course } = props
  
  return (
    <div className="course">
      <div className="item image" alt="Random Profile" style={{ backgroundImage: `url(${course.imageUrl})` }} />
      <div className="item info">
        <h2 className="title">{course.title}</h2>
        <p className="description">{course.description}</p>
      </div>
    </div>
  );
}
