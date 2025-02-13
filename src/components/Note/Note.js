import React, { useState, useEffect, useRef } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon  from "@mui/icons-material/Close"
import "./Note.css";

const Note = (props) => {
  const { id, title, content, image, isPinned, deleteNote, pinNote, copyNote,editNote } =
    props;
  const [showMenu, setShowMenu] = useState(false);
  const [showModalMenu, setShowModalMenu]=useState(false);
  const [hovered,setHovered]=useState(false);
  const [isexpanded,setisExpanded]=useState(false);
  const [isediting,setisEditing]=useState(false);
  const [editedTitle,setEditedTitle]=useState(title);
  const [editedContent,setEditedContent]=useState(content);
  const[editedImage,setEditedImage]=useState(image);
  const [lastedited,setLastEdited]=useState(null)


  const menuRef=useRef(null);
  const modalMenuRef=useRef(null);

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
      //  close modal menu separtely
      if (modalMenuRef.current && !modalMenuRef.current.contains(event.target)){
        setShowModalMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle edit mode
  const  handleEdit=()=>{
    setisEditing(true);
    setShowMenu(false)
  }
  // Save edited content
  const  handleSaveEdit=()=>{
    if(editedTitle !==title || editedContent !==content || editedImage !==image){
    const currentTime=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    editNote(id,editedTitle,editedContent,editedImage,currentTime);
    setLastEdited(currentTime);

    }
    
    setisEditing(false)
  }
  const handleImageChange=(event)=>{
    const file=event.target.files[0];
    if (file){
      const imageUrl=URL.createObjectURL(file);
      setEditedImage(imageUrl)
    }
  }

  return (
    <>   
    {/* {Normal view} */}
    <div className={`note ${isPinned ? "pinned" : ""}`}
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(true)}
    onClick={()=>setisExpanded(true)}>

      {/* {displays uploaded image } */}
      {image && <img src={image} alt="uploaded" className="note-image" 
       />}

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
            className={`more-options ${showMenu ? 'active':''}`}
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
           <button onClick={handleEdit}>Edit</button>
          <button onClick={handleCopy}>Make a Copy</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
    {/* Expanded View */}
    {isexpanded &&(
      <div className="modal-overlay" onClick={()=>setisExpanded(false)}>
        <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
          {/* pin & 3-dot & close Menu Container */}
          <div className="modal-icons">
            {/* {pin icon  in top right} */}
            <button className="modal-pin-icon" onClick={handlePin} title={isPinned? 'Unpin Note':"Pin Note"}>
              <PushPinIcon style={{color:isPinned?'black': 'grey' }}/>
            </button>
  
          {/* {More Options Buttons } */}
          <button
                className='modal-more-options' 
                onClick={(e) =>{e.stopPropagation() ;setShowModalMenu(!showModalMenu)}}
                title="More options"
              >
                <MoreVertIcon />
              </button>
            {/* Dropdown Menu (Inside Modal) */}
            {showMenu && (
                <div className="modal-menu" ref={modalMenuRef }>
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleCopy}>Make a Copy</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              )}
            </div>

            {/* editing */}
            {editedImage && <img src={editedImage} alt="uploaded" className="modal-image"/>}
            {isediting ?(
                <div className='edit'>
                <input
                type='text'
                className="edit-title"
                value={editedTitle}
                onChange={(e)=>setEditedTitle(e.target.value)}
                placeholder="edit-title"
                />
                <textarea
                className="edit-input"
                value={editedContent}
                onChange={(e)=>setEditedContent(e.target.value)}/>
                <input
                type='file'
                accept="image/*"
                onChange={handleImageChange}
                 />
                
          
                <button className="save-button" onClick={handleSaveEdit}>Save</button>
                </div>
              ):(
                <>
                <h2>{editedTitle}</h2>
                 <span>{content}</span>
                 {lastedited &&<p className="edited time">Edited on:{lastedited}</p>}
                </>
              )}
            
         
          {/* Close  Button in bottom right */}
          <button className="close-button" onClick={()=>setisExpanded(false)}>
            <CloseIcon/>
          </button>
        </div>
        </div>
    )}
    </>
  );
};
export default Note;
