import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Youtube from 'react-youtube'
import { AppContext } from '../../context/AppContex'

const Player = () => {
 
 
  const {enrolledCourses,calculateChapterTime}=useContext(AppContext)
  const {courseId}=useParams()
  const[courseData,setCourseData]=useState(null)
  const[openSections,setOpenSections]=useState({})
  const[playerData,setPlayerData]=useState(null)



 const getCourseData=()=>{
  enrolledCourses.map((course)=>{
    if(course._id===courseId){
      setCourseData(course)
    }
  })
 }

 const toggleSection = (index) => {
  setOpenSections((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};

 useEffect(()=>{
  getCourseData
 },[])


  return (


  <>
    {/* left column */}
    <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
      <div className='text-gray-800'>
        <h2 className="text-xl font-semibold">Course Structure</h2>
        <div className="pt-5">
                      {courseData && courseData.courseContent.map((chapter, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 bg-white mb-2 rounded"
                        >
                          <div
                            className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                            onClick={() => toggleSection(index)}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                className={`transform transition-transform ${
                                  openSections[index] ? "rotate-90" : ""
                                }`}
                                src={assets.down_arrow_icon}
                                alt="arrow_icon"
                              />
                              <p className="font-medium md:text-base text-sm">
                                {chapter.chapterTitle}
                              </p>
                            </div>
                            <p className="text-sm md:text-default">
                              {chapter.chapterContent.length} lectures -{" "}
                              {calculateChapterTime(chapter)}
                            </p>
                          </div>
                          <div
                            className={`overflow-hidden transition-all duration-500 ${
                              openSections[index] ? "max-h-96" : "max-h-0"
                            }`}
                          >
                            <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                              {chapter.chapterContent.map((lecture, i) => (
                                <li key={i} className="flex items-start gap-2 py-1">
                                  <img
                                    src={false ? assets.blue_tick_icon :assets.play_icon}
                                    alt="play_icon"
                                    className="w-4 h-4 mt-1"
                                  />
                                  <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                                    <p>{lecture.lectureTitle}</p>
                                    <div className="flex gap-2">
                                      {lecture.isPreviewFree && (
                                        <p
                                         onClick={()=>setPlayerData({videoId:lecture.lectureUrl.split('/').pop()})} className="text-blue-500 cursor-pointer">
                                          Preview
                                        </p>
                                      )}
                                      <p>
                                        {humanizeDuration(
                                          lecture.lectureDuration * 60 * 1000,
                                          { units: ["h", "m"] }
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
      </div>
    </div>
    {/* right column */}
    <div>
      {playerData?(<div>
<YouTube videoId={playerData.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName="w-full aspect-video"/>
      </div>) 
      :
      <img src={courseData ? courseData.courseThumbnail : ''} alt="" />}
    </div>
</>
  )
}

export default Player