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
