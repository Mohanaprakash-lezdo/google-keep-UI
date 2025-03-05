import React, { useState, useEffect, useRef, useCallback } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteNote, pinNote, copyNote, editNote,archiveNote,UnarchiveNote} from "../../features/NotesSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import ArchiveIcon from "@mui/icons-material/Archive"; // ✅ Archive icon
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";
import {v4 as  uuidv4} from 'uuid';
import "./Note.css";

const Note = ({id,title,content,image,isPinned,lastEdited,isArchived}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // const location = useLocation();  
  const modalref = useRef(null);
  
  const fileInputRef = useRef(null);



  const [showMenu, setShowMenu] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title ||'');
  const [editedContent, setEditedContent] = useState(content ||'');
  const [editedImage, setEditedImage] = useState(image || null);



  // Sync state with  redux when  note changes
  useEffect(()=>{
      setEditedTitle(title || '')
      setEditedContent(content || '')
      setEditedImage(image || null)
    }
  ,[title,content,image]);

  const handleCloseModal = useCallback(() => {
    setIsExpanded(false);
    setIsEditing(false);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event) => {
      if (modalref.current && !modalref.current.contains(event.target)) {
        handleCloseModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded, handleCloseModal]);

  // if (!note) return  null;

  // const {id,isPinned,lastEdited}=note;
 

  

  const handleDelete = () => {
    dispatch(deleteNote(id));
    setShowMenu(false);
    navigate("/");
  };

  const handleArchive = () => {
    dispatch(archiveNote(id));
    setShowMenu(false);
    navigate("/archive"); // ✅ Navigate to Archive page after archiving
  };

  const handleUnarchive = () => {
    dispatch(UnarchiveNote(id));
    setShowMenu(false);
    navigate("/"); // ✅ Navigate to Home page after unarchiving
  };

  const handleDeleteImage = () => {
    dispatch(editNote({ id, title:editedTitle, content:editedContent, image: null }));
  };

  const handlePin = () => {
    dispatch(pinNote(id));
  };

  const handleCopy = () => {
    dispatch(copyNote({ 
      id:uuidv4(),
      title:editedTitle,
      content:editedContent,
      image:editedImage,
      isPinned: false }));
    setShowMenu(false);
  };

  

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveEdit = () => {
    if (editedTitle !== title || 
      editedContent !== content ||
       editedImage !==image) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      dispatch(editNote({ id, title: editedTitle, content: editedContent, image: editedImage, lastEdited: currentTime }));
      // setLastEdited(currentTime);
    }
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedImage(imageUrl);
    }
  };

  const handleImageUploadClick = () => 
      fileInputRef.current.click();

  const handleOpenNote = () => {
    navigate(`/note/${id}`);
    setIsExpanded(true);  
  };

  
  

  return (
    <>
      <div
        className={`note ${isPinned ? "pinned" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleOpenNote}
      >
        {image && <img src={image} alt="uploaded" className="note-image" />}

        <div className="note-content">
          <h2>{title}</h2>
          <span>{content}</span>
        </div>

        {hovered && (
          <div className="icons">
            <button
              className="pin-icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePin();
              }}
              title={isPinned ? "Unpin Note" : "Pin Note"}
              style={{ color: isPinned ? "black" : "grey" }}
            > 
              <PushPinIcon />
            </button>

            <button
              className='more-options'  
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              title="More options"
            >
              <MoreVertIcon />
            </button>
          </div>
        )}

        {showMenu && (
          <div className="menu" >
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleCopy}>Make a Copy</button>
            {isArchived ? (
              <button onClick={handleUnarchive}>
                <UnarchiveIcon /> Unarchive
              </button>
            ) : (
              <button onClick={handleArchive}>
                <ArchiveIcon /> Archive
              </button>
            )}
            <button onClick={handleDelete}>
              <DeleteIcon /> Delete
            </button>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} ref={modalref}>
            {editedImage && (
              <>
                <img src={editedImage} alt="uploaded" className="modal-image" />
                {!isEditing && (
                  <button className="delete-image" onClick={handleDeleteImage} title="Remove Image">
                    <DeleteIcon />
                  </button>
                )}
              </>
            )}

            {isEditing ? (
              <div className="edit-note-container">
                <input
                  type="text"
                  className="edit-note-title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Edit Title"
                />
                <textarea
                  className="edit-note-content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="Edit Description"
                />
                <div className="edit-note-actions">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <IconButton onClick={handleImageUploadClick} color="primary">
                    <ImageIcon />
                  </IconButton>
                </div>

                <button className="save-button" onClick={handleSaveEdit}>
                  Save
                </button>
              </div>
            ) : (
              <>
                <h2>{editedTitle}</h2>
                <span>{editedContent}</span>
                {lastEdited && <p className="edited time">Edited on: {lastEdited}</p>}
              </>
            )}

            <button className="close-button" onClick={() => setIsExpanded(false)}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Note;


// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteNote, pinNote, copyNote, editNote, archiveNote, UnarchiveNote } from "../../features/NotesSlice";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PushPinIcon from "@mui/icons-material/PushPin";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import UnarchiveIcon from "@mui/icons-material/Unarchive";
// import { v4 as uuidv4 } from "uuid";
// import "./Note.css";

// const Note = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const modalref = useRef(null);

//   // Get note from Redux state
//   const note = useSelector((state) => state.notes.notes.items.find((note) => note.id === id));

//   const [showMenu, setShowMenu] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(note?.title || "");
//   const [editedContent, setEditedContent] = useState(note?.content || "");
//   const [editedImage, setEditedImage] = useState(note?.image || null);

//   useEffect(() => {
//     if (note) {
//       setEditedTitle(note.title || "");
//       setEditedContent(note.content || "");
//       setEditedImage(note.image || null);
//     }
//   }, [note]);

//   const handleCloseModal = useCallback(() => {
//     setIsExpanded(false);
//     navigate("/");
//   }, [navigate]);

//   useEffect(() => {
//     if (!isExpanded) return;
//     const handleClickOutside = (event) => {
//       if (modalref.current && !modalref.current.contains(event.target)) {
//         handleCloseModal();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isExpanded, handleCloseModal]);

//   if (!note) return null;

//   const { title, content, image, isPinned, isArchived } = note;

//   const handleDelete = () => {
//     dispatch(deleteNote(id));
//     setShowMenu(false);
//     navigate("/");
//   };

//   const handleArchive = () => {
//     dispatch(archiveNote(id));
//     setShowMenu(false);
//     navigate("/archive");
//   };

//   const handleUnarchive = () => {
//     dispatch(UnarchiveNote(id));
//     setShowMenu(false);
//     navigate("/");
//   };

//   const handlePin = () => {
//     dispatch(pinNote(id));
//   };

//   const handleCopy = () => {
//     dispatch(copyNote({
//       id: uuidv4(),
//       title: editedTitle,
//       content: editedContent,
//       image: editedImage,
//       isPinned: false
//     }));
//     setShowMenu(false);
//   };

//   return (
//     <>
//       <div
//         className={`note ${isPinned ? "pinned" : ""}`}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         onClick={() => setIsExpanded(true)}
//       >
//         {image && <img src={image} alt="uploaded" className="note-image" />}
//         <div className="note-content">
//           <h2>{title}</h2>
//           <span>{content}</span>
//         </div>

//         {hovered && (
//           <div className="icons">
//             <button className="pin-icon" onClick={handlePin} title={isPinned ? "Unpin Note" : "Pin Note"}>
//               <PushPinIcon />
//             </button>
//             <button className="more-options" onClick={() => setShowMenu(!showMenu)} title="More options">
//               <MoreVertIcon />
//             </button>
//           </div>
//         )}

//         {showMenu && (
//           <div className="menu">
//             <button onClick={handleCopy}>Make a Copy</button>
//             {isArchived ? <button onClick={handleUnarchive}><UnarchiveIcon /> Unarchive</button> : <button onClick={handleArchive}><ArchiveIcon /> Archive</button>}
//             <button onClick={handleDelete}><DeleteIcon /> Delete</button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Note;
