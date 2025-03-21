// import React from "react";
// import "./Authlayout.css";  

// import { Outlet } from "react-router-dom";

// const AuthLayout = ({children}) => {
//   console.log("AuthLayout is rendering...");

//   return (
//     <div className="auth-layout">
//       {children}
//     </div>
//   );
// };

// function AuthLayout({ children }) {
//   return (
//     <div style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh", // Ensure it covers full height
//       backgroundColor: "grey"
//     }}>
//       <div style={{ width: "400px", padding: "20px", textAlign: "center" }}>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;

// const AuthLayout = ({ children }) => {
//   return (
//     <div className="auth-container">
//       {/* Left Side - Welcome Section */}
//       <div className="auth-welcome">
//         <div className="logo">LOGO</div>
//         <h1>Welcome Page</h1>
//         <p>Sign in to continue access</p>
//         <a href="https://www.yoursite.com" className="website-link">
//           www.yoursite.com
//         </a>
//       </div>

//       {/* Right Side - Authentication Form */}
//       <div className="auth-form">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;

// import React from "react";

// const AuthLayout = ({ children }) => {
//   const styles = {
//     container: {
//       display: "flex",
//       height: "100vh",
//       fontFamily: '"Poppins", sans-serif',
//     },
//     welcomeSection: {
//       flex: 1,
//       background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//       color: "rgb(134, 83, 83)",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: "20px",
//       textAlign: "center",
//       position: "relative",
//     },
//     logo: {
//       fontSize: "2rem",
//       fontWeight: "bold",
//       position: "absolute",
//       top: "20px",
//       left: "30px",
//     },
//     websiteLink: {
//       position: "absolute",
//       bottom: "20px",
//       color: "white",
//       textDecoration: "none",
//       fontSize: "14px",
//     },
//     formContainer: {
//       flex: 1,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "white",
//       boxShadow: "-5px 0px 10px rgba(0, 0, 0, 0.1)",
//       padding: "40px",
//     },
//     authBox: {
//       width: "100%",
//       maxWidth: "400px",
//       padding: "30px",
//       background: "white",
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//       borderRadius: "8px",
//       textAlign: "center",
//     },
//     input: {
//       width: "100%",
//       padding: "12px",
//       margin: "10px 0",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//       fontSize: "16px",
//     },
//     continueBtn: {
//       width: "100%",
//       background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
//       color: "white",
//       padding: "12px",
//       fontSize: "18px",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       transition: "0.3s ease",
//     },
//     continueBtnHover: {
//       opacity: "0.9",
//     },
//     socialLogin: {
//       marginTop: "15px",
//     },
//     socialBtn: {
//       width: "100%",
//       padding: "10px",
//       fontSize: "16px",
//       border: "none",
//       borderRadius: "6px",
//       marginTop: "10px",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     twitterBtn: {
//       background: "#1da1f2",
//       color: "white",
//     },
//     facebookBtn: {
//       background: "#3b5998",
//       color: "white",
//     },
//     // Responsive Design
//     mobileContainer: {
//       flexDirection: "column",
//     },
//     hideWelcome: {
//       display: "none",
//     },
//     noBoxShadow: {
//       boxShadow: "none",
//     },
//   };

//   return (
//     <div
//       style={{
//         ...styles.container,
//         ...(window.innerWidth <= 768 ? styles.mobileContainer : {}),
//       }}
//     >
//       {window.innerWidth > 768 && (
//         <div style={styles.welcomeSection}>
//           <div style={styles.logo}>Logo</div>
//           <p>Welcome to Our Platform</p>
//           <a href="/" style={styles.websiteLink}>
//             Visit Website
//           </a>
//         </div>
//       )}
//       <div
//         style={{
//           ...styles.formContainer,
//           ...(window.innerWidth <= 768 ? styles.noBoxShadow : {}),
//         }}
//       >
//         <div style={styles.authBox}>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;
// import React from "react";

// const AuthLayout = ({ children }) => {
//   const containerStyle = {
//     display: "flex",
//     height: "100vh",
//     fontFamily: "Poppins, sans-serif",
//     background: "linear-gradient(135deg, #a100ff, #ff0080)",
//     justifyContent: "center",
//     alignItems: "center",
//     // width:100%
//   };

//   const authWrapperStyle = {
//     display: "flex",
//     width: "80%",
//     maxWidth: "900px",
//     background: "white",
//     borderRadius: "10px",
//     boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
//     overflow: "hidden",
//   };

//   const welcomePanelStyle = {
//     flex: 1,
//     background: "linear-gradient(135deg, #3a0ca3, #7209b7)",
//     color: "white",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "30px",
//     textAlign: "center",
//   };

//   const logoStyle = {
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//   };

//   const authFormStyle = {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "40px",
//   };

//   const websiteLinkStyle = {
//     position: "absolute",
//     bottom: "20px",
//     color: "white",
//     textDecoration: "none",
//     fontSize: "14px",
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={authWrapperStyle}>
//         <div style={welcomePanelStyle}>
//           <div style={logoStyle}></div>
        
//         </div>
//         <div style={authFormStyle}>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;

// import React from "react";

// const AuthLayout = ({ children }) => {
//   const containerStyle = {
//     display: "flex",
//     height: "100vh",
//     width: "100vw", // Full width
//     fontFamily: "Poppins, sans-serif",
//     background: "linear-gradient(135deg, #a100ff, #ff0080)",
//     justifyContent: "center",
//     alignItems: "center",
//   };

//   const authWrapperStyle = {
//     display: "flex",
//     width: "100%", // Full width
//     maxWidth: "100%", // Ensure it takes the full width
//     background: "white",
//     borderRadius: "0px", // Remove border-radius for full width
//     boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
//     overflow: "hidden",
//   };

//   const welcomePanelStyle = {
//     flex: 1,
//     background: "linear-gradient(135deg, #3a0ca3, #7209b7)",
//     color: "white",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "30px",
//     textAlign: "center",
//   };

//   const logoStyle = {
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//   };

//   const authFormStyle = {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "40px",
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={authWrapperStyle}>
//         <div style={welcomePanelStyle}>
//           <div style={logoStyle}>LOGO</div>
//           <h2>Welcome Page</h2>
//           <p>Sign in to continue access</p>
//         </div>
//         <div style={authFormStyle}>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;

// import React from "react";

// const AuthLayout = ({ children }) => {
//   const containerStyle = {
//     display: "flex",
//     height: "100vh",
//     width: "100vw", // Full width
//     fontFamily: "Poppins, sans-serif",
//     background: "linear-gradient(135deg, #a100ff, #ff0080)",
//     justifyContent: "center",
//     alignItems: "center",
//   };

//   const authWrapperStyle = {
//     display: "flex",
//     width: "100%", // Full width
//     maxWidth: "100%", // Ensure it takes the full width
//     background: "white",
//     borderRadius: "0px", // Remove border-radius for full width
//     boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
//     overflow: "hidden",
//   };

//   const welcomePanelStyle = {
//     flex: 1,
//     background: "linear-gradient(135deg, #3a0ca3, #7209b7)",
//     color: "white",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "30px",
//     textAlign: "center",
//   };

//   const logoStyle = {
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//   };

//   const authFormStyle = {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "40px",
//     minWidth: "400px", // Fixed width to prevent expanding
//     minHeight: "450px", // Fixed height for consistency
//   };  

//   return (
//     <div style={containerStyle}>
//       <div style={authWrapperStyle}>
//         <div style={welcomePanelStyle}>
//           <div style={logoStyle}></div>
          
//         </div>
//         <div style={authFormStyle}>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;

import { backdropClasses } from "@mui/material";
import React from "react";

const AuthLayout = ({ children }) => {
  const containerStyle = {
    display: "flex",
    height: "100vh",
    width: "100vw", // Full width
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(135deg, #a100ff, #ff0080)",
    justifyContent: "center",
    alignItems: "center",
  };

  const authWrapperStyle = {
    display: "flex",
    width: "80%", // Adjust width as needed
    maxWidth: "1200px", // Set a max width for better appearance
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  };

  const welcomePanelStyle = {
    flex: 1,
    // background: "linear-gradient(135deg, #3a0ca3, #7209b7)",
    background:'linear-gradient(135deg, rgb(163 66 12), rgb(114, 9, 183))',
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    textAlign: "center",
  };
  

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const authFormContainerStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    background: "white",
  };

  const authFormStyle = {
    width: "100%",
    maxWidth: "400px", // Set max width to prevent expansion
    minHeight: "450px", // Set fixed height
    padding: "30px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={authWrapperStyle}>
        {/* Left Welcome Section */}
        <div style={welcomePanelStyle}>
          <h2 >Welcome Page</h2>
          <h2>Sign in to access</h2>
          <div style={logoStyle}></div>
          
        </div>

        {/* Right Auth Form Section */}
        <div style={authFormContainerStyle}>
          <div style={authFormStyle}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;