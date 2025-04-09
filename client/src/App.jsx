import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";

import CoursesList from "./pages/student/CoursesList";
import CourseDetail from "./pages/student/CourseDetail";
import MyEnrollments from "./Pages/Student/MyEnrollments";
import Player from "./pages/student/Player";

import Navbar from "./components/student/Navbar";
import Loading from "./components/Student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import AddCourse from "./pages/educator/AddCourse";


import "quill/dist/quill.snow.css";
import { ToastContainer} from 'react-toastify';
const App = () => {

  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer/>
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Course-List" element={<CoursesList />} />
        <Route path="/Course-List/:input" element={<CoursesList />} />
        <Route path="/Course/:id" element={<CourseDetail />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/Player/:courseId" element={<Player />} />
        <Route path="/Loading/:Path" element={<Loading />} />
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="Add-course" element={<AddCourse/>} />
          <Route path="My-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={< StudentsEnrolled/>} />/
        </Route>
      </Routes>
    </div>
  );
};

export default App;
