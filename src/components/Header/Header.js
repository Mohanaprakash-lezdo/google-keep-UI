import React from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import "./Header.css";


const Header = () => {
    return (
      <header className="header">
          <div className="header-content">
          <h1>
            <LightbulbIcon className="icon" />
            Keep
          </h1>
          <input type="text" placeholder="Search..." />
          </div>
      </header>
    );
  };
export default Header;
