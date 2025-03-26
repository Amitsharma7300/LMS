import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";

import Home from "./Pages/Student/Home";
import CoursesList from "./Pages/Student/CoursesList";
import CourseDetails from "./Pages/Student/CourseDetails";
import MyEnrollments from "./Pages/Student/MyEnrollments";
import Player from "./Pages/Student/Player";
import Loading from "./components/Student/Loading";
import Educator from "./Pages/Educator/Educator";
import Dashboard from "./Pages/Educator/Dashboard";

import MyCourses from "./Pages/Educator/MyCourses";
import StudentsEnrolled from "./Pages/Educator/StudentsEnrolled";
import AddCourse from "./Pages/Educator/AddCourse";
import Navbar from "./components/Student/Navbar";
import "quill/dist/quill.snow.css";



const App = () => {


const isEducatorRoute=useMatch('/educator/*');

  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar />}
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Course-List" element={<CoursesList />} />
        <Route path="/Course-List/:input" element={<CoursesList />} />
        <Route path="/Course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/Player/:courseId" element={<Player />} />
        <Route path="/Loading/:Path" element={<Loading />} />
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="Add-course" element={<AddCourse />} />
          <Route path="My-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />/
        </Route>
      </Routes>
    </div>
  );
};

export default App;
