import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      profilePicture: "",
      _id: "",
      name: "",
      email: "",
      role: "",
      bio: "",
      headline: "",
      expertise: "",
      phone: "",
      rating: "",
      courses: [],
    },
  },
  reducers: {
    setUserData: (state , action)=>{
        state.userData = action.payload;
    },
    addUserCourse:(state , action) =>{
        state.userData.courses.push(action.payload)
    }
  }
});

export const {setUserData , addUserCourse} = userSlice.actions;
export const selectUserCourses = (state) => state.user.userData.courses;
export default userSlice.reducer;
