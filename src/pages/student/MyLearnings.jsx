import React from "react";

const MyLearnings = () => {
  return (
    <div className="container mx-auto min-h-screen px-4">
      <h1 className="text-3xl  m-5 md:m-10 font-semibold">Learnings</h1>

      <div className="m-10 max-w-7xl mx-auto grid grid-cols-3 gap-28">
        <div className="w-full  mx-auto md:mx-0">
          <img
            src="https://th.bing.com/th/id/OIP.FxYehX0A4g0NCWgHLjVbkgHaE_?rs=1&pid=ImgDetMain"
            alt="Web Development Bootcamp"
            className="w-full h-auto"
          />
          <div className="p-1">
            <h4 className="font-semibold text-lg md:text-xl">
              The Complete Web Development Bootcamp 2024
            </h4>
            <p className="text-sm md:text-base mt-2">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            <hr className="my-3" />

            <div className="flex justify-between items-center text-sm md:text-base">
              <p>61% complete</p>
              <p>Rating</p>
            </div>
          </div>
        </div>
        <div className="w-full  mx-auto md:mx-0">
          <img
            src="https://th.bing.com/th/id/OIP.FxYehX0A4g0NCWgHLjVbkgHaE_?rs=1&pid=ImgDetMain"
            alt="Web Development Bootcamp"
            className="w-full h-auto"
          />
          <div className="p-1">
            <h4 className="font-semibold text-lg md:text-xl">
              The Complete Web Development Bootcamp 2024
            </h4>
            <p className="text-sm md:text-base mt-2">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            <hr className="my-3" />

            <div className="flex justify-between items-center text-sm md:text-base">
              <p>61% complete</p>
              <p>Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLearnings;
