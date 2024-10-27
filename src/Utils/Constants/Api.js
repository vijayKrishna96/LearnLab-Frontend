// Api configuration
const BaseUrl = import.meta.env.VITE_BASE_URL ;

//Auth
const loginEndpoint = import.meta.env.VITE_LOGIN_USER;
const signupEndpoint = import.meta.env.VITE_REGISTER_USER ;
const logoutEndpoint = import.meta.env.VITE_LOGOUT_USER;

//ALL Courses
const allCourseEndpoint = import.meta.env.VITE_ALL_COURSE

//userDetails
const userDetailsEndpoint = import.meta.env.VITE_USER_DETAILS;

//Category
const AllCategoryEndpoint = import.meta.env.VITE_ALL_CATEGORY;

//Auth
export const SIGNUP_API = BaseUrl + signupEndpoint;
export const LOGIN_API = BaseUrl + loginEndpoint;
export const LOGOUT_API =BaseUrl + logoutEndpoint;

//category
export const ALL_CATEGORY_API = BaseUrl + AllCategoryEndpoint;

//user
export const USER_DETAILS_API = BaseUrl +userDetailsEndpoint;

//allCourse
export const  ALL_COURSE_API = BaseUrl + allCourseEndpoint
