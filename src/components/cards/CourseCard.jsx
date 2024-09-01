import React from "react";

function CourseCard() {
  return (
    <article className="flex flex-col items-center max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="p-2 h-[200px] w-full"
        src="https://th.bing.com/th/id/OIP.Z4tXagFBE2WF80e2ORhIIgHaE7?rs=1&pid=ImgDetMain"
        alt="Course Image"
      />
      <p className="p-2 text-gray-700">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum,
        quibusdam.
      </p>
      <div className="w-full grid grid-cols-2 gap-4 p-2 border-t border-gray-200 text-center">
        <span className="text-sm font-medium text-gray-600">Rating</span>
        <span className="text-sm font-medium text-gray-600">Price</span>
      </div>
      <hr className="custom-line w-[90%] h-[1px] rounded-lg mx-auto mt-2 bg-[#ed145b]" />
      <div className="w-full grid grid-cols-2 gap-4 p-4 border-t border-gray-200 text-center">
        <span className="text-sm font-medium text-gray-600">Lessons</span>
        <button className="p-1 mx-3 border-none rounded-full cursor-pointer bg-[#ed145b] text-white text-sm">
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default CourseCard;
