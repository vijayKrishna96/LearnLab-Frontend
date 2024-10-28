import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'


function Cart() {

  const item = useSelector((state) => state.cart.items)

  console.log(item , "item")
  return (
    <div className="p-6 min-h-screen container mx-auto">
      <h2 className="text-2xl font-semibold mb-4 mt-8">Shopping Cart</h2>
      <p className="mb-4 text-gray-600">{item.length} Course{item.length > 1 ? 's' : ''} in cart</p>
      <div className="grid grid-cols-12 gap-6 mt-10">
        {/* Shopping Cart Items */}
        <div className="col-span-8 p-6">
          <div className="space-y-6">
            {item.map((course) => {
              // Calculate total hours for each course
              const totalMinutes = course.modules
                .flatMap((module) => module.lessons)
                .reduce((total, lesson) => total + parseInt(lesson.duration, 10), 0);
              const totalHours = (totalMinutes / 60).toFixed(2);
  
              return (
                <div key={course._id} className="flex items-center space-x-4 bg-primary bg-opacity-50 rounded-md">
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="w-52 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-500">
                      {course.averageRating} ⭐️ • {course.modules.length} Modules • {totalHours} Hours
                    </p>
                    <button className="text-blue-500 text-sm hover:underline mt-4">Remove from cart</button>
                  </div>
                  <p className="text-lg font-semibold p-4">₹ {course.price}</p>
                </div>
              );
            })}
          </div>
        </div>
  
        {/* Checkout and Promotions */}
        <div className="col-span-4 space-y-6 bg-primary bg-opacity-30 p-2 rounded-md shadow-md">
          <div className="p-6 rounded-md">
            <h3 className="text-lg font-semibold">Total:</h3>
            <p className="text-2xl font-bold">
              ₹ {item.reduce((total, course) => total + course.price, 0)}
            </p>
            <button className="bg-primarybtn text-white w-full py-2 mt-4 rounded-md">Checkout</button>
          </div>
          <div className="p-6 rounded-md">
            <h3 className="text-lg font-semibold">Promotions</h3>
            <div className="flex space-x-2 mt-4">
              <input
                type="text"
                placeholder="Enter Coupon"
                className="border border-gray-300 rounded-md p-2 flex-1"
              />
              <button className="bg-primarybtn text-white px-4 rounded-md">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default Cart