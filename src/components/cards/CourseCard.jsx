/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addItemToCart } from "../../features/cartSlice";
import { FaHeart } from "react-icons/fa6";
import { addItemToWishlist, removeWishlistItem, selectWishlistItems } from "../../features/wishlistSlice";


function CourseCard({ role, course }) {
  const { userId } = useParams();

  const dispatch = useDispatch();

  const wishlistItems = useSelector(selectWishlistItems);

  const [isWishlisted, setIsWishlisted] = useState(false);

  // Update local state when wishlist items change
  useEffect(() => {
    if (wishlistItems && course) {
      const inWishlist = wishlistItems.some((item) => item._id === course._id);
      setIsWishlisted(inWishlist);
    }
  }, [wishlistItems, course]);

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (!course || !userId) return;

    if (isWishlisted) {
      dispatch(removeWishlistItem({ courseId: course._id, userId }));
    } else {
      dispatch(addItemToWishlist({ ...course, userId }));
    }
  };

  return (
    <article
      className="flex flex-col items-center max-w-xs sm:max-w-sm lg:max-w-md bg-white shadow-lg rounded-lg overflow-hidden m-1 relative"
      id="Card"
    >
      <Link to={`/${role}/${userId}/coursepage/${course?._id}`}>
        <img
          className="h-[150px] sm:h-[180px] w-full object-fill"
          src={course?.image?.url}
          alt="Course Image"
        />
      </Link>
      <button
        className="absolute top-2 right-4 p-2 rounded-full transition-colors duration-300"
        onClick={handleWishlistToggle}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <FaHeart 
          className={`text-2xl ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
        />
      </button>
      <p
        className="p-1 text-sm sm:text-base text-gray-700 line-clamp-2"
        id="Text"
      >
        {course?.description}
      </p>
      <div
        className="w-full grid grid-cols-2 gap-2 sm:gap-4 p-2 border-t border-gray-200 text-center "
        id="Text"
      >
        <span
          className="text-xs sm:text-sm font-medium text-gray-600"
          id="Text"
        >
          {course?.averageRating}
        </span>
        <span
          className="text-xs sm:text-sm font-medium text-gray-600"
          id="Text"
        >
          &#8377; {course?.price}
        </span>
      </div>
      <hr className="custom-line w-[90%] h-[1px] rounded-lg mx-auto mt-2 bg-primarybtn" />
      <div className="w-full grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4 border-t border-gray-200 text-center ">
        <span
          className="text-xs sm:text-sm font-medium text-gray-600"
          id="Text"
        >
          Modules {course?.modules?.length}
        </span>
        <button
          className="p-1 sm:px-2 mx-2 sm:mx-3 border-none rounded-full cursor-pointer bg-primarybtn text-white text-xs sm:text-sm"
          onClick={() => dispatch(addItemToCart({ ...course, userId: userId }))}
        >
          Add+
        </button>
      </div>
    </article>
  );
}

export default CourseCard;
