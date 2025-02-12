import React, { useState, useEffect, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon  from "@mui/icons-material/Close"
import "./Note.css";

const Note = (props) => {
  const { id, title, content, image, isPinned, deleteNote, pinNote, copyNote } =
    props;
  const [showMenu, setShowMenu] = useState(false);
  const [hovered,setHovered]=useState(false);
  const [isexpanded,setisExpanded]=useState(false);
  const menuRef=useRef(null);

  // delete notes
  const handleDelete = () => {
    deleteNote(id);
    setShowMenu(false);
  };

  // handle the pin
  const handlePin = () => {
    pinNote(id);
  };

  // make a copy
  const handleCopy = () => {
    copyNote({ title, content, image, isPinned: false });
    setShowMenu(false);
  };

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>   
    {/* {Normal view} */}
    <div className={`note ${isPinned ? "pinned" : ""}`}
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(false)}
    onClick={()=>setisExpanded(true)}>

      {/* {displays uploaded image } */}
      {image && <img src={image} alt="uploaded" className="note-image" />}

      <div className="note-content">
        <h2>{title}</h2>
        <span>{content}</span>
      </div>

      {/* {icon container(hidden)} */}
      {hovered &&(
        <div className="icons">
          {/* {pin button} */}
          <button
            className="pin-icon"
            onClick={(e)=>{
              e.stopPropagation();
              handlePin()
            }}
            title={isPinned ? "Unpin Note" : "Pin Note"}
            style={{ color: isPinned ? "black" : "grey" }}
          >
            <PushPinIcon />
          </button>

          {/* {More options button(Three dots)} */}
          <button
            className="more-options"
            onClick={(e) =>{e.stopPropagation(); 
              setShowMenu(!showMenu)
            }}
            title="More options"
          >
            <MoreVertIcon />
          </button>
        </div>
        )}
      {/* {DropDown Menu (Copy and Delete )} */}
      {showMenu && (
        <div className="menu" ref={menuRef}>
          <button onClick={(e)=>{e.stopPropagation();handleCopy()}}>Make a Copy</button>
          <button onClick={(e)=>{e.stopPropagation();handleDelete()}}>Delete</button>
        </div>
      )}
    </div>
    {/* Expanded View */}
    {isexpanded &&(
      <div className="modal-overlay" onClick={()=>setisExpanded(false)}>
        <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
          {/* pin & 3-dot Menu Container */}
          <div className="modal-icons">
            {/* {pin icon  in top right} */}
            <button className="modal-pin-icon" onClick={handlePin} title={isPinned? 'Unpin Note':"Pin Note"}>
              <PushPinIcon style={{color:isPinned?'black': 'grey' }}/>
            </button>
  
          {/* {More Options Buttons below pin } */}
          <button
                className="modal-more-options"
                onClick={() => setShowMenu(!showMenu)}
                title="More options"
              >
                <MoreVertIcon />
              </button>
            {/* Dropdown Menu (Inside Modal) */}
            {showMenu && (
                <div className="menu" ref={menuRef}>
                  <button onClick={handleCopy}>Make a Copy</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              )}
            </div>

            {/* Content */}
            {image && <img src={image} alt="uploaded" className="modal-image"/>}
          <h2>{title}</h2>
          <span>{content}</span>
          {/* Close  Button in bottom right */}
          <button className="close-button" onClick={()=>setisExpanded(false)}>
            <CloseIcon/>
          </button>
         

          {/* {Expanded View Options} */}
          {/* <div className="modal-icons">
            <button
            className="pin-icon"
            onClick={handlePin}
            title={isPinned ?"unpin Note":"Pin Note"}
            style={{color:isPinned?'black':'grey'}}
            >
              <PushPinIcon/>
            </button>
            <button onClick={handleCopy}>Make a Copy</button>
            <button onClick={handleDelete}>Delete</button>
          </div>  */}
        </div>
        </div>
    )}
    </>
  );
};
export default Note;
