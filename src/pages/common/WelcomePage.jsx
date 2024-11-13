import React, { useEffect, useState } from "react";
import { RxNotionLogo } from "react-icons/rx";
import { CgDesignmodo } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { LuMonitorPlay } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { Link } from "react-router-dom";
import Feedback from "../../components/cards/Feedback";

import CourseCard from "../../components/cards/CourseCard";
import {
  ALL_CATEGORY_API,
  ALL_COURSE_API,
  USER_DETAILS_API,
} from "../../Utils/Constants/Api";
import axios from "axios";
import { AppleCardsCarouselDemo } from "../../components/ui/apple-cards-carousel";

function Home() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(ALL_CATEGORY_API); // Replace with your categories API endpoint
        setCategories([{ _id: "all", name: "All" }, ...response.data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const getAllInstructors = async () => {
      try {
        const response = await axios.get(`${USER_DETAILS_API}/users`);
        const filteredInstructors = response.data.users.filter(
          (user) => user.role === "instructor"
        );
        setInstructors(filteredInstructors);
      } catch (error) {
        console.log(error);
      }
    };
    getAllInstructors();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        let url = ALL_COURSE_API;
        url =
          selectedCategory === "all"
            ? url
            : `${url}?category=${selectedCategory}`;
        const response = await axios.get(url);
        // console.log(response, "cateww");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  return (
    <>
      {/* Hero Section */}
      <section className="Hero bg-[#F5F7F8]" id="Hero">
        <div className="pt-10 lg:pt-44 h-[94vh] container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between  p-6 lg:p-36 bg-[#1c1c1e] text-white rounded-lg">
            <div className="max-w-full lg:max-w-1/2">
              <h1 className="text-4xl lg:text-5xl leading-tight">
                Learn new skill <span className="text-[#1ed760]">online</span>
                <br /> on your time
              </h1>
              <p className="my-5 text-base">
                Learn from Industry Experts and Enhance Your Skills
              </p>
              <button className="px-6 py-3.5 mr-2 border-none rounded-full cursor-pointer bg-[#ed145b] text-white">
                Get Started
              </button>
              <button className="px-6 py-3.5 mr-2 border-none rounded-full cursor-pointer bg-white text-[#ed145b]">
                ▶
              </button>
            </div>
            <div className="hero-image mt-10 lg:mt-0 md:mb-4">
              <img
                className="w-[200px] h-[200px] rounded-full border-3 border-dashed border-[#ed145b] p-2"
                src="https://tonyburgess1969.files.wordpress.com/2017/09/aaeaaqaaaaaaaaimaaaajgy4ntizytiyltlhnjutndljzs05yjziltfmnjkwztjjn2mzoa.jpg?w=378"
                alt="Hero"
              />
            </div>
          </div>
          <div className="search-bar flex flex-col md:flex-row justify-center w-3/4  py-5 bg-[#f8f8f8] rounded-lg my-10px lg:my-[-30px] mx-auto">
            <input
              type="text"
              className="rounded-full p-3.5 w-full md:w-[48rem] mb-4 "
              placeholder="search course"
            />
            <button
              className="px-8  rounded-full 
              bg-[#ed145b] text-white border-none cursor-pointer"
            >
              Search
            </button>
          </div>
          <div className="flex flex-wrap justify-around text-6xl items-center mt-20">
            <RxNotionLogo />
            <FaJsSquare className="text-[#ffbf00]" />
            <FaReact className="text-[#9bddff]" />
            <RiTailwindCssFill className="text-[#007fff]" />
            <CgDesignmodo />
          </div>
        </div>
      </section>

      {/* Tag */}
      <section className="container mx-auto">
        <div className="">
          <div className="flex flex-col justify-center items-center mt-20 ">
            <h2 className="text-4xl font-semibold leading-tight">
              Worlds Largest
            </h2>
            <h2 className="text-4xl font-semibold leading-tight">
              Selection Of Courses
            </h2>
            <hr className="custom-line w-20 h-2 rounded-lg mx-auto mt-2 bg-[#ed145b]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-8 sm:gap-14 lg:gap-28 mt-20 w-full">
            <div
              className="flex gap-10 justify-center  bg-[#F5F7F8] p-14 rounded-custom-shape shadow-md"
              id="Tags"
            >
              <LuMonitorPlay className="text-5xl bg-white rounded-full p-2" />
              <div>
                <h3 className="text-2xl font-semibold">1200+</h3>
                <p>SpecialCourse</p>
              </div>
            </div>
            <div
              className="flex gap-10 justify-center  bg-[#F5F7F8] p-14 rounded-custom-shape shadow-md "
              id="Tags"
            >
              <PiStudentFill className="text-5xl bg-white rounded-full p-2" />
              <div>
                <h3 className="text-2xl font-semibold">12500+</h3>
                <p>Enrolled Students</p>
              </div>
            </div>
            <div
              className="flex gap-10 justify-center  bg-[#F5F7F8] p-14 rounded-custom-shape shadow-md"
              id="Tags"
            >
              <GiTeacher className="text-5xl bg-white rounded-full p-2" />
              <div>
                <h3 className="text-2xl font-semibold">300+</h3>
                <p>Expert Instructors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section>
        <div className="container mx-auto mb-10" id="courseSection">
          <div className="flex flex-col justify-center items-center mt-20 ">
            <h2 className="text-4xl font-semibold leading-tight">
              Most selling Courses
            </h2>
            <hr className="custom-line w-20 h-2 rounded-lg mx-auto mt-2 bg-[#ed145b]" />
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
                  id="Switch"
                  onClick={() => setSelectedCategory(category._id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Course Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-5 mt-10">
              {loading ? (
                <div className="text-center col-span-full" id="Text">
                  Loading...
                </div>
              ) : (
                courses.length > 0 ? (
                  courses.map((course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No courses available in this category
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="bg-[#F5F7F8] py-20" id="Instructorsui">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-semibold leading-tight" id="Text">
              Expert Instructors
            </h2>
            <hr className="custom-line w-20 h-2 rounded-lg mx-auto mt-2 bg-[#ed145b]" />
          </div>
          <div className="mt-10">
            <AppleCardsCarouselDemo instructor={instructors} />
          </div>
        </div>
      </section>

      {/* Student Feedback */}
      <section>
        <div className="container mx-auto py-20">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-semibold leading-tight" id="Text">
              Student Feedback
            </h2>
            <hr className="custom-line w-20 h-2 rounded-lg mx-auto mt-2 bg-[#ed145b]" />
          </div>
          <div className="flex justify-end mr-4 lg:mr-28 mt-4">
            <Link className=" bg-gray-200 p-2 rounded-md text-sm " id="Tags">
              <span className="" id="Text">View All</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mt-16 ml-0 lg:ml-14">
            <Feedback />
            <Feedback />
            <Feedback />
            <Feedback />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;