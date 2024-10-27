import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const courses = {
  all: [
    {
      id: 1,
      category: "Adventure Sports",
      title: "Fear Of Driving And Automatic Negative Thoughts",
      lessons: 12,
      time: "3 hr 30 min",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      category: "Sales and Operations",
      title: "Work more, Earn more while sitting at your home",
      lessons: 23,
      time: "1 hr 30 min",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      category: "Marketing",
      title: "Foundation course to understand about Software",
      lessons: 23,
      time: "1 hr 30 min",
      image: "https://via.placeholder.com/150",
      isNew: true,
    },
  ],
  draft: [
    {
      id: 1,
      category: "Adventure Sports",
      title: "Fear Of Driving And Automatic Negative Thoughts",
      lessons: 12,
      time: "3 hr 30 min",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      category: "Sales and Operations",
      title: "Work more, Earn more while sitting at your home",
      lessons: 23,
      time: "1 hr 30 min",
      image: "https://via.placeholder.com/150",
    },
  ],
  archived: [],
};

const MyCourses = () => {
  const [tab, setTab] = useState("all");

  const { userId } = useParams();
  console.log(userId)

  const renderCourses = () => {
    let filteredCourses = [];

    switch (tab) {
      case "all":
        filteredCourses = courses.all || [];
        break;
      case "published":
        filteredCourses = courses.published || [];
        break;
      case "draft":
        filteredCourses = courses.draft || [];
        break;
      case "archived":
        filteredCourses = courses.archived || [];
        break;
      default:
        filteredCourses = [];
    }

    return filteredCourses.length > 0 ? (
      filteredCourses.map((course) => (
        <div key={course.id} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={course.image}
            alt={course.title}
            className="h-32 w-full object-cover rounded-t-lg"
          />
          <div className="p-2">
            <h2 className="text-gray-600 font-semibold">{course.category}</h2>
            <h3 className="text-xl font-bold">{course.title}</h3>
            <div className="flex justify-between text-gray-500 mt-2">
              <span>{course.lessons} Lessons</span>
              <span>{course.time}</span>
            </div>
            {course.isNew && (
              <span className="text-green-500 font-semibold mt-2">New</span>
            )}
          </div>
        </div>
      ))
    ) : (
      <p>No Data available</p>
    );
  };

  return (
    <div className="min-h-screen  p-8 container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Courses</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        {["all", "published", "draft", "archived"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 font-semibold ${
              tab === type ? " bg-secondarybtn" : "text-gray-500"
            } rounded`}
            onClick={() => setTab(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Render Courses based on selected tab */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {renderCourses()}
      </div>

      {/* Add Button */}
      <Link className="fixed bottom-12 right-12 bg-primarybtn text-white rounded-full w-16 h-16 text-3xl flex justify-center items-center" to={`/instructor/mycourses/addcourse/${userId}`}>
        +
      </Link>
    </div>
  );
};

export default MyCourses;
