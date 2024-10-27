import React from 'react'

function CoursePage() {
  return (
    <div className="bg-primary p-6 min-h-screen ">
      <div className="container mx-auto mt-10">
        {/* Header Section */}
        <div className="grid grid-cols-2 text-center mb-8">
          <h1 className="text-4xl font-bold">UI/UX Design Course</h1>
          <p className="mt-4 text-gray-600  mx-auto">
            Welcome to our UI/UX Design course! This comprehensive program will help you
            master the principles, tools, and techniques of UI/UX design. We'll start
            with an introduction to UI/UX, followed by user research and analysis,
            wireframing and prototyping, visual design and branding, and finally,
            usability testing. Below is an overview of the curriculum.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative mb-12">
          <img
            src="https://via.placeholder.com/1200x400"
            alt="UI/UX Design"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Course Sections */}
        <div className="grid grid-cols-12 gap-6">
          {/* Introduction to UI/UX Design */}
          <div className="col-span-6 md:col-span-4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">01</h2>
            <h3 className="text-xl font-semibold mt-4">Introduction to UI/UX Design</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
                <p className="font-medium">Understanding UI/UX Design Principles</p>
                <p className="text-sm">Lesson 01 • 45 Minutes</p>
              </li>
              <li>
                <p className="font-medium">Importance of User-Centered Design</p>
                <p className="text-sm">Lesson 02 • 1 Hour</p>
              </li>
              <li>
                <p className="font-medium">The Role of UI/UX Design in Product Development</p>
                <p className="text-sm">Lesson 03 • 45 Minutes</p>
              </li>
            </ul>
          </div>

          {/* User Research and Analysis */}
          <div className="col-span-6 md:col-span-4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">02</h2>
            <h3 className="text-xl font-semibold mt-4">User Research and Analysis</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
                <p className="font-medium">Conducting User Research and Interviews</p>
                <p className="text-sm">Lesson 01 • 1 Hour</p>
              </li>
              <li>
                <p className="font-medium">Analyzing User Needs and Behavior</p>
                <p className="text-sm">Lesson 02 • 1 Hour</p>
              </li>
              <li>
                <p className="font-medium">Creating User Personas and Scenarios</p>
                <p className="text-sm">Lesson 03 • 45 Minutes</p>
              </li>
            </ul>
          </div>

          {/* Wireframing and Prototyping */}
          <div className="col-span-6 md:col-span-4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">03</h2>
            <h3 className="text-xl font-semibold mt-4">Wireframing and Prototyping</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
                <p className="font-medium">Introduction to Wireframing Tools and Techniques</p>
                <p className="text-sm">Lesson 01 • 1 Hour</p>
              </li>
              <li>
                <p className="font-medium">Creating Low-Fidelity Wireframes</p>
                <p className="text-sm">Lesson 02 • 1 Hour</p>
              </li>
              <li>
                <p className="font-medium">Prototyping and Interactive Mockups</p>
                <p className="text-sm">Lesson 03 • 1 Hour</p>
              </li>
            </ul>
          </div>

          {/* Visual Design and Branding */}
          <div className="col-span-6 md:col-span-4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">04</h2>
            <h3 className="text-xl font-semibold mt-4">Visual Design and Branding</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
                <p className="font-medium">Color Theory and Typography in UI Design</p>
                <p className="text-sm">Lesson 01 • 1 Hour</p>
              </li>
              <li>
                <p className="font-medium">Visual Hierarchy and Layout Design</p>
                <p className="text-sm">Lesson 02 • 1 Hour</p>
              </li>
              <li>
                <p className="font-medium">Creating a Strong Brand Identity</p>
                <p className="text-sm">Lesson 03 • 45 Minutes</p>
              </li>
            </ul>
          </div>

          {/* Usability Testing and Iteration */}
          <div className="col-span-6 md:col-span-4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">05</h2>
            <h3 className="text-xl font-semibold mt-4">Usability Testing and Iteration</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
                <p className="font-medium">Usability Testing Methods and Techniques</p>
                <p className="text-sm">Lesson 01 • 1 Hour</p>
              </li>
              <li>
                <p className="font-medium">Analyzing Usability Test Results</p>
                <p className="text-sm">Lesson 02 • 1 Hour</p>
              </li>
              <li>
                <p className="font-medium">Iterating and Improving UX Designs</p>
                <p className="text-sm">Lesson 03 • 45 Minutes</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage