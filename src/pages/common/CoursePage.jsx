import axios from "axios";
import React, { useEffect, useState } from "react";
import { COURSE_BY_ID_API, USER_DETAILS_API } from "../../Utils/Constants/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../features/cartSlice";
import { selectUserCourses } from "../../features/userSlice";
import { TfiControlForward } from "react-icons/tfi";

function CoursePage() {
  const Id = useParams();
  console.log(Id)
  const userCourses = useSelector(selectUserCourses);
  // console.log(courseId.id)

  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [role , setRole] = useState(null)
  const isPurchased = userCourses.includes(courseData?._id);

  console.log(userCourses , "usr")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${COURSE_BY_ID_API}/${Id.id}`);
        // console.log(response?.data);
        setCourseData(response?.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError("Failed to load categories");
      }
    };
    fetchCourseData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try{
        const response = await axios.get(`${USER_DETAILS_API}/${Id.userId}`)
        setRole(response.data[0].role) 
      }catch(error){
        console.log(error)
      }
    }
    fetchUserData();
  },[Id.userId])

  // In your component
useEffect(() => {
  window.scrollTo(0, 0);
}, []); // Empty dependency array means this runs once when component mounts

  console.log(role)

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  

  return (
    <div className=" p-6 min-h-screen" id="AboutusContact">
      <div className="container mx-auto mt-10">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-6 text-center mb-8" >
          <h1 className="text-4xl font-bold" id="Text">{courseData?.title}</h1>
          <p className="mt-4 text-gray-600 mx-auto" id="Text">
            {courseData?.description}
          </p>
        </div>

        {/* Image Section */}
        <div className="relative mb-12">
          <img
            src={courseData?.image?.url}
            alt={courseData?.title}
            className={`w-full h-[40vh] object-fill rounded-lg ${
              !isPurchased ? "filter blur-sm" : ""
            }`}
          />
          {isPurchased &&(
              <div className="absolute inset-0 flex flex-col items-center justify-center  text-white rounded-lg">
              <Link to={`/${role}/${Id.userId}/learning/${courseData._id}`}>
              <button className="bg-blue-600 w-56 h-14 rounded-xl flex justify-center items-center gap-4">Continue Learning <TfiControlForward /> </button>
              </Link>
            </div>
          )
          }
          {!isPurchased && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white rounded-lg">
              <CiLock size={48} className="mb-4" />
              <button
                className="px-6 py-2 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700"
                onClick={() => {
                  dispatch(addItemToCart({...courseData, userId: Id.userId, qty: 1 }));
                  navigate(`/${role}/cart/${Id.userId}`)
                }}
              >
                Unlock and Start Learning
              </button>
            </div>
          )}
        </div>

        {/* Course Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData?.modules?.map((module) => (
            <div
              key={module._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              id="Tags"
            >
              <h2 className="text-2xl font-bold text-blue-600">
                {module.moduleNumber.toString().padStart(2, "0")}
              </h2>
              <h3 className="text-xl font-semibold mt-4" id="Text">{module?.title}</h3>
              <ul className="mt-4 space-y-3 text-gray-700" id="Text">
                {module?.lessons.map((lesson, lessonIndex) => (
                  <li
                    key={lesson?._id || lessonIndex}
                    className="hover:bg-white p-2 rounded"
                  >
                    <p className="font-medium">{lesson?.title}</p>
                    <p className="text-sm text-gray-500">
                      Lesson {(lessonIndex + 1).toString().padStart(2, "0")} •{" "}
                      {lesson?.duration || "45 Minutes"} Min
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Course Info Footer */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md" id="Tags">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="Text">
            <div>
              <p className="text-gray-600" id="Text">Price</p>
              <p className="font-bold">
                ₹{courseData?.price?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600" id="Text">Modules</p>
              <p className="font-bold">{courseData?.modules?.length}</p>
            </div>
            <div>
              <p className="text-gray-600" id="Text">Rating</p>
              <p className="font-bold">
                {courseData?.averageRating || "No ratings yet"}
              </p>
            </div>
            <div>
              <p className="text-gray-600" id="Text">Reviews</p>
              <p className="font-bold">{courseData?.reviews?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
