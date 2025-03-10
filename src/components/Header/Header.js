import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../features/NotesSlice";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
// import SearchIcon from '@mui/icons-material/Search';
import "./Header.css";


const Header = () => {
  const dispatch=useDispatch();

  const onChange=(event)=>{
    dispatch(setSearchQuery(event.target.value))
  };

    return (
      <header className="header">
          <div className="header-content">
          <h1>
            <LightbulbIcon className="icon" />
            Keep
          </h1>
          <input type='search' 
          placeholder="Search..."
          
          onChange={onChange}
           />
          </div>
      </header>
    );
  };
export default Header;
