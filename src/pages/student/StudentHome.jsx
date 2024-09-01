import React from "react";
import CourseCard from "../../components/cards/CourseCard";
import CourseCarousel from "../../components/carousels/CourseCarousel";

function StudentHome() {
  return (
    <>
      {/* Hero */}
      <section>
        <div className="h-[50vh] max-w-7xl mx-auto">
          <div className="flex gap-6 mt-10 items-center">
            <img
              className="h-12 w-12 rounded-full"
              src="https://th.bing.com/th/id/OIP.ELavGv-PyFA24ucQcJthawHaNc?rs=1&pid=ImgDetMain"
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold">Welcome , Name</h3>
            </div>
          </div>
          <div className=" mt-10">
            <div className="relative">
              <div className="absolute bg-white top-28 left-16 p-10 rounded-md">
                <h1 className="text-3xl font-semibold mb-5">
                  Learning that gets you
                </h1>
                <p>
                  Skills for your present (and your future).
                  <br />
                  Get started with us.
                </p>
              </div>
              <img
                className=""
                src="https://s.udemycdn.com/browse_components/billboard/fallback_banner_image_udlite.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section>
        <div className="h-[100vh] container mx-auto">
          <div className="flex flex-col justify-center items-center mt-20 ">
            <h2 className="text-4xl font-semibold leading-tight">
              Our Online Courses
            </h2>
            <hr className="custom-line w-20 h-2 rounded-lg mx-auto mt-2 bg-[#ed145b]" />
          </div>
          <div className="flex flex-col items-center ">
            <div className="flex  gap-16 mt-10">
              <button>All</button>
              <button>Business</button>
              <button>Design</button>
              <button>Development</button>
              <button>Marketing</button>
              <button>Music</button>
            </div>
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

      <section>
        <div className="h-[40vh] container mx-auto mt-14">
            <h2 className="text-xl font-medium">Recomended For You</h2>
            <div>
                <CourseCarousel/>
            </div>
        </div>
      </section>
    </>
  );
}

export default StudentHome;
