import React, { useEffect, useState } from "react";
import CourseCard from "../../components/cards/CourseCard";
import CourseCarousel from "../../components/carousels/CourseCarousel";
import { useParams } from "react-router-dom";


import axios from "axios";
import {
  ALL_CATEGORY_API,
  ALL_COURSE_API,
  USER_DETAILS_API,
} from "../../Utils/Constants/Api";


const HomePage = () => {

  const [userData, setUserData] = useState(null);
  const { userId } = useParams(); // Destructure userId from useParams
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(ALL_CATEGORY_API); // Replace with your categories API endpoint
        setCategories([{ _id: "all", name: "All" }, ...response.data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        let url = ALL_COURSE_API;
        // if (selectedCategory !== 'all') {
        //   url += `?category=${selectedCategory}`;
        // }
        console.log(selectedCategory, "selected");
        url =
          selectedCategory === "all"
            ? url
            : `${url}?category=${selectedCategory}`;
        const response = await axios.get(url);
        console.log(response, "cateww");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${USER_DETAILS_API}/${userId} `);
        console.log("User details response:", response.data[0]);
        setUserData(response.data[0]);
        // Handle the response data as needed (e.g., set it in state)
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle the error (e.g., show an error message)
      }
    };

    if (userId) {
      fetchUserDetails(); // Call the async function if userId is available
    }
  }, [userId]);

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  const userRole = userData?.role;

  return (
    <>
      {/* Hero */}
      <section>
        <div className="h-[50vh] max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="flex gap-6 mt-10 items-center px-4 xl:px-0 sm:px-20">
            <img
              className="h-12 w-12 rounded-full"
              src="https://th.bing.com/th/id/OIP.ELavGv-PyFA24ucQcJthawHaNc?rs=1&pid=ImgDetMain"
              alt=""
            />
            <div>
              {userData && (
                <h3 className="text-lg sm:text-xl font-semibold">
                  Welcome, {userData.name} {/* Use userData.name */}
                </h3>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-5">
            <div className="search-bar flex flex-col sm:flex-row justify-center items-center w-full sm:w-4/5 rounded-lg mx-auto">
              <input
                type="text"
                className="rounded-full p-3.5 pl-6 w-full sm:w-[30rem] md:w-[40rem] lg:w-[48rem] bg-[#f8f8f8] mb-4 sm:mb-0"
                placeholder="Search course"
              />
              <button className="px-4 sm:py-3 mx-5 rounded-full bg-primarybtn text-white border-none cursor-pointer">
                Search
              </button>
            </div>

            {/* Image and Content */}
            <div className="relative mt-10">
              <div className="absolute bg-white top-16 sm:top-28 left-4 sm:left-16 sm:p-10 rounded-md">
                <h1 className="text-xl sm:text-3xl font-semibold mb-5">
                  Learning that gets you
                </h1>
                <p className="text-sm sm:text-base">
                  Skills for your present (and your future).
                  <br />
                  Get started with us.
                </p>
              </div>
              <img
                className="w-full object-cover h-40 sm:h-auto"
                src="https://s.udemycdn.com/browse_components/billboard/fallback_banner_image_udlite.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section>
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="flex flex-col justify-center items-center mt-20 ">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
              Our Online Courses
            </h2>
            <hr className="custom-line w-16 sm:w-20 h-2 rounded-lg mx-auto mt-2 bg-[#ed145b]" />
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap gap-4 sm:gap-8 lg:gap-16 mt-10 justify-center">
              {categories.map((category) => (
                <button
                  key={category._id}
                  className={`px-4 py-2 font-semibold ${
                    selectedCategory === category._id
                      ? "bg-secondarybtn"
                      : "text-gray-500"
                  } rounded`}
                  onClick={() => setSelectedCategory(category._id)}
                >
                  {category.name}
                  {/* {type.charAt(0).toUpperCase() + type.slice(1)} */}
                </button>
              ))}
            </div>

            {/* Course Grid Section */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-5 mt-10">
              {/* {renderCategory()} */}
            </div>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-5 mt-10">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      role={userRole}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No courses available in this category
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="h-[40vh] container mx-auto mt-14">
          <h2 className="text-xl font-medium">Recomended For You</h2>
          <div>
            <CourseCarousel />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
