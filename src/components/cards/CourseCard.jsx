/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

function CourseCard({role, course}) {


  return (
    <article className="flex flex-col items-center max-w-xs sm:max-w-sm lg:max-w-md bg-white shadow-lg rounded-lg overflow-hidden m-1">
      <Link to={`${role}/coursepage/${course?._id}`}>
        <img
          className="h-[150px] sm:h-[180px] w-full object-fill"
          src={course?.image?.url}
          alt="Course Image"
        />
        <p className="p-1 text-sm sm:text-base text-gray-700 line-clamp-2">
          {course?.description}
        </p>
        <div className="w-full grid grid-cols-2 gap-2 sm:gap-4 p-2 border-t border-gray-200 text-center ">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            {course?.averageRating}
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-600">
          &#8377; {course?.price}
          </span>
        </div>
        <hr className="custom-line w-[90%] h-[1px] rounded-lg mx-auto mt-2 bg-primarybtn" />
      </Link>
      <div className="w-full grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4 border-t border-gray-200 text-center ">
        <span className="text-xs sm:text-sm font-medium text-gray-600">
          Modules {course?.modules.length}
        </span>
        <button className="p-1 sm:px-2 mx-2 sm:mx-3 border-none rounded-full cursor-pointer bg-primarybtn text-white text-xs sm:text-sm">
          Add+
        </button>
      </div>
    </article>
  );
}

export default CourseCard;
