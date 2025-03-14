import { createSlice } from "@reduxjs/toolkit";

let logoutTimer;

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
        const user = action.payload;
        localStorage.setItem("user", JSON.stringify(user));
        state.user = user;
        state.isAuthenticated = true;
      },
      signIn: (state, action) => {
        const { email, password } = action.payload;
        const storedUser = JSON.parse(localStorage.getItem("user"));
  
        if (storedUser && storedUser.email === email && storedUser.password === password) {
          state.user = storedUser;
          state.isAuthenticated = true;
          clearTimeout(logoutTimer);
          logoutTimer = setTimeout(() => {
            localStorage.removeItem("user");
            state.user = null;
            state.isAuthenticated = false;
            window.location.href = "/signin";
          }, 5 * 60 * 1000); // 5 minutes auto logout
        } else {
          throw new Error("Invalid credentials");
        }
      },
      logout: (state) => {
        localStorage.removeItem("user");
        state.user = null;
        state.isAuthenticated = false;
        clearTimeout(logoutTimer);
      },
  },
});

export const { signUp, signIn, logout } = authSlice.actions;
export default authSlice.reducer;
