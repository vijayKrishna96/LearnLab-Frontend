import React from 'react'

function ContactUs() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Section */}
          <div className=" p-8 text-black flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Contact us</h2>
            <p className="text-lg mb-6">
              Fill up the form and our Team will get back to you within 24 hours
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="material-icons text-2xl mr-4">phone</span>
                <span>+0123456789</span>
              </div>
              <div className="flex items-center">
                <span className="material-icons text-2xl mr-4">email</span>
                <span>contacthelp@gmail.com</span>
              </div>
              <div className="flex items-center">
                <span className="material-icons text-2xl mr-4">location_on</span>
                <span>102 Street 4657 Road</span>
              </div>
            </div>
            <div className="mt-8 flex space-x-4">
              <a href="#" className="text-3xl"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-3xl"><i className="fab fa-google"></i></a>
              <a href="#" className="text-3xl"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-3xl"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Contact Information</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Mail</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="johnsmith@mail.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="5"
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 leading-tight"
                />
                <label className="text-sm text-gray-700">You agree to our friendly <a href="#" className="text-purple-600 underline">privacy policy</a></label>
              </div>
              <button
                className="w-full bg-primarybtn text-white font-bold py-2 px-4 rounded hover:bg-red-500 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs