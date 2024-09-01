import React from 'react'

function Cart() {
  return (
    <div className="p-6 min-h-screen container mx-auto">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Shopping Cart</h2>
        <p className="mb-4 text-gray-600">2 Courses in cart</p>
      <div className="grid grid-cols-12 gap-6 mt-10">
        {/* Shopping Cart Items */}
        <div className="col-span-8  p-6">
          <div className="space-y-6">
            {/* Course 1 */}
            <div className="flex items-center space-x-4 bg-gray-200 bg-opacity-50 rounded-md">
              <img src="https://th.bing.com/th/id/OIP.X8dbLHdWzNYmoWjRBSAtsgHaEK?w=294&h=180&c=7&r=0&o=5&pid=1.7" alt="Course" className="w-52 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Become a professional Full Stack Developer</h3>
                <p className="text-sm text-gray-500">4.6 ⭐️ (456 ratings) • 50 total hours • 453 lectures • All Levels</p>
                <button href="#" className="text-blue-500 text-sm hover:underline mt-4">Remove from cart</button>
              </div>
              <p className="text-lg font-semibold p-4">₹ 2,499</p>
            </div>
            {/* Course 2 */}
            <div className="flex items-center space-x-4 bg-gray-200 bg-opacity-50 rounded-md">
              <img src="https://th.bing.com/th/id/OIP.X8dbLHdWzNYmoWjRBSAtsgHaEK?w=294&h=180&c=7&r=0&o=5&pid=1.7" alt="Course" className="w-52 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Become a Crypto Trader the Future is here</h3>
                <p className="text-sm text-gray-500">4.6 ⭐️ (456 ratings) • 50 total hours • 453 lectures • All Levels</p>
                <button href="#" className="text-blue-500 text-sm hover:underline mt-4">Remove from cart</button>
              </div>
              <p className="text-lg font-semibold p-4">₹ 3,999</p>
            </div>
          </div>
        </div>

        {/* Checkout and Promotions */}
        <div className="col-span-4 space-y-6 bg-red-100 bg-opacity-30 p-2 rounded-md">
          <div className="p-6 rounded-md ">
            <h3 className="text-lg font-semibold">Total:</h3>
            <p className="text-2xl font-bold">₹ 6,498</p>
            <button className="bg-[#ed145b] text-white w-full py-2 mt-4 rounded-md">Checkout</button>
          </div>
          <div className="p-6 rounded-md ">
            <h3 className="text-lg font-semibold">Promotions</h3>
            <div className="flex space-x-2 mt-4">
              <input
                type="text"
                placeholder="Enter Coupon"
                className="border border-gray-300 rounded-md p-2 flex-1"
              />
              <button className="bg-[#ed145b] text-white px-4 rounded-md">Apply</button>
            </div>
          </div>
        </div>
      </div>     
    </div>
  )
}

export default Cart