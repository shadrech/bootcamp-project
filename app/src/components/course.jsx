import React from "react";
import { Link, redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { studentApi } from '../api/students';

export const Course = (props) => {
  const { course } = props
  
  return (
    <div className="course">
      <img className="item" alt="Random Profile" src={`https://randomuser.me/api/portraits/${rand > 0.5 ? "women" : "men"}/${Math.floor(rand * 100)}.jpg`} />
      <div className="item info">
        <h2 className="title">{course.title}</h2>
        <p className="id">{course}</p>
      </div>
    </div>
  );
}
