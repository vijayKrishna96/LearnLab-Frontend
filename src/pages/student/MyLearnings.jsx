import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ALL_COURSE_BY_USERID } from "../../Utils/Constants/Api";

const MyLearnings = () => {
  const { userId } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${ALL_COURSE_BY_USERID}/${userId}`); 
        setCourses(response?.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [userId]);

  console.log(courses);

  return (
    <div className="container mx-auto min-h-screen px-4">
      <h1 className="text-3xl m-5 md:m-10 font-semibold">Learnings</h1>

      {courses.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-xl font-medium mb-4">Purchase a course and Start Learning</h2>
          <p className="text-gray-600">Explore our catalog and find the perfect course for you.</p>
        </div>
      ) : (
        <div className="m-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div key={course._id} className="w-full mx-auto md:mx-0">
              <img
                src={course.image.url}
                alt={course.title}
                className="w-full h-auto"
              />
              <div className="p-1">
                <h4 className="font-semibold text-lg md:text-xl">
                  {course.title}
                </h4>
                <p className="text-sm md:text-base mt-2">{course.description}</p>
                <hr className="my-3" />

                <div className="flex justify-between items-center text-sm md:text-base px-2">
                  <Link to={`/student/${userId}/learning/${course._id}`}>
                    <button className="px-6 py-2 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700">
                      Continue Learning
                    </button>
                  </Link>
                  <p>Rating: {course.averageRating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearnings;
