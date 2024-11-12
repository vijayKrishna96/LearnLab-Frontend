
import { Close } from "@mui/icons-material";
import { Cross, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";

const Courses = ({ courses }) => {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedInstructor, setSelectedInstructor] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Extract unique category names and instructor names
  const categories = [
    ...new Set(courses.map((course) => course.categoryDetails.name)),
  ];
  const instructors = [
    ...new Set(courses.map((course) => course.instructorDetails.name)),
  ];

  useEffect(() => {
    let result = [...courses];

    if (selectedCategory !== "all") {
      result = result.filter(
        (course) => course.categoryDetails.name === selectedCategory
      );
    }

    if (selectedInstructor !== "all") {
      result = result.filter(
        (course) => course.instructorDetails.name === selectedInstructor
      );
    }

    setFilteredCourses(result);
  }, [selectedCategory, selectedInstructor, courses]);

  const getTotalLessons = (modules) => {
    return modules.reduce((total, module) => total + module.lessons.length, 0);
  };

  const handleViewDetailsClick = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">All Courses</h1>

        <div className="flex flex-col md:flex-row w-full sm:w-auto gap-3">
          <div className="flex-1 sm:flex-initial">
            <div className="relative flex items-center gap-2">
              <Filter className="w-4 h-4 absolute left-2" />
              <select
                className="w-full sm:w-auto pl-8 pr-4 py-2 border rounded-lg text-sm appearance-none "
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 sm:flex-initial">
            <div className="relative flex items-center gap-2">
              <Filter className="w-4 h-4 absolute left-2" />
              <select
                className="w-full sm:w-auto pl-8 pr-4 py-2 border rounded-lg text-sm appearance-none "
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
              >
                <option value="all">All Instructors</option>
                {instructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] content"
          >
            <div className="relative pt-[56.25%]">
              <img
                src={course.image.url}
                alt={course.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-base sm:text-lg mb-4 line-clamp-2 Text">
                {course.title}
              </h3>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4 flex-grow">
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Modules</span>
                  <span>{course.modules.length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Lessons</span>
                  <span>{getTotalLessons(course.modules)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Students</span>
                  <span>{course.students.length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Price</span>
                  <span>₹{course.price}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Rating</span>
                  <span>{course.averageRating || "N/A"}</span>
                </div>
              </div>

              <button
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                onClick={() => handleViewDetailsClick(course)}
              >
                View More Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className=" rounded-lg shadow-lg p-6 w-full max-w-7xl grid grid-cols-2 gap-8 sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column: Course and Student Details */}
            <div>
              <h3 className="font-bold text-lg mb-2 Text">{selectedCourse.title}</h3>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Instructor</span>
                  <span>{selectedCourse.instructorDetails.name}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Instructor Email</span>
                  <span>{selectedCourse.instructorDetails.email}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Students</span>
                  <span>{selectedCourse.studentDetails.length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Modules</span>
                  <span>{selectedCourse.modules.length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 Text">
                  <span>Lessons</span>
                  <span>{getTotalLessons(selectedCourse.modules)}</span>
                </div>
              </div>

              <h4 className="font-bold text-base mb-2">Student Details</h4>
              <div className="space-y-2">
                {selectedCourse.studentDetails.map((student) => (
                  <div
                    key={student.id}
                    className="flex justify-between text-sm text-gray-600 Text"
                  >
                    <span>{student.name}</span>
                    <span>{student.email}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Module Details */}
            <div>
              <div className="flex justify-between items-center mb-4 relative">
                <h4 className="font-bold text-base mb-2">Module Details</h4>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors text-4xl absolute right-0 -top-5"
                  onClick={handleCloseModal}
                >
                  <Close/>
                </button>
              </div>
              <div className="overflow-y-auto max-h-80">
                <table className="w-full table-auto border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-gray-100" id="Tags">
                      <th className="px-4 py-2 text-left">Module</th>
                      <th className="px-4 py-2 text-right">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCourse.modules.map((module, moduleIndex) => (
                      <React.Fragment key={moduleIndex}>
                        {/* Module Header */}
                        <tr className="bg-gray-100" id="Tags">
                          <td
                            colSpan="3"
                            className="px-4 py-3 font-semibold text-left border-b border-gray-300"
                          >
                            {module.title} ({module.lessons.length} Lessons)
                          </td>
                        </tr>
                        {/* Module Lessons */}
                        {module.lessons.map((lesson, lessonIndex) => (
                          <tr
                            key={`${moduleIndex}-${lessonIndex}`}
                            className=""
                          >
                            <td className="px-4 py-2 text-left">
                              {lesson.title}
                            </td>
                            <td className="px-4 py-2 text-right">
                              {lesson.duration} min
                            </td>
                          </tr>
                        ))}
                        {/* Add space after each module */}
                        <tr>
                          <td colSpan="3" className="h-4"></td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
