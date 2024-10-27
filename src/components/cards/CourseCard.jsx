import React from "react";
import { Link } from "react-router-dom";

function CourseCard({role , course}) {

  console.log("role-->",role , course , "--<datas")

  return (
    <article className="flex flex-col items-center max-w-xs sm:max-w-sm lg:max-w-md bg-white shadow-lg rounded-lg overflow-hidden m-1">
      <Link to={`${role}/coursepage`}>
        <img
          className="h-[150px] sm:h-[180px] w-full object-fill"
          src="https://th.bing.com/th/id/OIP.Z4tXagFBE2WF80e2ORhIIgHaE7?rs=1&pid=ImgDetMain"
          alt="Course Image"
        />
        <p className="p-1 text-sm sm:text-base text-gray-700 line-clamp-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum,
          quibusdam.
        </p>
        <div className="w-full grid grid-cols-2 gap-2 sm:gap-4 p-2 border-t border-gray-200 text-center ">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            Rating
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            Price
          </span>
        </div>
        <hr className="custom-line w-[90%] h-[1px] rounded-lg mx-auto mt-2 bg-primarybtn" />
      </Link>
      <div className="w-full grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4 border-t border-gray-200 text-center ">
        <span className="text-xs sm:text-sm font-medium text-gray-600">
          Lessons
        </span>
        <button className="p-1 sm:px-2 mx-2 sm:mx-3 border-none rounded-full cursor-pointer bg-primarybtn text-white text-xs sm:text-sm">
          Add+
        </button>
      </div>
    </article>
  );
}

export default CourseCard;
