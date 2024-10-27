import React from "react";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const swiperOptions = {
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    450: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
    1024: {
      slidesPerView: 4,
    },
  },
  loop: false,
  spaceBetween: 10,
};

function CourseCarousel() {
  const instructors = [
    {
      name: "Skyler White",
      image:
        "https://i.pinimg.com/originals/8b/e9/35/8be935cc39977bac52c86c73392a22b9.jpg",
      subject: "Design",
      rating: 4.5,
    },
    {
      name: "Emma Ava",
      image:
        "https://i.pinimg.com/originals/8b/e9/35/8be935cc39977bac52c86c73392a22b9.jpg",
      subject: "Marketing",
      rating: 4.7,
    },
    {
      name: "William Lucas",
      image:
        "https://i.pinimg.com/originals/8b/e9/35/8be935cc39977bac52c86c73392a22b9.jpg",
      subject: "Business",
      rating: 4.9,
    },
    {
      name: "Skyler White",
      image:
        "https://i.pinimg.com/originals/8b/e9/35/8be935cc39977bac52c86c73392a22b9.jpg",
      subject: "Design",
      rating: 4.5,
    },
    {
      name: "Emma Ava",
      image:
        "https://i.pinimg.com/originals/8b/e9/35/8be935cc39977bac52c86c73392a22b9.jpg",
      subject: "Marketing",
      rating: 4.7,
    },
    {
      name: "William Lucas",
      image:
        "https://i.pinimg.com/originals/8b/e9/35/8be935cc39977bac52c86c73392a22b9.jpg",
      subject: "Business",
      rating: 4.9,
    },
    {
      name: "Skyler White",
      image:
        "https://i.pinimg.com/originals/8b/e9/35/8be935cc39977bac52c86c73392a22b9.jpg",
      subject: "Design",
      rating: 4.5,
    },
    {
      name: "Emma Ava",
      image:
        "https://i.pinimg.com/originals/8b/e9/35/8be935cc39977bac52c86c73392a22b9.jpg",
      subject: "Marketing",
      rating: 4.7,
    },
    // Array of instructor objects
  ];

  return (
    <div className="relative flex justify-center items-center">
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Navigation]}
        {...swiperOptions}
        className="popular-slider"
      >
        {instructors.map((instructor, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center mt-14"
          >
            <div className="h-[16rem] w-[16rem] sm:h-[18rem] sm:w-[18rem] lg:h-[20rem] lg:w-[20rem] relative overflow-hidden rounded-lg p-4 text-center transition-transform duration-400 transform hover:scale-110 mx-auto">
              <div className="image cursor-pointer flex flex-col items-center justify-center overflow-hidden">
                <img
                  className="h-[8rem] w-[12rem] sm:h-[9rem] sm:w-[13rem] lg:h-[10rem] lg:w-[15rem] mx-auto mb-4"
                  src={instructor.image}
                  alt={instructor.name}
                />
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                  {instructor.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  {instructor.subject}
                </p>
                <span className="text-yellow-500 mt-2 block">
                  {instructor.rating} ⭐
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="swiper-button-next absolute top-1/2 right-0  text-black   p-3 rounded-full cursor-pointer transition duration-300"></div>
      <div className="swiper-button-prev absolute top-1/2 left-0  text-black  p-3 rounded-full cursor-pointer transition duration-300"></div>
    </div>
  );
}

export default CourseCarousel;
