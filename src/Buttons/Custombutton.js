import React from "react";
import Button from "@mui/material/Button";
import "./Custombutton.css";

const CustomButton = ({ variant, children, ...props }) => {
  return (
    <Button
      className={`custom-button ${variant}`}
      variant="contained"
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
// import  Button  from "@mui/material/Button";
// import PropTypes from "prop-types";
// import "./Custombutton.css";

// const CustomButton = ({ variant, children, ...props }) => {
//   console.log(`🎯 Rendering CustomButton with variant: ${variant}`);

//   return (
//     <Button
//       className={`custom-button ${variant}`}
//       variant="contained"
//       {...props}
//     >
//       {children}
//     </Button>
//   );
// };

// CustomButton.propTypes = {
//   variant: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// };

// export default CustomButton;
