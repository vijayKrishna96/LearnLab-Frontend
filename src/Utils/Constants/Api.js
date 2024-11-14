

// Api configuration
const BaseUrl = import.meta.env.VITE_BASE_URL ;

//Auth
const loginEndpoint = import.meta.env.VITE_LOGIN_USER;
const signupEndpoint = import.meta.env.VITE_REGISTER_USER ;
const logoutEndpoint = import.meta.env.VITE_LOGOUT_USER;

//ALL Courses
const allCourseEndpoint = import.meta.env.VITE_ALL_COURSE
const allCourseByUserId = import.meta.env.VITE_GET_COURSEBY_USERID

//user
const userDetailsEndpoint = import.meta.env.VITE_USER_DETAILS;
const updateUserDetails = import.meta.env.VITE_UPDATE_USER
const updateInstructor = import.meta.env.VITE_UPDATE_INSTRUCTOR
const allUsersEndpoint = import.meta.env.VITE_ALL_USERS

//Category
const AllCategoryEndpoint = import.meta.env.VITE_ALL_CATEGORY;

//cart
const cartApi = import.meta.env.VITE_CARTITEMS

//Stripe Payment
const StripePaymentApi = import.meta.env.VITE_STRIPE_PAYMENT

export const BASE_URL_API = BaseUrl

//Auth
export const SIGNUP_API = BaseUrl + signupEndpoint;
export const LOGIN_API =  BaseUrl + loginEndpoint;
export const LOGOUT_API =BaseUrl + logoutEndpoint;

//category
export const ALL_CATEGORY_API = BaseUrl + AllCategoryEndpoint;


//user
export const USER_DETAILS_API = BaseUrl + userDetailsEndpoint;
export const UPDATE_USER_DETAILS = BaseUrl + updateUserDetails;
export const UPDATE_INSTRUCTOR = BaseUrl + updateInstructor;
export const ALL_USERS_API = BaseUrl + allUsersEndpoint

//Course
export const  ALL_COURSE_API = BaseUrl + allCourseEndpoint
export const  COURSE_BY_ID_API = BaseUrl + allCourseEndpoint
export const  BASE_URL_CART = BaseUrl + cartApi
export const  ALL_COURSE_BY_USERID = BaseUrl + allCourseByUserId
export const  UPDATE_COURSE_API = BaseUrl + allCourseEndpoint
export const  ADD_NEW_COURSE = BaseUrl + ALL_COURSE_API

//STRIPE PAYMENT
export const STRIPE_PAYMENT_API = BaseUrl + StripePaymentApi
