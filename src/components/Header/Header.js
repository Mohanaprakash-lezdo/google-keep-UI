import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { setSearchQuery } from "../../features/NotesSlice";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
// import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { signOut } from "../../features/authSlice";
import "./Header.css";


const Header = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const onChange=(event)=>{
    dispatch(setSearchQuery(event.target.value))
  };
  const handleLogout = () => {
    dispatch(signOut()); // Dispatch sign out action
    navigate("/signin"); // Redirect to Sign In page
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
          
          onChange={onChange}/>
          {isAuthenticated && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
           
          </div>
      </header>
    );
  };
export default Header;