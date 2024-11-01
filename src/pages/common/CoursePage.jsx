import axios from "axios";
import React, { useEffect, useState } from "react";
import { COURSE_BY_ID_API } from "../../Utils/Constants/Api";
import { useParams } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cartSlice";

function CoursePage() {
  const courseId = useParams();

  // console.log(courseId.id)

  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${COURSE_BY_ID_API}/${courseId.id}`);
        console.log(response?.data);
        setCourseData(response?.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError("Failed to load categories");
      }
    };
    fetchCourseData();
  }, []);

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="bg-primary p-6 min-h-screen">
      <div className="container mx-auto mt-10">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-6 text-center mb-8">
          <h1 className="text-4xl font-bold">{courseData?.title}</h1>
          <p className="mt-4 text-gray-600 mx-auto">
            {courseData?.description}
          </p>
        </div>

        {/* Image Section */}
        <div className="relative mb-12">
          <img
            src={courseData?.image?.url}
            alt={courseData?.title}
            className="w-full h-[40vh] object-fill rounded-lg filter blur-sm"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white rounded-lg">
            <CiLock size={48} className="mb-4" />
            <button className="px-6 py-2 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700"
            onClick={()=> {dispatch(addItemToCart(courseData))}}
            >
              Unlock and Start Learning
            </button>
          </div>
        </div>

        {/* Course Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData?.modules?.map((module) => (
            <div
              key={module._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-blue-600">
                {module.moduleNumber.toString().padStart(2, "0")}
              </h2>
              <h3 className="text-xl font-semibold mt-4">{module?.title}</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                {module?.lessons.map((lesson, lessonIndex) => (
                  <li
                    key={lesson?._id || lessonIndex}
                    className="hover:bg-gray-50 p-2 rounded"
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
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-600">Price</p>
              <p className="font-bold">
                ₹{courseData?.price?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Modules</p>
              <p className="font-bold">{courseData?.modules?.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Rating</p>
              <p className="font-bold">
                {courseData?.averageRating || "No ratings yet"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Reviews</p>
              <p className="font-bold">{courseData?.reviews?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
