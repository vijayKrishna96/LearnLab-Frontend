/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
  Bell,
  ChevronRight,
  BookOpen,
  FileText,
  InboxIcon,
  Layout,            
  LogOut,
} from "lucide-react";
import { useState } from "react";
import Students from "./Students";
import InstructorListTable from "./Instructors";
import ProductMetricsChart from "../../components/Instructor/Chart";
import axios from "axios";
import {
  ALL_COURSE_API,
  LOGOUT_API,
  USER_DETAILS_API,
} from "../../Utils/Constants/Api";
import Courses from "./CourseDetails";
import { useNavigate, useParams } from "react-router-dom";
import DarkMode from "../../components/ui/DarkMode";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/userSlice";

const DashboardView = () => {
  const [value, setValue] = useState(dayjs());

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <>
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="p-6 rounded-lg shadow content">
          <ProductMetricsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-10">
        {/* Progress Circle */}
        <div className="p-6 rounded-lg shadow content">
          <h3 className="font-bold text-lg mb-6">Progress</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-56 h-56">
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
                <span className="text-2xl font-bold">30%</span>
                <p className="text-sm text-gray-500">SALES PROGRESS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar and Tasks */}
        <div className="p-6 rounded-lg shadow content">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="Controlled calendar">
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                sx={{
                  width: "100%",
                  bgcolor: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#000",
                  borderRadius: "8px",
                  boxShadow: isDarkMode
                    ? "0px 4px 10px rgba(0, 0, 0, 0.3)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  ".MuiPickersCalendarHeader-label": {
                    color: isDarkMode ? "#fff" : "#000", // Month text color
                  },
                  ".MuiPickersCalendarHeader-switchViewButton, .MuiPickersArrowSwitcher-button":
                    {
                      color: isDarkMode ? "#fff" : "#000", // Nav arrows color
                    },
                  ".MuiPickersDay-root": {
                    color: isDarkMode ? "#fff" : "#000",
                  },
                  ".MuiPickersDay-root.Mui-selected": {
                    bgcolor: isDarkMode ? "#1976d2" : "#4F46E5",
                  },
                  ".MuiPickersDay-root:hover": {
                    bgcolor: isDarkMode ? "#555" : "#ddd",
                  },
                  ".MuiDayCalendar-weekDayLabel": {
                    color: isDarkMode ? "#fff" : "#000", // Day label color (S M T W T F S)
                  },
                }}
              />
            </DemoItem>
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
};

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
  const [courseData, setCourseData] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUsersData] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key to reset input field
  const [isImageSelected, setIsImageSelected] = useState(false);

  // Function to handle profile picture file selection
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result); // Set the new profile picture to preview
        setIsImageSelected(true); // Set the image selected flag to true
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  // Reset file input field after picture update
  const handleUpdateProfilePicture = () => {
    setIsImageSelected(false);
    setFileInputKey(Date.now()); // Change the input key to reset it
  };

  const navItems = [
    { name: "Dashboard", icon: Layout },
    { name: "Courses", icon: BookOpen },
    { name: "Students", icon: FileText },
    { name: "Instructors", icon: FileText },
    { name: "Inbox", icon: InboxIcon },
  ];

  const timeSpentData = [8, 16, 6, 9, 8, 9, 3];
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useDispatch();

  console.log(userData, "data");

  useEffect(() => {
    const GetAllCourses = async () => {
      try {
        const response = await axios.get(ALL_COURSE_API);
        console.log(response);
        setCourseData(response?.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    GetAllCourses();
  }, []);

  console.log(courseData)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${USER_DETAILS_API}/user/${userId} `);
        // console.log("User details response:", response.data[0]);
        setUsersData(response?.data[0]);
        // Handle the response data as needed (e.g., set it in state)
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle the error (e.g., show an error message)
      }
    };

    if (userId) {
      fetchUserDetails(); // Call the async function if userId is available
    }
  }, [userId]);

  console.log(userData, "data");

  const renderView = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <DashboardView
            // courses={courses}
            // tasks={tasks}
            timeSpentData={timeSpentData}
            days={days}
            selectedMonth={selectedMonth}
          />
        );
      // case "My Courses":
      //   return <MyCoursesView courses={courses} />;
      case "Courses":
        return <Courses courses={courseData} />;
      case "Students":
        return <Students />;
      case "Instructors":
        return <InstructorListTable />;
      case "Inbox":
        return <InboxView />;
      default:
        return (
          <DashboardView
            timeSpentData={timeSpentData}
            days={days}
            selectedMonth={selectedMonth}
          />
        );
    }
  };

  const handleLogout = async () => {
    // setIsLoading(true);
    try {
      const response = await axios.post(LOGOUT_API);
      if (response?.data?.success) {
        localStorage.removeItem('token');
        dispatch(setUserData({}));
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex h-screen overflow-y-hidden">
      {/* Main Sidebar */}
      <div className="w-64 shadow-lg sidebar">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">LearnLab</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center space-x-4 px-6 py-3  sidebarText ${
                activeTab === item.name ? " sidebarTextActive" : ""
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
        <header className="shadow-sm AdminHeader">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold">{activeTab}</h1>
            <div className="flex items-center space-x-4">
              <div className="border-dashed border-2 border-red-400 rounded-full">
                <DarkMode />
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={
                      newProfilePicture || userData?.profilePicture?.url || ""
                    }
                    alt="Profile"
                    className="w-8 h-8 bg-blue-600 rounded-full"
                  />
                  <span className="font-medium">{userData?.name}</span>
                </button>

                {/* Profile Sidebar */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64  rounded-lg shadow-lg py-2 z-10 profile">
                    {/* Profile Info Section */}
                    <div className="px-4 py-4 border-b text-center">
                      <img
                        src={
                          newProfilePicture ||
                          userData?.profilePicture?.url ||
                          ""
                        }
                        alt="Profile"
                        className="w-16 h-16 mx-auto rounded-full border border-gray-200"
                      />
                      <p className="font-medium mt-2 Text">{userData?.name}</p>
                      <p className="text-sm text-gray-600 Text">{userData?.email}</p>
                    </div>

                    {/* Profile Actions */}
                    <div className="px-4 py-2">
                      <input
                        key={fileInputKey} // Reset input when the key changes
                        type="file"
                        accept="image/*"
                        className="w-full hidden"
                        onChange={handleProfilePictureChange}
                        id="fileInput"
                      />
                      {!isImageSelected && (
                        <button
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                          className="w-full px-4 py-2 text-blue-600 hover:bg-blue-50 text-center"
                        >
                          Choose New Picture
                        </button>
                      )}

                      {/* Display Update or Choose option based on image selection */}
                      {isImageSelected && (
                        <div className="mt-4 space-y-2">
                          <button
                            onClick={handleUpdateProfilePicture}
                            className="w-full px-4 py-2 text-green-600 hover:bg-green-50"
                          >
                            Update Profile Picture
                          </button>
                          <button
                            onClick={() => setIsImageSelected(false)}
                            className="w-full px-4 py-2 text-blue-600 hover:bg-blue-50"
                          >
                            Choose Another Picture
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 ">{renderView()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
