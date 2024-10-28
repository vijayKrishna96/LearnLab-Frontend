import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userLoggedIn: false
  },
  reducers: {
    setUserLoggedIn: (state ,action) =>{
        state.userLoggedIn = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserLoggedIn } = loginSlice.actions

export default loginSlice.reducer