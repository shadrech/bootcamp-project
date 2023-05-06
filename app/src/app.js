import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { StudentList } from "./components/student-list";
import { StudentCreateEdit } from "./components/student-create-edit";
import './css/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StudentList />
  }, {
    path: '/students/create',
    element: <StudentCreateEdit />
  }, {
    path: '/students/edit/:id',
    element: <StudentCreateEdit />
  }
])

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2 className="header">CodeMonya Bootcamp</h2>
        <RouterProvider router={router} />
      </div>
    );
  }
}

export default App;
