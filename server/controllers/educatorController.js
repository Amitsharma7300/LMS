import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";

// Update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    // Ensure `req.auth.userId` is available
    const userId = req.auth?.userId;
    if (!userId) {
      return res.json({ success: false, message: "A valid user ID is required" });
    }

    // Update the user's metadata
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({
        success: false,
        message: "thumbnail not attached",
      });
    }
    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();
    res.json({ success: true, message: "Course Added" });
  } catch (error) {}
}


//get educator courses
export const getEducatorCourses = async(req,res)=>{
  try {
   const educator = req.auth.userId
   const courses=await Course.find({educator})
   res.json({success:true,courses})
  } catch (error) {
   res.json({success  :false,message:error.message}) 
  }
}

// get educator Dashboard data
export const EducatorDashboardData=async()=>{
  try {
    const educator =req.auth.userId;
    const courses=await Course.find({educator});
    const totalCourses=courses.length;

    const courseIds=courses.map(Course=>Course._id)

// calculate total earning
const purchases=await Purchase.find({
  courseId:{$in:courseIds},
  status:'completed'

});
const totalEarning=purchases.reduce((Sum,purchase)=>sum+purchase.amount,0);
//collect unique enrolled student ids with course titles
const enrolledStudentsData=[];
for(const course of courses){
  const students=await User.find({
    _id:{$in:course.enrolledStudents}
  },'name imageUrl');
  students.forEach(student => {
    enrolledStudentsData.push({courseTitle:course.courseTitle,
      student
    })
    
  });
}
res.json({success:true,dashboardData:{
  totalEarning,enrolledStudentsData,totalCourses
}})
  } catch (error) {
    res.json({success:false, message:error.message})
  }
}

//get enrolled Students data with Purchase Data

export const getEnrolledStudentsData=async(req,res)=>{
  try {
    const educator=req.auth.userId;
    const courses=await Course.find({educator});
    const courseIds=courses.map(courses=>course._id);

    const purchases=await purchase.find({
      courseId:{$in: courseIds},
      status:'completed'
    }).populate('userId','name imageUrl').populate('courseId','courseTitle')

    const enrolledStudents=purchase.map(purchase=>({
      student:purchase.userId,
      courseTitle:purchase.courseId.courseTitle,
      purchaseDate:purchase.createAt

    }));

    res.json({success:true,enrolledStudents})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}