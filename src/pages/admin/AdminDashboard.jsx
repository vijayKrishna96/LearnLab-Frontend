/* eslint-disable react/prop-types */
import React from "react";
import {
  Calendar,
  Bell,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  BookOpen,
  FileText,
  InboxIcon,
  Layout,
} from "lucide-react";
import { useState } from "react";

const DashboardView = ({
  courses,
  tasks,
  timeSpentData,
  days,
  selectedMonth,
}) => (
  <>
    {/* Courses Grid */}
    {/* <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.name} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{course.icon}</span>
                <span className="font-medium">{course.name}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${course.progress}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${course.color}`}
                ></div>
              </div>
              <span className="text-sm text-gray-500 mt-1">{course.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div> */}

    {/* Statistics Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Time Spent Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-lg">Time Spent</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">56h</span>
              <span className="text-green-500 text-sm">9%↑</span>
            </div>
          </div>
          <select className="border rounded-lg px-3 py-1">
            <option>Last Week</option>
          </select>
        </div>

        <div className="flex items-end space-x-2 h-48">
          {timeSpentData.map((hours, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${(hours / 16) * 100}%` }}
              ></div>
              <span className="mt-2 text-sm text-gray-600">{days[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Circle */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-6">Progress</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
                strokeDasharray="10, 100"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-2xl font-bold">10%</span>
              <p className="text-sm text-gray-500">COMPLETED</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Calendar and Tasks */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Calendar</h2>
          <div className="flex items-center space-x-4">
            <button>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">{selectedMonth}</span>
            <button>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tasks</h2>
          <button className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center">
            +
          </button>
        </div>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm text-gray-500">{task.date}</p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-8 h-8 ${task.color} rounded-lg flex items-center justify-center`}
                  >
                    {task.icon}
                  </span>
                  <span className="font-medium">{task.title}</span>
                </div>
              </div>
              <button>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// My Courses View Component
const MyCoursesView = ({ courses }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">My Courses</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course.name} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span
                className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-2xl`}
              >
                {course.icon}
              </span>
              <div>
                <h3 className="font-bold text-lg">{course.name}</h3>
                <p className="text-gray-500">12 Chapters</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${course.progress}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${course.color}`}
                ></div>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Continue Learning
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Mock Test View Component
const MockTestView = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">All Courses</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["Business", "Development", "Music", "Design"].map((subject) => (
        <div key={subject} className="bg-white p-6 rounded-lg shadow-lg">
          <img src="../src/assets/Webdev.png" alt="" className="rounded-t-md" />
          <h3 className="font-bold text-lg my-4">{subject} </h3>
          <div className="space-y-4 ">
            <div className="grid grid-cols-2 space-x-4 gap-4">
              <div className="flex justify-between text-sm text-gray-600 ml-4">
                <span>Duration</span>
                <span>3 hours</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Modules</span>
                <span>100</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Lessons</span>
                <span>100</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Instructor</span>
                <span>Name</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Rating</span>
                <span>5</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              View More Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Notes View Component
const NotesView = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">My Notes</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        "Physics Notes",
        "Chemistry Notes",
        "Mathematics Notes",
        "English Notes",
      ].map((note) => (
        <div key={note} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">{note}</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <FileText className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">Last updated: 2 days ago</p>
          <div className="flex space-x-2">
            <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm">
              View
            </button>
            <button className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm">
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Inbox View Component
const InboxView = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Inbox</h1>
    <div className="bg-white rounded-lg shadow-lg">
      {[
        {
          title: "New Assignment Posted",
          time: "2 hours ago",
          course: "Physics",
        },
        {
          title: "Test Results Available",
          time: "1 day ago",
          course: "Chemistry",
        },
        { title: "Course Update", time: "2 days ago", course: "Mathematics" },
      ].map((message, index) => (
        <div
          key={index}
          className="p-4 border-b last:border-b-0 hover:bg-gray-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{message.title}</h3>
              <p className="text-sm text-gray-500">
                {message.course} • {message.time}
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedMonth, setSelectedMonth] = useState("Jun 2020");

  const courses = [
    { name: "Physics", progress: 40, icon: "⚛️", color: "bg-orange-500" },
    { name: "English", progress: 76, icon: "📚", color: "bg-yellow-400" },
    { name: "Mathematics", progress: 92, icon: "➗", color: "bg-teal-500" },
    { name: "Chemistry", progress: 100, icon: "🧪", color: "bg-blue-500" },
    { name: "Aptitude Test", progress: 34, icon: "💡", color: "bg-pink-500" },
  ];

  const tasks = [
    {
      date: "June 29, 2020",
      title: "Chapters 5, 6, 7",
      icon: "📚",
      color: "bg-yellow-400",
    },
    {
      date: "June 29, 2020",
      title: "Chapters 10 and 14",
      icon: "➗",
      color: "bg-teal-500",
    },
    {
      date: "June 30, 2020",
      title: "Isometric Drawing Practice",
      icon: "💡",
      color: "bg-pink-500",
    },
  ];

  const navItems = [
    { name: "Dashboard", icon: Layout },
    { name: "Courses", icon: BookOpen },
    { name: "Students", icon: FileText },
    { name: "Instructors", icon: FileText },
    { name: "Inbox", icon: InboxIcon },
  ];

  const timeSpentData = [8, 16, 6, 9, 8, 9, 3];
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const renderView = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <DashboardView
            courses={courses}
            tasks={tasks}
            timeSpentData={timeSpentData}
            days={days}
            selectedMonth={selectedMonth}
          />
        );
      case "My Courses":
        return <MyCoursesView courses={courses} />;
      case "Courses":
        return <MockTestView />;
      case "Students":
        return <NotesView />;
      case "Instructors":
        return <InboxView />;
      case "Inbox":
        return <InboxView />;
      default:
        return (
          <DashboardView
            courses={courses}
            tasks={tasks}
            timeSpentData={timeSpentData}
            days={days}
            selectedMonth={selectedMonth}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">LearnLab</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center space-x-4 px-6 py-3 hover:bg-blue-50 ${
                activeTab === item.name
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold">{activeTab}</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                <span className="font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">{renderView()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
