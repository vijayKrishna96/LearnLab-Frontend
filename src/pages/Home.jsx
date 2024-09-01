import React from "react";

import { RxNotionLogo } from "react-icons/rx";
import { CgDesignmodo } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { LuMonitorPlay } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { Link } from "react-router-dom";
import Feedback from "../components/cards/Feedback";
import Instructors from "../components/carousels/Instructors";
import CourseCard from "../components/cards/CourseCard";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="Hero bg-[#fddde6]">
        <div className="pt-44 h-[94vh] container mx-auto ">
          <div className=" h-[60%] flex items-center justify-between p-36 bg-[#1c1c1e] text-white rounded-lg">
            <div className=" max-w-1/2">
              <h1 className="text-5xl leading-tight">
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
            <div className="hero-image">
              <img
                className="w-[200px] h-[200px] rounded-full border-3 border-dashed border-[#ed145b] p-2"
                src="https://via.placeholder.com/170"
                alt="Hero"
              />
            </div>
          </div>
          <div className="search-bar flex justify-center w-4/5 py-5 bg-[#f8f8f8] rounded-lg my-[-30px] mx-auto">
            <input
              type="text"
              className="rounded-full p-3.5 w-[48rem]"
              placeholder="search course"
            />
            <button
              className=" px-8  mx-5 rounded-full 
              bg-[#ed145b] text-white border-none cursor-pointer"
            >
              Search
            </button>
          </div>
          <div className=" h-32 mt-28 flex justify-around text-6xl items-center">
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
          <div className="grid grid-cols-3 justify-center gap-52 mt-20 w-full">
            <div className="flex gap-10 justify-center  bg-[#fddde6] p-14 rounded-lg">
              <LuMonitorPlay className="text-5xl bg-white rounded-full p-2" />
              <div>
                <h3 className="text-2xl font-semibold">1200+</h3>
                <p>SpecialCourse</p>
              </div>
            </div>
            <div className="flex gap-10 justify-center  bg-[#fddde6] p-14 rounded-lg">
              <PiStudentFill className="text-5xl bg-white rounded-full p-2" />
              <div>
                <h3 className="text-2xl font-semibold">12500+</h3>
                <p>Enrolled Students</p>
              </div>
            </div>
            <div className="flex gap-10 justify-center  bg-[#fddde6] p-14 rounded-lg">
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
        <div className="h-[100vh] container mx-auto" id="courseSection" >
          <div className="flex flex-col justify-center items-center mt-20 ">
            <h2 className="text-4xl font-semibold leading-tight">
              Most selling Courses
            </h2>
            <hr className="custom-line w-20 h-2 rounded-lg mx-auto mt-2 bg-[#ed145b]" />
          </div>
          <div className="flex flex-col items-center ">
            <div className="grid grid-cols-4 gap-x-16 gap-y-5 mt-10">
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="bg-[#fddde6] h-[80vh]">
        <div className="pt-20 mt-10 container mx-auto">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-semibold leading-tight">
              Expert Instructors
            </h2>
            <hr className="custom-line w-20 h-2 rounded-lg mx-auto mt-2 bg-[#ed145b]" />
          </div>
          <div className="mt-10">
            <Instructors />
          </div>
        </div>
      </section>

      {/* Student Feedback */}
      <section className="h-[90vh]">
        <div className="pt-10 container mx-auto">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-semibold leading-tight">
              Student Feedback
            </h2>
            <hr className="custom-line w-20 h-2 rounded-lg mx-auto mt-2 bg-[#ed145b]" />
          </div>
          <div className="flex justify-end mr-28">
            <Link className=" bg-gray-200 p-2 rounded-md text-sm">
              View All
            </Link>
          </div>
          <div className="flex items-center justify-center mt-16">
            <div className="grid grid-cols-2 gap-x-40 gap-y-24 mt-10">
              <Feedback />
              <Feedback />
              <Feedback />
              <Feedback />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
