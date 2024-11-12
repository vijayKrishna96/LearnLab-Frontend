import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ALL_COURSE_API,
  ALL_COURSE_BY_USERID,
} from "../../Utils/Constants/Api";
import { CiEdit } from "react-icons/ci";
import { SlEye } from "react-icons/sl";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUserCourses } from "../../features/userSlice";

const MyCourses = () => {
  const [tab, setTab] = useState("all");
  const [courses, setCourses] = useState({
    all: [],
    published: [],
    draft: [],
    archived: [],
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allcourses, setAllCourses] = useState([]);

  const { userId } = useParams();

  const userCourses = useSelector(selectUserCourses) || [];

  const myLearnings = allcourses.filter((course) =>
    userCourses.includes(course._id)
  );

  useEffect(() => {
    const courseList = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${ALL_COURSE_BY_USERID}/${userId}`);

        setCourses({
          all: response.data || [],
          published: response.data.published || [],
          draft: response.data.draft || [],
          archived: response.data.archived || [],
          MyLearnings: myLearnings || [],
        });
      } catch (error) {
        console.log("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    courseList();
  }, [userId]);

  useEffect(() => {
    const allCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${ALL_COURSE_API}`);
        setAllCourses(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    allCourses();
  }, []);

  const handleDeleteCourse = async () => {
    if (!selectedCourseId) return;
    try {
      await axios.delete(`${ALL_COURSE_API}/${selectedCourseId}`);
      setCourses((prev) => ({
        ...prev,
        [tab]: prev[tab].filter((course) => course._id !== selectedCourseId),
      }));
      setShowPopup(false);
      setSelectedCourseId(null);
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };

  const renderCourses = () => {
    const filteredCourses = courses[tab] || [];

    return filteredCourses.length > 0 ? (
      filteredCourses.map((course) => (
        <div
          key={course._id}
          className="bg-white shadow-md rounded-lg p-4 relative"
          id="Tags"
        >
          <img
            src={course.image?.url}
            alt={course.title}
            className="h-56 w-full object-fill rounded-t-lg"
          />

          <Link to={`/instructor/${userId}/mycourse/edit/${course._id}`}>
            <button className="absolute top-8 text-black right-8 p-2 rounded-full text-3xl bg-sky-300 hover:bg-sky-500">
              <CiEdit />
            </button>
          </Link>
          <button
            className="absolute top-24 text-white right-8 p-2 rounded-full text-3xl bg-primarybtn hover:bg-red-700"
            onClick={() => {
              setShowPopup(true);
              setSelectedCourseId(course._id);
            }}
          >
            <MdOutlineDeleteOutline />
          </button>
          <Link to={`/instructor/${userId}/learning/${course._id}`}>
          <button className="absolute top-40 text-black right-8 p-2 rounded-full text-3xl bg-secondarybtn hover:bg-white">
          <SlEye />
          </button>
          </Link>
          <div className="p-2">
            <h2 className="text-gray-600 font-semibold" id="Text">
              {course.category?.name}
            </h2>
            <h3 className="text-xl font-bold" id="Text">
              {course.title}
            </h3>
            <p className="text-gray-500 mt-2 line-clamp-2" id="Text">
              {course.description}
            </p>
            <div className="flex justify-between text-gray-500 mt-2" id="Text">
              <span>Rating: {course.averageRating}</span>
              <span>Price: ${course.price}</span>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No Data available</p>
    );
  };

  const renderMyLearnings = () => {
    return myLearnings.length > 0 ? (
      <div className="m-10  mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {myLearnings.map((course) => (
          <div key={course._id} className="w-full mx-auto md:mx-0 shadow-md rounded-md">
            <img
              src={course.image.url}
              alt={course.title}
              className="w-full h-56"
            />
            <div className="p-3">
              <h4 className="font-semibold text-lg md:text-xl">
                {course.title}
              </h4>
              <p className="text-sm md:text-base mt-2 line-clamp-2">{course.description}</p>
              <hr className="my-3" />
              <div className="flex justify-between items-center text-sm md:text-base px-2">
                <Link to={`/instructor/${userId}/learning/${course._id}`}>
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
    ) : (
      <div className="text-center mt-20">
        <h2 className="text-xl font-medium mb-4">
          Purchase a course and Start Learning
        </h2>
        <p className="text-gray-600">
          Explore our catalog and find the perfect course for you.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8 container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Courses</h1>

      <div className="flex space-x-4 mb-8" id="Switch">
        {["all", "published", "draft", "archived", "MyLearnings"].map(
          (type) => (
            <button
              key={type}
              className={`px-4 py-2 font-semibold ${
                tab === type ? "bg-secondarybtn" : "text-gray-500"
              } rounded`}
              id="Switch"
              onClick={() => setTab(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          )
        )}
      </div>

      {isLoading ? (
        <div className="w-full h-[50vh] flex items-center justify-center text-xl">
          <span className="loading loading-infinity loading-lg text-info"></span>
        </div>
      ) : (
        <>
          {tab === "MyLearnings" ? (
            <div className="">
              {renderMyLearnings()}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-10 max-w-7xl mx-auto">
              {renderCourses()}
            </div>
          )}
        </>
      )}

      <Link
        className="fixed bottom-12 right-12 bg-primarybtn hover:bg-red-700 text-white rounded-full w-16 h-16 text-3xl flex justify-center items-center"
        to={`/instructor/${userId}/mycourse/add`}
      >
        +
      </Link>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this course?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
                onClick={handleDeleteCourse}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
