import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../../features/cartSlice";
import { loadStripe } from "@stripe/stripe-js";

import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  UPDATE_COURSE_API,
  UPDATE_USER_DETAILS,
} from "../../Utils/Constants/Api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addUserCourse, selectUserCourses } from "../../features/userSlice";


function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const dispatch = useDispatch();

  const userCourses = useSelector(selectUserCourses);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const userRole = useSelector((state) => state.user.userData.role);

  console.log(userRole, "role")

  console.log(userCourses , "courses")

  const filteredItems = cartItems
    ?.filter((course) => course.userId === userId)
    ?.filter((course) => !userCourses.includes(course._id));

  const PK = import.meta.env.VITE_PK;

  const makePayment = async () => {
    setIsLoading(true);
    try {
      const stripe = await loadStripe(PK);
      // Construct the full return URL using window.location
      const returnUrl = `${window.location.origin}${location.pathname}`;

      const response = await fetch("http://localhost:4500/payment/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: filteredItems,
          returnUrl: returnUrl, // Send the full URL
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout session creation failed");
      }

      const session = await response.json();
      if (!session?.id) {
        throw new Error("Invalid session response");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  // Handle payment success
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isSuccess = searchParams.get("success") === "true";
    const token = searchParams.get("token");

    const processPaymentSuccess = async () => {
      if (!isSuccess || !token || isProcessingPayment) return;

      setIsProcessingPayment(true);
      try {
        const decoded = jwtDecode(token);
        const itemIds = decoded.items || [];
        const instructorIds = decoded.instructorIds || [];
        // if (itemIds.length === 0) return;

        console.log(instructorIds ,'dec');

        // Update Redux store
        dispatch(addUserCourse(itemIds));
        dispatch(clearCart());

        // Update user details
        await axios.patch(`${UPDATE_USER_DETAILS}/${userId}`, {
          courses: itemIds
        });
        
        // Update course details
        for (const courseId of itemIds) {
          await axios.patch(`${UPDATE_COURSE_API}/${courseId}`, {
            students: userId
          });
        }

        await Promise.all(instructorIds.map(instructorId =>
          axios.patch(`${UPDATE_USER_DETAILS}/${instructorId}`, { students: [userId] })
        ));

        // Clear URL parameters by navigating to the clean URL
        // navigate(location.pathname, { replace: true });
        navigate(`/${userRole}/${userId}`);
      } catch (error) {
        console.error("Error processing payment success:", error);
      } finally {
        setIsProcessingPayment(false);
      }
    };

    processPaymentSuccess();
  }, [userId, dispatch, navigate, location]);
  return (
    <>
      
      <div className="p-6 min-h-screen container mx-auto">
        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center text-xl">
            <span className="loading loading-infinity loading-lg text-info "></span>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 mt-8" id="Text">
              Shopping Cart
            </h2>
            <p className="mb-4 text-gray-600" id="Text">
              {filteredItems.length} Course{filteredItems.length > 1 ? "s" : ""}{" "}
              in cart
            </p>
            <div className="grid grid-cols-12 gap-6 mt-10">
              {/* Shopping Cart Items */}
              <div className="col-span-8 p-6">
                <div className="space-y-6">
                  {filteredItems.map((course) => {
                    // Calculate total hours for each course
                    const totalMinutes = course.modules
                      ?.flatMap((module) => module.lessons)
                      ?.reduce(
                        (total, lesson) =>
                          total + parseInt(lesson.duration, 10),
                        0
                      );
                    const totalHours = (totalMinutes / 60).toFixed(2);

                    return (
                      <div
                        key={course._id}
                        className="flex items-center space-x-4 bg-primary bg-opacity-50 rounded-md"
                        id="Tags"
                      >
                        <img
                          src={course?.image?.url || "path/to/placeholder-image.jpg"}
                          alt={course.title}
                          className="w-52 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold" id="Text">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-500" id="Text">
                            {course.averageRating} ⭐️ • {course.modules.length}{" "}
                            Modules • {totalHours} Hours
                          </p>
                          <button
                            className="text-blue-500 text-sm hover:underline mt-4"
                            onClick={() => dispatch(removeItem(course._id))}
                          >
                            Remove from cart
                          </button>
                        </div>
                        <p className="text-lg font-semibold p-4" id="Text">
                          ₹ {course.price}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Checkout and Promotions */}
              <div
                className="col-span-4 space-y-6 bg-primary bg-opacity-30 p-2 rounded-md shadow-md"
                id="Tags"
              >
                <div className="p-6 rounded-md">
                  <h3 className="text-lg font-semibold" id="Text">
                    Total:
                  </h3>
                  <p className="text-2xl font-bold" id="Text">
                    ₹{" "}
                    {filteredItems.reduce(
                      (total, course) => total + course.price,
                      0
                    )}
                  </p>
                  <button
                    className="bg-primarybtn text-white w-full py-2 mt-4 rounded-md"
                    onClick={() => makePayment()}
                  >
                    Checkout
                  </button>
                </div>
                <div className="p-6 rounded-md">
                  <h3 className="text-lg font-semibold">Promotions</h3>
                  <div className="flex space-x-2 mt-4">
                    <input
                      type="text"
                      placeholder="Enter Coupon"
                      className="border border-gray-300 rounded-md p-2 flex-1"
                      id="InputBg"
                    />
                    <button className="bg-primarybtn text-white px-4 rounded-md">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;