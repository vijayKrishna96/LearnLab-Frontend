import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import StudentLayout from "../layouts/StudentLayout";
import StudentHome from "../pages/student/studentHome";
import StudentProfile from "../pages/student/StudentProfile";
import InstructorLayout from "../layouts/InstructorLayout";
import InstructorProfile from "../pages/instructor/InstructorProfile";
import AddCourse from "../pages/instructor/AddCourse";
import Cart from "../components/Cart";
import CoursePage from "../pages/common/CoursePage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children:[
        {
            path: '',
            element: <Home/>
        }
      ]
    },
    {
        path: 'student',
        element: <StudentLayout/>,
        children:[
          {
            path: '',
            element: <StudentHome/>
          },
          {
            path:'profile',
            element:<StudentProfile/>
          },
          {
              path: 'coursepage',
              element: <CoursePage/>
          },
          {
            path: 'cart',
            element: <Cart/>
          }
        ]
    },
    {
        path: 'instructor',
        element: <InstructorLayout/>,
        children:[
          {
            path: 'profile',
            element: <InstructorProfile/>
          },
          {
            path: 'addcourse',
            element: <AddCourse/>
          },
          {
            path: 'cart',
            element: <Cart/>
          }
        ]
    }
  ]);