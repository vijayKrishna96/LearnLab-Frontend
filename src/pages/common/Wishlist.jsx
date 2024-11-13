import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/cards/CourseCard";


const Wishlist = () => {
  const { userId } = useParams();

  const item = useSelector((state) => state.wishlist.wishlistItems);
  const filteredItems = item?.filter((course) => course.userId === userId);

  console.log(filteredItems);

  return (
    <>
      <div className="p-6 min-h-screen container mx-auto">
        <h2 className="text-2xl font-semibold mb-4 mt-8" id="Text">
          Wishlist
        </h2>
        <p className="mb-4 text-gray-600" id="Text">
          {filteredItems?.length} Course{filteredItems?.length > 1 ? "s" : ""} in
          wishlist
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-5 mt-10 absolute">
          {filteredItems?.map((course) => (
            <>
              <CourseCard key={course._id} course={course}  />
            </>
          ))}
        </div>
      </div>
      <div className="bg-black">something</div>
    </>
  );
};

export default Wishlist;
