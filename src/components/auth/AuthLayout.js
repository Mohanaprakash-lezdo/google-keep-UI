import React from "react";
// import { Outlet } from "react-router-dom";

// const AuthLayout = ({children}) => {
//   console.log("AuthLayout is rendering...");

//   return (
//     <div className="auth-layout">
//       {children}
//     </div>
//   );
// };

const AuthLayout = ({ children }) => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh" // Ensure it covers full height
    }}>
      <div style={{ width: "400px", padding: "20px", textAlign: "center" }}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;