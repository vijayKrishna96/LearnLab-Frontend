import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ALL_COURSE_API, ALL_COURSE_BY_USERID, USER_DETAILS_API } from '../../Utils/Constants/Api'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/cards/CourseCard'



const InstructorView = () => {
    const [courseData , setCourseData] = useState([])
    const [instructorData , setInstructorData] = useState([])
    const Id = useParams();


    console.log(Id)


    useEffect(()=> {
        const fetchCourseData = async()=>{
            try{
                const response = await axios.get(`${ALL_COURSE_BY_USERID}/${Id.id}`)
                console.log(response, "c")
                setCourseData(response?.data)
            }catch(error){
                console.log(error)
            }
        }

        fetchCourseData();
    },[Id.id])

    useEffect(()=> {
        const fetchInstructor = async()=>{
            try{
                const response = await axios.get(`${USER_DETAILS_API}/${Id.id}`)
                console.log(response , "I")
                setInstructorData(response?.data.users[0])
            }catch(error){
                console.log(error)
            }
        }

        fetchInstructor();
    },[Id.id])

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="max-w-7xl min-h-screen mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div className="flex items-start">
      <img src={instructorData?.profilePicture?.url}  className="w-32 h-32 rounded-full mr-8" />
      <div>
        <h1 className="text-4xl font-bold mb-2">{instructorData?.name}</h1>
        <p>{instructorData?.headline}</p>
        <div className="flex items-center mb-4">
          {/* <Ratin value={rating} className="mr-2" /> */}
          <span className="text-gray-500">{instructorData?.rating}</span>
        </div>
        <p className="text-gray-700 mb-8">{instructorData?.bio}</p>
      </div>
    </div>

    <h2 className="text-2xl font-bold mb-6">Courses</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {courseData?.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No courses yet</div>
      ) : (
        courseData?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))
      )}
    </div>
  </div>
  )
}

export default InstructorView