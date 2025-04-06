import React, { useContext, useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Student/Loading";
import { AppContext } from "../../context/AppContext";



const Dashboard = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null); // Corrected variable name
  const [courses, setCourses] = useState(null);

  const fetchDashboardData = async () => {
    console.log('Fetching dashboard data...');
    setDashboardData(dummyDashboardData);
    console.log('Dashboard data:', dummyDashboardData);
  };

  const fetchEducatorCourses = async () => {
    console.log('Fetching courses...');
    console.log('All courses:', allCourses);
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchDashboardData();
    fetchEducatorCourses();
  }, [allCourses]);

  console.log('Courses:', courses);

  return dashboardData && courses ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.patients_icon} alt="patients_icon" /> {/* Corrected img tag */}
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.enrolledStudentsData.length} {/* Corrected syntax */}
              </p>
              <p className="text-base text-gray-500">Total Enrolments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.appointments_icon} alt="appointments_icon" /> {/* Corrected img tag */}
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {courses.length} {/* Corrected syntax */}
              </p>
              <p className="text-base text-gray-500">Total courses</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.earning_icon} alt="earning_icon" /> {/* Corrected img tag */}
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {currency}
                {courses.reduce((total, course) => total + Math.floor(course.enrolledStudents.length * (course.coursePrice - (course.discount * course.coursePrice / 100))), 0)} {/* Corrected syntax */}
              </p>
              <p className="text-base text-gray-500">Total Earning</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="pb-4 text-lg font-medium">Latest Enrollments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">S.No</th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-7 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>

                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='w-full'>
          <h2 className="pb-4 text-lg font-medium">My Courses</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
            <table className='md:table-auto table-fixed w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold truncate'>All courses</th>
                  <th className='px-4 py-3 font-semibold truncate'>Earning</th>
                  <th className='px-4 py-3 font-semibold truncate'>Students</th>
                  <th className='px-4 py-3 font-semibold truncate'>Published On</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {courses.map((course) => (
                  <tr key={course._id} className="border-b border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <img src={course.courseThumbnail} alt="Course Image" className="w-16" />
                      <span className="truncate hidden md:block">{course.courseTitle}</span>
                    </td>
                    <td className="px-4 py-3">{currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - (course.discount * course.coursePrice / 100)))}</td>
                    <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                    <td className="px-4 py-3">{new Date(course.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;