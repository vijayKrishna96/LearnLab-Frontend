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

export const router = createBrowserRouter([
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
        }
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
              path: 'coursepage/:userId',
              element: <CoursePage/>
          },
          {
            path: 'cart/:userId',
            element: <Cart/>
          },
          {
            path: 'mylearnings/:userId',
            element: <MyLearnings/>
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
            path: 'mycourses/addcourse/:userId',
            element: <AddCourse/>
          },
          {
            path: 'cart/:userId',
            element: <Cart/>
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
            path: ':userId/instructor/coursepage',
            element: <CoursePage/>
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
    }
  ]);