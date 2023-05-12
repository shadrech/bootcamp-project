import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import './css/index.css';
import { StudentList } from "./pages/student-list";
import { StudentCreateEdit } from "./pages/student-create-edit";
import { CourseList } from './pages/course-list';
import { CourseCreate } from './pages/course-create';
import { Home } from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/students',
    element: <StudentList />
  }, {
    path: '/students/create',
    element: <StudentCreateEdit />
  }, {
    path: '/students/edit/:id',
    element: <StudentCreateEdit />
  },
  {
    path: '/courses',
    element: <CourseList />
  },
  {
    path: '/courses/create',
    element: <CourseCreate />
  },
])

const App = () => <RouterProvider router={router} />;

export default App;
