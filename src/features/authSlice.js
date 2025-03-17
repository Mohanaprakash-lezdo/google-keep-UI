// import { createSlice } from "@reduxjs/toolkit";

// // let logoutTimer;

// // const initialState = {
// //   user: JSON.parse(localStorage.getItem("user")) || null,
// //   isAuthenticated: !!localStorage.getItem("user"),
// // };  
// const initialState = {
//   isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false, 
//   user: JSON.parse(localStorage.getItem("user")) || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // signUp: (state, action) => {
//     //   clearTimeout(logoutTimer);
//     //     const user = action.payload;
//     //     localStorage.setItem("user", JSON.stringify(user));
//     //     state.user = user;
//     //     state.isAuthenticated = true; 
//     //   },
//     //   signIn: (state, action) => {
//     //     const { email, password } = action.payload;
//     //     const storedUser = JSON.parse(localStorage.getItem("user"));
  
//     //     if (storedUser && storedUser.email === email && storedUser.password === password) {
//     //       state.user = storedUser;
//     //       state.isAuthenticated = true;
//     //       clearTimeout(logoutTimer);
//     //       logoutTimer = setTimeout(() => {
//     //         localStorage.removeItem("user");
//     //         state.user = null;
//     //         state.isAuthenticated = false;
//     //         window.location.href = "/signin";
//     //       }, 5 * 60 * 1000); // 5 minutes auto logout
//     //     } else {
//     //       throw new Error("Invalid credentials");
//     //     }
//     //   },
//     //   logout: (state) => {
//     //     localStorage.removeItem("user");
//     //     state.user = null;
//     //     state.isAuthenticated = false;
//     //     clearTimeout(logoutTimer);
//     //     window.location.href = "/signin";
//     //   },
//     signIn: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       localStorage.setItem("isAuthenticated", "true"); 
//       localStorage.setItem("user", JSON.stringify(action.payload)); 
//     },
//     signUp: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     signOut: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       localStorage.removeItem("isAuthenticated");
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { signUp, signIn, logout } = authSlice.actions;
// export default authSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signUp: (state, action) => {
//       const newUser = action.payload;
//       localStorage.setItem("user", JSON.stringify(newUser));
//     },
//     signIn: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     signOut: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       localStorage.removeItem("isAuthenticated");
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { signUp, signIn, signOut } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const isAuthenticated =  localStorage.getItem("isAuthenticated") === "true";

const initialState = {
  isAuthenticated: !! storedUser ? isAuthenticated:false ,  // Reset if no user
  user: storedUser || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // signUp: (state, action) => {
    //   const newUser = action.payload;
    //   localStorage.setItem("user", JSON.stringify(newUser));
    // },
    // signIn: (state, action) => {
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    //   localStorage.setItem("isAuthenticated", "true");
    //   localStorage.setItem("user", JSON.stringify(action.payload));
    // },
    // signOut: (state) => {
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   localStorage.removeItem("isAuthenticated");
    //   localStorage.removeItem("user");
    // },
    // signUp: (state, action) => {
    //   const newUser = action.payload;
    //   localStorage.setItem("user", JSON.stringify(newUser));
    //   localStorage.setItem("isAuthenticated", "true");
    //   state.isAuthenticated = true;
    //   state.user = newUser;
    // },
    // signIn: (state, action) => {
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    //   localStorage.setItem("isAuthenticated", "true");
    //   localStorage.setItem("user", JSON.stringify(action.payload));
    // },
    // signOut: (state) => {
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   localStorage.removeItem("isAuthenticated");
    //   localStorage.removeItem("user");
    // },
    signUp: (state, action) => {
      const newUser = action.payload;
      localStorage.setItem('user',JSON.stringify(newUser));
      state.user = newUser;
      state.isAuthenticated = false;
      // User must sign in manually
      // localStorage.setItem("user", JSON.stringify(newUser));
      // localStorage.setItem("isAuthenticated", "true");
    },
    signIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuthenticated", "true");
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      sessionStorage.clear(); 
      //  Clears session storage too
    },
  },
});

export const { signUp, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
