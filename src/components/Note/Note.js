// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   pinNote,
//   copyNote,
//   editNote,
//   deleteNote,
// } from "../../features/NotesSlice";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PushPinIcon from "@mui/icons-material/PushPin";
// import CloseIcon from "@mui/icons-material/Close";
// import ImageIcon from "@mui/icons-material/Image";
// import IconButton from "@mui/material/IconButton";
// import "./Note.css";
// // import userEvent from "@testing-library/user-event";

// const Note = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { noteId } = useParams();
//   const modalref = useRef(null);
//   // get note id from url
//   const menuRef = useRef(null);

//   const fileInputRef = useRef(null);


//   // Get note  data from redux store
//   const note = useSelector((state) =>
//     state.notes.notes.find((note) => note.id === noteId)
//   );

//   const { title, content, image, isPinned } = note || {};

//   const [showMenu, setShowMenu] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const [isexpanded, setisExpanded] = useState(false);
//   const [isediting, setisEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(note?.title || "");
//   const [editedContent, setEditedContent] = useState(note?.content || "");
//   const [editedImage, setEditedImage] = useState(note?.image || null);
//   const [lastedited, setLastEdited] = useState(null);

//   useEffect(() => {
//     if (noteId) {
//       setisExpanded(true);
//     } 
//   }, [noteId]);

 

//   const handleCloseModal = useCallback(() => {
//     setisExpanded(false);
//     setisEditing(false);
//     navigate("/");
//     // it will go back to the previous route
//   }, [navigate]);
  
//   // close modal when clicking outside
//   useEffect(() => {
//     if (!isexpanded) return;

//     const handleClickOutside = (event) => {
//       if (modalref.current && !modalref.current.contains(event.target)) {
//         handleCloseModal();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isexpanded, handleCloseModal]);

//   if (!note) {
//     return <div className="note-placeholder">Note not found</div>;
//   }
 

//   // delete notes
//   const handleDelete = () => {
//     dispatch(deleteNote(note.id));
//     setShowMenu(false);
//     navigate("/");
//   };

//   const handleDeleteImage = () => {
//     setEditedImage(null);
//     dispatch(editNote({ id:note.id,title: editedTitle,content: editedContent, image: null }));
//   };

//   // handle the pin
//   const handlePin = () => {
//     dispatch(pinNote(note.id));
//   };

//   // make a copy
//   const handleCopy = () => {
//     dispatch(copyNote({ title , content, image, isPinned: false }));
//     setShowMenu(false);
//   };

//   // Handle edit mode
//   const handleEdit = () => {
//     setisEditing(true);
//     setShowMenu(false);
//   };
//   // Save edited content
//   const handleSaveEdit = () => {
//     if (
//       editedTitle !== title ||
//       editedContent !== content ||
//       editedImage !== image
//     ) {
//       const currentTime = new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       dispatch(
//         editNote({
//           id,
//           title: editedTitle,
//           content: editedContent,
//           image: editedImage,
//           lastedited: currentTime,
//         })
//       );
//       setLastEdited(currentTime);
//     }
//     setisEditing(false);
//   };
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setEditedImage(imageUrl);
//     }
//   };

//   // fn to trigger the target file
//   const handleImageUploadClick = () => {
//     fileInputRef.current?.click();
//     // open the file picker
//   };

//   // open note  in modal &update url
//   const handleOpenNote = () => {
//     navigate(`/note/${note.id}`);
//     // update URL
//     setisExpanded(true);
//   };

//   // open modal automatically if noteid exists in the url

 

//   return (
//     <>
//       {/* Normal View */}
//       <div
//         className={`note ${isPinned ? "pinned" : ""}`}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         onClick={handleOpenNote}
//       >
//         {/* Displays uploaded image */}
//         {image && <img src={image} alt="uploaded" className="note-image" />}

//         <div className="note-content">
//           <h2>{title}</h2>
//           <span>{content}</span>
//         </div>

//         {/* Icon Container (Hidden by Default) */}
//         {hovered && (
//           <div className="icons">
//             {/* Pin Button */}
//             <button
//               className="pin-icon"
//               onClick={handlePin}
//               title={isPinned ? "Unpin Note" : "Pin Note"}
//               style={{ color: isPinned ? "black" : "grey" }}
//             >
//               <PushPinIcon />
//             </button>

//             {/* More Options Button (Three Dots) */}
//             <button
//               className='more-options'
//               onClick={()=>
//                 setShowMenu(!showMenu)}
//               title="More options"
//             >
//               <MoreVertIcon />
//             </button>
//           </div>
//         )}

//         {/* DropDown Menu (Copy and Delete) */}
//         {showMenu && (
//           <div className="menu" ref={menuRef}>
//             <button onClick={handleEdit}>Edit</button>
//             <button onClick={handleCopy}>Make a Copy</button>
//             <button onClick={handleDelete}>Delete</button>
//           </div>
//         )}
//       </div>

//       {/* Expanded View */}
//       {isexpanded && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal-content" ref={modalref}>
//             {/* Editing */}
//             {editedImage && (
//               <>
//                 <img src={editedImage} alt="uploaded" className="modal-image" />
//                 {!isediting && (
//                   <button
//                     className="delete-image"
//                     onClick={handleDeleteImage}
//                     title="Remove Image"
//                   >
//                     <DeleteIcon />
//                   </button>
//                 )}
//               </>
//             )}

//             {isediting ? (
//               <div className="edit-note-container">
//                 <input
//                   type="text"
//                   className="edit-note-title"
//                   value={editedTitle}
//                   onChange={(e) => setEditedTitle(e.target.value)}
//                   placeholder="Edit title"
//                 />
//                 <textarea
//                   className="edit-note-content"
//                   value={editedContent}
//                   onChange={(e) => setEditedContent(e.target.value)}
//                   placeholder="Edit description"
//                 />
//                 <div className="edit-note-actions">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     ref={fileInputRef}
//                     style={{ display: "none" }}
//                     onChange={handleImageChange}
//                   />
//                   <IconButton onClick={handleImageUploadClick} color="primary">
//                     <ImageIcon />
//                   </IconButton>
//                 </div>
//                 <button className="save-button" onClick={handleSaveEdit}>
//                   Save
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <h2>{editedTitle}</h2>
//                 <span>{content}</span>
//                 {lastedited && (
//                   <p className="edited-time">Edited on: {lastedited}</p>
//                 )}
//               </>
//             )}

//             {/* Close Button in Bottom Right */}
//             <button
//               className="close-button"
//               onClick={() => setisExpanded(false)}
//             >
//               <CloseIcon />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default Note;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, pinNote, copyNote, editNote } from "../../features/NotesSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";
import "./Note.css";

const Note = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noteId } = useParams();
  const modalref = useRef(null);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Get the note from Redux store
  const notes = useSelector((state) => state.notes?.notes || [])
  const note=notes.find((n) => n.id === noteId);

  if (!note) return  null;

  const [showMenu, setShowMenu] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note?.title || '');
  const [editedContent, setEditedContent] = useState(note?.content || '');
  const [editedImage, setEditedImage] = useState(note?.image || null);

  useEffect(() => {
      setEditedTitle(note?.title|| '')
      setEditedContent(note?.content || '')
      setEditedImage(note?.image || null);
  }, [note]);

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

 

  // if (!note) 
  //   return null; // Prevent errors if note is not found

  // Destructure note properties
  // const { id, title, content, image, isPinned,lastEdited } = note;

 
  // const [lastEdited, setLastEdited] = useState(note?.lastEdited || null);

  const handleDelete = () => {
    dispatch(deleteNote(id));
    setShowMenu(false);
    navigate("/");
  };

  const handleDeleteImage = () => {
    dispatch(editNote({ id:note.id, title:editedTitle, content:editedContent, image: null }));
  };

  const handlePin = () => {
    dispatch(pinNote(note.id));
  };

  const handleCopy = () => {
    dispatch(copyNote({ 
      title:note?.title || '',
      content:note?.content || '',
      image:note?.image || null,
      isPinned: false }));
    setShowMenu(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveEdit = () => {
    if (editedTitle !== note?.title || 
      editedContent !== note?.content ||
       editedImage !==note?.image) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      dispatch(editNote({ id:note?.id, title: editedTitle, content: editedContent, image: editedImage, lastEdited: currentTime }));
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
    navigate(`/note/${note.id}`);
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
              title={note?.isPinned ? "Unpin Note" : "Pin Note"}
              style={{ color: note?.isPinned ? "black" : "grey" }}
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
          <div className="menu" ref={menuRef}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleCopy}>Make a Copy</button>
            <button onClick={handleDelete}>Delete</button>
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
                <h2>{note?.title}</h2>
                <span>{note?.content}</span>
                {note?.lastEdited && <p className="edited time">Edited on: {note?.lastEdited}</p>}
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
