import React from "react";
import { Link, redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { studentApi } from '../api/students';

export const Student = (props) => {
  const { student } = props
  const rand = Math.random();

  const deleteUser = () => {
    confirmAlert({
      title: "Confirm delete",
      message: `Are you sure you want to delete ${student.name}?`,
      confirmLabel: "Yes",
      cancelLabel: "No",
      onConfirm: async () => {
        await studentApi.delete(student.id)
        redirect('/')
      },
      onCancel: () => console.log("SPARE 'EM'!")
    });
  }
  
  return (
    <div className="user">
      <img className="item" alt="Random Profile" src={`https://randomuser.me/api/portraits/${rand > 0.5 ? "women" : "men"}/${Math.floor(rand * 100)}.jpg`} />
      <div className="item info">
        <p className="name">{student.name}</p>
        <p className="email">{student.email}</p>
      </div>
      <div className="item user-buttons">
        <Link className="user-btn edit" to={`/students/edit/${student.id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
        <div className="user-btn delete" onClick={deleteUser}><i className="fa fa-trash" aria-hidden="true"></i></div>
      </div>
    </div>
  );
}
