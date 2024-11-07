import axios from "axios";
import React, { useEffect, useState } from "react";
import { COURSE_BY_ID_API } from "../../Utils/Constants/Api";
import { useParams } from "react-router-dom";

const LearningPage = () => {
  const [data, setData] = useState("");
  const Id = useParams();

  const [openModule, setOpenModule] = useState(null);

  const { title, description, modules } = data;

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${COURSE_BY_ID_API}/${Id.id}`);
        setData(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseData();
  }, [Id.id]);

  console.log(modules);

  return (
    <div className="flex h-screen " >
      {/* Left Side: Video Player */}
      <div className="flex-1 bg-white p-6" id="Tags">
        <video controls className="w-full h-auto rounded-lg shadow-md">
          <source src="your-video-source.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2 className="mt-4 text-xl font-semibold" id="Text">{title}</h2>
        <p className="text-gray-500 mt-2" id="Text">{description}</p>
      </div>

      {/* Right Side: Modules and Lessons */}
      <div className="w-1/3 bg-gray-50 p-6 overflow-y-auto" id="Tags">
        <h3 className="text-lg font-bold mb-4" id="Text">Lessons</h3>
        {modules?.map((module, index) => (
          <div key={module._id} className="mb-4">
            {/* Module Header */}
            <div
              className="flex justify-between items-center p-5 bg-white rounded-lg shadow cursor-pointer"
              id="InputBg"
              onClick={() => toggleModule(index)}
            >
              <h4 className="font-semibold text-lg" id="Text">{module.title}</h4>
              <svg
                className={`w-5 h-5 transition-transform ${
                  openModule === index ? "rotate-180" : ""
                }`}
                
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Lesson List (Dropdown) */}
            {openModule === index && (
              <div className="mt-2 ml-4 space-y-2">
                {module.lessons.map((lesson) => (
                  <div key={lesson._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-green-600"
                      id="Text"
                      checked={false} // Set to false to ensure all checkboxes are unchecked
                      readOnly
                    />
                    <span className="text-lg text-gray-700" id="Text">
                      {lesson.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
