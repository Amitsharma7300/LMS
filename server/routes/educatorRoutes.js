import express from 'express'
import { addCourse, EducatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import protectEducator from '../middlewares/authMiddleware.js'

const educatorRouter=express.Router()

//add educator Role
educatorRouter.get('/update-role',updateRoleToEducator)
educatorRouter.post('/add-course',upload.single('courseimage'),
protectEducator,addCourse)
educatorRouter.get('/courses',protectEducator,getEducatorCourses)
educatorRouter.get('/dashboard',protectEducator,EducatorDashboardData)
educatorRouter.get('/enrolled-students',protectEducator,getEnrolledStudentsData)
export default educatorRouter;