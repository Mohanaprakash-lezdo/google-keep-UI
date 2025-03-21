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


// import { createSlice } from "@reduxjs/toolkit";

// const storedUser = JSON.parse(localStorage.getItem("user"));
// const isAuthenticated =  localStorage.getItem("isAuthenticated") === "true";

// const initialState = {
//   isAuthenticated: !! storedUser ? isAuthenticated:false ,  // Reset if no user
//   user: storedUser || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // signUp: (state, action) => {
//     //   const newUser = action.payload;
//     //   localStorage.setItem("user", JSON.stringify(newUser));
//     // },
//     // signIn: (state, action) => {
//     //   state.isAuthenticated = true;
//     //   state.user = action.payload;
//     //   localStorage.setItem("isAuthenticated", "true");
//     //   localStorage.setItem("user", JSON.stringify(action.payload));
//     // },
//     // signOut: (state) => {
//     //   state.isAuthenticated = false;
//     //   state.user = null;
//     //   localStorage.removeItem("isAuthenticated");
//     //   localStorage.removeItem("user");
//     // },
//     // signUp: (state, action) => {
//     //   const newUser = action.payload;
//     //   localStorage.setItem("user", JSON.stringify(newUser));
//     //   localStorage.setItem("isAuthenticated", "true");
//     //   state.isAuthenticated = true;
//     //   state.user = newUser;
//     // },
//     // signIn: (state, action) => {
//     //   state.isAuthenticated = true;
//     //   state.user = action.payload;
//     //   localStorage.setItem("isAuthenticated", "true");
//     //   localStorage.setItem("user", JSON.stringify(action.payload));
//     // },
//     // signOut: (state) => {
//     //   state.isAuthenticated = false;
//     //   state.user = null;
//     //   localStorage.removeItem("isAuthenticated");
//     //   localStorage.removeItem("user");
//     // },
//     signUp: (state, action) => {
//       const newUser = action.payload;
//       localStorage.setItem('user',JSON.stringify(newUser));
//       state.user = newUser;
//       state.isAuthenticated = false;
//       // User must sign in manually
//       // localStorage.setItem("user", JSON.stringify(newUser));
//       // localStorage.setItem("isAuthenticated", "true");
//     },
//     signIn: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//       localStorage.setItem("isAuthenticated", "true");
//     },
//     signOut: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("isAuthenticated");
//       sessionStorage.clear(); 
//       //  Clears session storage too
//     },
//   },
// });

// export const { signUp, signIn, signOut } = authSlice.actions;
// export default authSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const storedUser = JSON.parse(localStorage.getItem("user"));
// const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

// const initialState = {
//   isAuthenticated: storedUser ? isAuthenticated : false, 
//   user: storedUser || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signUp: (state, action) => {
//       const newUser = action.payload;
//       localStorage.setItem("user", JSON.stringify(newUser));
//       state.user = newUser;
//       state.isAuthenticated = false; // User must sign in manually
//     },
//     signIn: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//       localStorage.setItem("isAuthenticated", "true");
//     },
//     signOut: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("isAuthenticated");
//     },
//   },
// });

// // ✅ Middleware to auto-logout after 5 minutes
// // const sessionTimeoutMiddleware = (store) => (next) => (action) => {
// //   if (action.type === signIn.type) {
// //     setTimeout(() => {
// //       alert("Session timed out. Please sign in again.");
// //       store.dispatch(signOut());
// //     }, 120000); // 5 minutes (300,000 ms)
// //   }

// //   return next(action);
// // };
// let sessionTimeout; // Store timeout reference

// const sessionTimeoutMiddleware = (store) => (next) => (action) => {
//   if (action.type === signIn.type) {
//     // Clear any existing timeout before setting a new one
//     clearTimeout(sessionTimeout);

//     sessionTimeout = setTimeout(() => {
//       alert("Session timed out. Please sign in again.");
//       store.dispatch(signOut());
//     }, 120000); // 2 minutes
//   }

//   return next(action);
// };


// export const { signUp, signIn, signOut } = authSlice.actions;
// export default authSlice.reducer;

// // ✅ Attach middleware inside store.js
// export const authMiddleware = sessionTimeoutMiddleware;
import { createSlice } from "@reduxjs/toolkit";

const storedUsers = JSON.parse(localStorage.getItem("users")) || []; // Get all registered users
const storedUser = JSON.parse(localStorage.getItem("currentUser"));
const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

const initialState = {
  isAuthenticated: storedUser ? isAuthenticated : false,
  currentUser: storedUser || null, // Store the currently logged-in user
  registeredUsers: storedUsers, // Store all registered users
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      const newUser = action.payload;
      
      // Check if the user already exists
      const userExists = state.registeredUsers.some(user => user.email === newUser.email);
      if (userExists) {
        alert("User already registered. Please Sign In.");
        return;
      }

      // Add new user to registered users list
      state.registeredUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.registeredUsers));
      
      alert("Registration successful! Please sign in.");
    },
    
    signIn: (state, action) => {
      const { email, password } = action.payload;
      
      // Find user in registered users list
      const user = state.registeredUsers.find(user => user.email === email && user.password === password);
      
      if (user) {
        state.isAuthenticated = true;
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
      } else {
        alert("Invalid credentials or user not registered.");
      }
    },

    signOut: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

// ✅ Session Timeout Middleware (Auto-Logout)
let sessionTimeout;

const sessionTimeoutMiddleware = (store) => (next) => (action) => {
  if (action.type === signIn.type) {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
      alert("Session timed out. Please sign in again.");
      store.dispatch(signOut());
    }, 300000); // 5 minutes
  }

  return next(action);
};

export const { signUp, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
export const authMiddleware = sessionTimeoutMiddleware;
