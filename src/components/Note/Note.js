// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteNote, copyNote, archiveNote, UnarchiveNote, pinNote } from "../../features/NotesSlice";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import UnarchiveIcon from "@mui/icons-material/Unarchive";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import EditIcon from "@mui/icons-material/Edit";
// import PushPinIcon from "@mui/icons-material/PushPin";
// import { v4 as uuidv4 } from "uuid";
// import "./Note.css";

// const Note = ({ id }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showMenu, setShowMenu] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   // 🔥 Fetch the note from Redux store
//   const note = useSelector((state) =>
//     state.notes.notes.find((note) => note.id === id) ||
//     state.notes.archivedNotes.find((note) => note.id === id)
//   );

//   if (!note) return null; // Prevent errors if note is missing

//   const { title, content, labels, isPinned, isArchived } = note;

//   // Copy Note
//   const handleCopy = (e) => {
//     e.stopPropagation();
//     dispatch(
//       copyNote({
//         id: uuidv4(),
//         title,
//         content,
//         labels,
//         isPinned: false,
//         isArchived: false,
//       })
//     );
//     setShowMenu(false);
//   };

//   // Delete Note
//   const handleDelete = (e) => {
//     e.stopPropagation();
//     dispatch(deleteNote(id));
//     setShowMenu(false);
//   };

//   // Archive Note
//   const handleArchive = (e) => {
//     e.stopPropagation();
//     dispatch(archiveNote(id));
//     setShowMenu(false);
//     navigate("/archive");
//   };

//   // Unarchive Note
//   const handleUnarchive = (e) => {
//     e.stopPropagation();
//     dispatch(UnarchiveNote(id));
//     setShowMenu(false);
//     navigate("/");
//   };

//   // Edit Note
//   const handleEdit = (e) => {
//     e.stopPropagation();
//     navigate(`/note/${id}`);
//   };

//   // Pin Note
//   const handlePin = (e) => {
//     e.stopPropagation();
//     dispatch(pinNote(id));
//   };

//   return (
//     <div
//       className={`note ${isPinned ? "pinned" : ""}`} 
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="note-content">
//         <h2>{title}</h2>
//         <p>{content}</p>
//       </div>

//       {/* Hover Menu */}
//       {hovered && (
//         <div className="icons">
//           {/* Pin Icon (Only for Home Page) */}
//           {!isArchived && (
//             <button
//               className="pin-icon"
//               onClick={handlePin}
//               title={isPinned ? "Unpin Note" : "Pin Note"}
//               style={{ color: isPinned ? "black" : "grey" }}
//             >
//               <PushPinIcon />
//             </button>
//           )}

//           {/* More Options */}
//           <button
//             className="more-options"
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowMenu(!showMenu);
//             }}
//             title="More options"
//           >
//             <MoreVertIcon />
//           </button>
//         </div>
//       )}

//       {/* Dropdown Menu */}
//       {showMenu && (
//         <div className="menu">
//           <button onClick={handleCopy}>
//             <ContentCopyIcon /> Copy
//           </button>
//           <button onClick={handleDelete}>
//             <DeleteIcon /> Delete
//           </button>

//           {isArchived ? (
//             <button onClick={handleUnarchive}>
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <>
//               <button onClick={handleArchive}>
//                 <ArchiveIcon /> Archive
//               </button>
//               <button onClick={handleEdit}>
//                 <EditIcon /> Edit
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Note;





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


import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, copyNote, archiveNote, UnarchiveNote, pinNote } from "../../features/NotesSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import { v4 as uuidv4 } from "uuid";
import "./Note.css";

const Note = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [hovered, setHovered] = useState(false);

  //  Use `useMemo` to prevent unnecessary re-renders
  const note = useSelector(
    useMemo(
      () => (state) =>
        state.notes.notes.find((note) => note.id === id) ||
        state.notes.archivedNotes.find((note) => note.id === id),
      [id]
    )
  );

  if (!note) return null;

  const { title, content, labels: noteLabels, isPinned, isArchived } = note;

  // Copy Note
  const handleCopy = (e) => {
    e.stopPropagation();
  
    const copiedNote = {
      id: uuidv4(),
      title,
      content,
      labels: noteLabels ? [...noteLabels] : [], // Preserve labels
      isPinned: false,
      isArchived: false,
    };
  
    dispatch(copyNote(copiedNote)); // Dispatch action with copied note
  
    setShowMenu(false);
  };
  

  // Delete Note
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteNote(id));
    setShowMenu(false);
  };

  // Archive Note
  const handleArchive = (e) => {
    e.stopPropagation();
    dispatch(archiveNote(id));
    setShowMenu(false);
    navigate("/archive");
  };

  // Unarchive Note
  const handleUnarchive = (e) => {
    e.stopPropagation();
    dispatch(UnarchiveNote(id));
    setShowMenu(false);
    navigate("/");
  };

  // Edit Note
  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/note/${id}`);
  };

  // Pin Note
  const handlePin = (e) => {
    e.stopPropagation();
    dispatch(pinNote(id));
  };

  return (
    <div
      className={`note ${isPinned ? "pinned" : ""}`} 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="note-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>

      {/* Hover Menu */}
      {hovered && (
        <div className="icons">
          {!isArchived && (
            <button
              className="pin-icon"
              onClick={handlePin}
              title={isPinned ? "Unpin Note" : "Pin Note"}
              style={{ color: isPinned ? "black" : "grey" }}
            >
              <PushPinIcon />
            </button>
          )}

          {/* More Options */}
          <button
            className="more-options"
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

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="menu">
          <button onClick={handleCopy}>
            <ContentCopyIcon /> Copy
          </button>
          <button onClick={handleDelete}>
            <DeleteIcon /> Delete
          </button>

          {isArchived ? (
            <button onClick={handleUnarchive}>
              <UnarchiveIcon /> Unarchive
            </button>
          ) : (
            <>
              <button onClick={handleArchive}>
                <ArchiveIcon /> Archive
              </button>
              <button onClick={handleEdit}>
                <EditIcon /> Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Note;
