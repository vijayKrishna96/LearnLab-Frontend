import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/common/WelcomePage";
import StudentLayout from "../layouts/StudentLayout";
import StudentProfile from "../pages/student/StudentProfile";
import InstructorLayout from "../layouts/InstructorLayout";
import InstructorProfile from "../pages/instructor/InstructorProfile";
import Cart from "../components/ui/Cart";
import CoursePage from "../pages/common/CoursePage";
import AboutUs from "../pages/common/AboutUs";
import ContactUs from "../pages/common/ContactUs";
import MyLearnings from "../pages/student/myLearnings";
import StudentsList from "../pages/instructor/StudentsList";
import MyCourses from "../pages/instructor/MyCourses";
import HomePage from "../pages/common/HomePage";
import UserAuth from "./protectedRoutes/UserAuth";
import AddCourse from "../pages/instructor/AddCourse";
import LearningPage from "../pages/common/LearningPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Wishlist from "../pages/common/Wishlist";
import InstructorView from "../pages/common/InstructorView";

const RouterConfig = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children:[
        {
            path: '',
            element: <Home/>
        },
        {
            path: '/about',
            element : <AboutUs/>
        },
        {
            path: '/contact',
            element: <ContactUs/>
        },
      ]
    },
    {
        path: 'student',
        element: (
          <UserAuth role="student">
            <StudentLayout/>
          </UserAuth>
        ),
        
        children:[
          {
            path: ':userId',
            element: <HomePage/>
          },
          {
            path:'profile/:userId',
            element:<StudentProfile/>
          },
          {
            path: ':userId/coursepage/:id',
            element: <CoursePage/>
          },
          {
            path: 'cart/:userId',
            element: <Cart/>,
          },
          {
            path: 'wishlist/:userId',
            element: <Wishlist/>
          },
          {
            path: 'mylearnings/:userId',
            element: <MyLearnings/>
          },
          {
            path: ":userId/learning/:id",
            element: <LearningPage/>
          },
          {
            path: 'contact/:userId',
            element: <ContactUs/>
          },
          {
            path: 'aboutus/:userId',
            element: <AboutUs/>
          }

        ]
    },
    {
        path: 'instructor',
        element:(
          <UserAuth role="instructor">
            <InstructorLayout/>
          </UserAuth>
        ),
        children:[
          {
            path: ':userId',
            element: <HomePage/>
          },
          {
            path: 'profile/:userId',
            element: <InstructorProfile/>
          },
          {
            path: ':userId/mycourse/:action/:id?',
            element: <AddCourse/>
          },
          {
            path: 'cart/:userId',
            element: <Cart/>
          },
          {
            path: 'wishlist/:userId',
            element: <Wishlist/>
          },
          {
            path: 'students/:userId',
            element : <StudentsList/>
          },
          {
            path: 'mycourses/:userId',
            element: <MyCourses/>
          },
          {
            path: ':userId/coursepage/:id',
            element: <CoursePage/>
          },
          {
            path: ":userId/learning/:id",
            element: <LearningPage/>
          },
          {
            path: ":userId/instructorView/:id",
            element : <InstructorView/>
          },
          {
            path: 'contact/:userId',
            element: <ContactUs/>
          },
          {
            path: 'aboutus/:userId',
            element: <AboutUs/>
          },
          
        ]
    },
    {
      path: 'admin',
      element:(
        <UserAuth role="admin">
            <AdminLayout/>
          </UserAuth>
      ),
      children:[
        {
          path: ':userId',
          element: <AdminDashboard/>
        }
      ]
    }
  ]);


export default RouterConfig