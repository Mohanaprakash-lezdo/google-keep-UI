// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { 
//   updateNote, 
//   deleteNote, 
//   copyNote, 
//   archiveNote, 
//   UnarchiveNote, 
//   pinNote 
// } from "../../features/NotesSlice";

// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import UnarchiveIcon from "@mui/icons-material/Unarchive";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import EditIcon from "@mui/icons-material/Edit";
// import PushPinIcon from "@mui/icons-material/PushPin";
// import CloseIcon from "@mui/icons-material/Close";
// import "./Note.css";

// const Note = ({ id }) => {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState("");
//   const [editedContent, setEditedContent] = useState("");

//   // ✅ Fetch notes & archivedNotes correctly
//   const notesArray = useSelector((state) => state.notes.notes) || [];
//   const archivedArray = useSelector((state) => state.notes.archivedNotes) || [];
//   const note = [...notesArray, ...archivedArray].find((n) => n.id === id);

//   if (!note) {
//     console.warn(`Note with ID ${id} not found!`);
//     return null;
//   }

//   const { title, content, isPinned, isArchived } = note;

//   // Open modal
//   const handleExpand = () => {
//     setIsExpanded(true);
//   };

//   // Open edit mode
//   const handleEdit = () => {
//     setEditedTitle(title);
//     setEditedContent(content);
//     setIsEditing(true);
//   };

//   // Save changes
//   const handleSave = () => {
//     dispatch(updateNote({ id, title: editedTitle, content: editedContent }));
//     setIsEditing(false);
//   };

//   // Close modal
//   const handleCloseModal = () => {
//     setIsExpanded(false);
//     setIsEditing(false);
//   };

//   return (
//     <div
//       className={`note ${isPinned ? "pinned" : ""}`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="note-content" onClick={handleExpand}>
//         <h2>{title}</h2>
//         <p>{content}</p>
//       </div>

//       {/* Hover Menu */}
//       {hovered && (
//         <div className="icons">
//           {!isArchived && (
//             <button className="pin-icon" onClick={() => dispatch(pinNote({ id }))} title="Pin Note">
//               <PushPinIcon style={{ color: isPinned ? "black" : "grey" }} />
//             </button>
//           )}

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
//           <button onClick={() => dispatch(copyNote({ id, title, content }))}>
//             <ContentCopyIcon /> Copy
//           </button>

//           {/* ✅ FIXED DELETE BUTTON (Moves Note to Trash) */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               console.log("Deleting Note ID:", id);
//               dispatch(deleteNote(id));
//             }}
//           >
//             <DeleteIcon /> Delete
//           </button>

//           {/* ✅ FIXED ARCHIVE / UNARCHIVE BUTTON */}
//           {isArchived ? (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Unarchiving Note ID:", id);
//                 dispatch(UnarchiveNote(id));
//               }}
//             >
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Archiving Note ID:", id);
//                 dispatch(archiveNote(id));
//               }}
//             >
//               <ArchiveIcon /> Archive
//             </button>
//           )}

//           {!isArchived && (
//             <button onClick={handleEdit}>
//               <EditIcon /> Edit
//             </button>
//           )}
//         </div>
//       )}

//       {/* Modal */}
//       {isExpanded && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={handleCloseModal}>
//               <CloseIcon />
//             </button>

//             {!isEditing ? (
//               // Display note (Read-only)
//               <>
//                 <h2>{title}</h2>
//                 <p>{content}</p>
//               </>
//             ) : (
//               // Edit Mode
//               <>
//                 <h2>Edit Note</h2>
//                 <input
//                   type="text"
//                   value={editedTitle}
//                   onChange={(e) => setEditedTitle(e.target.value)}
//                 />
//                 <textarea
//                   value={editedContent}
//                   onChange={(e) => setEditedContent(e.target.value)}
//                 />
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={() => setIsEditing(false)}>Cancel</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Note;
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { 
//   updateNote, 
//   deleteNote, 
//   copyNote, 
//   archiveNote, 
//   unarchiveNote, 
//   pinNote 
// } from "../../features/NotesSlice";

// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import UnarchiveIcon from "@mui/icons-material/Unarchive";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import EditIcon from "@mui/icons-material/Edit";
// import PushPinIcon from "@mui/icons-material/PushPin";
// import CloseIcon from "@mui/icons-material/Close";
// import "./Note.css";

// const Note = ({ id }) => {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState("");
//   const [editedContent, setEditedContent] = useState("");

//   // ✅ Get the logged-in user ID
//   const currentUser = useSelector((state) => state.auth.user);
//   const userId = currentUser?.id;

//   // ✅ Fetch only the logged-in user's notes
//   const notesArray = useSelector((state) => state.notes[userId]?.notes || []);
//   const archivedArray = useSelector((state) => state.notes[userId]?.archivedNotes || []);
//   const note = [...notesArray, ...archivedArray].find((n) => n.id === id);

//   if (!note) {
//     console.warn(`Note with ID ${id} not found for user ${userId}!`);
//     return null;
//   }

//   const { title, content, isPinned, isArchived } = note;

//   // Open modal
//   const handleExpand = () => {
//     setIsExpanded(true);
//   };

//   // Open edit mode
//   const handleEdit = () => {
//     setEditedTitle(title);
//     setEditedContent(content);
//     setIsEditing(true);
//   };

//   // Save changes
//   const handleSave = () => {
//     dispatch(updateNote({ userId, id, title: editedTitle, content: editedContent }));
//     setIsEditing(false);
//   };

//   // Close modal
//   const handleCloseModal = () => {
//     setIsExpanded(false);
//     setIsEditing(false);
//   };

//   return (
//     <div
//       className={`note ${isPinned ? "pinned" : ""}`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="note-content" onClick={handleExpand}>
//         <h2>{title}</h2>
//         <p>{content}</p>
//       </div>

//       {/* Hover Menu */}
//       {hovered && (
//         <div className="icons">
//           {!isArchived && (
//             <button className="pin-icon" onClick={() => dispatch(pinNote({ userId, id }))} title="Pin Note">
//               <PushPinIcon style={{ color: isPinned ? "black" : "grey" }} />
//             </button>
//           )}

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
//           <button onClick={() => dispatch(copyNote({ userId, id, title, content }))}>
//             <ContentCopyIcon /> Copy
//           </button>

//           {/* ✅ FIXED DELETE BUTTON (Moves Note to Trash) */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               console.log("Deleting Note ID:", id);
//               dispatch(deleteNote({ userId, id }));
//             }}
//           >
//             <DeleteIcon /> Delete
//           </button>

//           {/* ✅ FIXED ARCHIVE / UNARCHIVE BUTTON */}
//           {isArchived ? (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Unarchiving Note ID:", id);
//                 dispatch(unarchiveNote({ userId, id }));
//               }}
//             >
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Archiving Note ID:", id);
//                 dispatch(archiveNote({ userId, id }));
//               }}
//             >
//               <ArchiveIcon /> Archive
//             </button>
//           )}

//           {!isArchived && (
//             <button onClick={handleEdit}>
//               <EditIcon /> Edit
//             </button>
//           )}
//         </div>
//       )}

//       {/* Modal */}
//       {isExpanded && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={handleCloseModal}>
//               <CloseIcon />
//             </button>

//             {!isEditing ? (
//               // Display note (Read-only)
//               <>
//                 <h2>{title}</h2>
//                 <p>{content}</p>
//               </>
//             ) : (
//               // Edit Mode
//               <>
//                 <h2>Edit Note</h2>
//                 <input
//                   type="text"
//                   value={editedTitle}
//                   onChange={(e) => setEditedTitle(e.target.value)}
//                 />
//                 <textarea
//                   value={editedContent}
//                   onChange={(e) => setEditedContent(e.target.value)}
//                 />
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={() => setIsEditing(false)}>Cancel</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Note;
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { 
//   updateNote, 
//   deleteNote, 
//   copyNote, 
//   archiveNote, 
//   UnarchiveNote, 
//   pinNote 
// } from "../../features/NotesSlice";

// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import UnarchiveIcon from "@mui/icons-material/Unarchive";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import EditIcon from "@mui/icons-material/Edit";
// import PushPinIcon from "@mui/icons-material/PushPin";
// import CloseIcon from "@mui/icons-material/Close";
// import "./Note.css";

// const Note = ({ id }) => {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState("");
//   const [editedContent, setEditedContent] = useState("");

//   // ✅ Fetch notes & archivedNotes correctly
//   const notesArray = useSelector((state) => state.notes.notes) || [];
//   const archivedArray = useSelector((state) => state.notes.archivedNotes) || [];
//   const userId = useSelector((state) => state.auth.userId); // Get user ID

//   const note = [...notesArray, ...archivedArray].find((n) => n.id === id);

//   if (!note) {
//     console.warn(`Note with ID ${id} not found!`);
//     return null;
//   }

//   const { title, content, isPinned, isArchived } = note;

//   // Open modal
//   const handleExpand = () => {
//     setIsExpanded(true);
//   };

//   // Open edit mode
//   const handleEdit = () => {
//     setEditedTitle(title);
//     setEditedContent(content);
//     setIsEditing(true);
//   };

//   // Save changes
//   const handleSave = () => {
//     dispatch(updateNote({ id, title: editedTitle, content: editedContent }));
//     setIsEditing(false);
//   };

//   // Close modal
//   const handleCloseModal = () => {
//     setIsExpanded(false);
//     setIsEditing(false);
//   };

//   // ✅ Fix: Pin/Unpin Note Correctly
//   const handlePin = (e) => {
//     e.stopPropagation(); // Prevent modal from opening
//     dispatch(pinNote({ userId, id })); // Ensure correct Redux update
//   };

//   return (
//     <div
//       className={`note ${isPinned ? "pinned" : ""}`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="note-content" onClick={handleExpand}>
//         <h2>{title}</h2>
//         <p>{content}</p>
//       </div>

//       {/* Hover Menu */}
//       {hovered && (
//         <div className="icons">
//           {!isArchived && (
//             <button className="pin-icon" onClick={handlePin} title="Pin Note">
//               <PushPinIcon style={{ color: isPinned ? "black" : "grey" }} />
//             </button>
//           )}

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
//           <button onClick={() => dispatch(copyNote({ id, title, content }))}>
//             <ContentCopyIcon /> Copy
//           </button>

//           {/* ✅ FIXED DELETE BUTTON (Moves Note to Trash) */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               console.log("Deleting Note ID:", id);
//               dispatch(deleteNote(id));
//             }}
//           >
//             <DeleteIcon /> Delete
//           </button>

//           {/* ✅ FIXED ARCHIVE / UNARCHIVE BUTTON */}
//           {isArchived ? (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Unarchiving Note ID:", id);
//                 dispatch(UnarchiveNote(id));
//               }}
//             >
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Archiving Note ID:", id);
//                 dispatch(archiveNote(id));
//               }}
//             >
//               <ArchiveIcon /> Archive
//             </button>
//           )}

//           {!isArchived && (
//             <button onClick={handleEdit}>
//               <EditIcon /> Edit
//             </button>
//           )}
//         </div>
//       )}

//       {/* Modal */}
//       {isExpanded && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={handleCloseModal}>
//               <CloseIcon />
//             </button>

//             {!isEditing ? (
//               // Display note (Read-only)
//               <>
//                 <h2>{title}</h2>
//                 <p>{content}</p>
//               </>
//             ) : (
//               // Edit Mode
//               <>
//                 <h2>Edit Note</h2>
//                 <input
//                   type="text"
//                   value={editedTitle}
//                   onChange={(e) => setEditedTitle(e.target.value)}
//                 />
//                 <textarea
//                   value={editedContent}
//                   onChange={(e) => setEditedContent(e.target.value)}
//                 />
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={() => setIsEditing(false)}>Cancel</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Note;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  updateNote, 
  deleteNote, 
  copyNote, 
  archiveNote, 
  UnarchiveNote, 
  pinNote, 
  unpinNote 
} from "../../features/NotesSlice";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon from "@mui/icons-material/Close";
import "./Note.css";

const Note = ({ id }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  // ✅ Fetch notes & archivedNotes correctly
  const notesArray = useSelector((state) => state.notes.notes) || [];
  const archivedArray = useSelector((state) => state.notes.archivedNotes) || [];
  const userId = useSelector((state) => state.auth.userId); // Get user ID

  const note = [...notesArray, ...archivedArray].find((n) => n.id === id);

  if (!note) {
    console.warn(`Note with ID ${id} not found!`);
    return null;
  }

  const { title, content, isPinned, isArchived } = note;

  // Open modal
  const handleExpand = () => {
    setIsExpanded(true);
  };

  // Open edit mode
  const handleEdit = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(true);
  };

  // Save changes
  const handleSave = () => {
    dispatch(updateNote({ id, title: editedTitle, content: editedContent }));
    setIsEditing(false);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsExpanded(false);
    setIsEditing(false);
  };

  // ✅ Fixed: Toggle Pin/Unpin Note Correctly
  const handlePin = (e) => {
    e.stopPropagation(); // Prevent modal from opening
    if (isPinned) {
      dispatch(unpinNote({ id })); // ✅ Unpin note
    } else {
      dispatch(pinNote({ id })); // ✅ Pin note
    }
  };

  return (
    <div
      className={`note ${isPinned ? "pinned" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="note-content" onClick={handleExpand}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>

      {/* Hover Menu */}
      {hovered && (
        <div className="icons">
          {!isArchived && (
            <button className="pin-icon" onClick={handlePin} title={isPinned ? "Unpin Note" : "Pin Note"}>
              <PushPinIcon style={{ color: isPinned ? "black" : "grey" }} />
            </button>
          )}

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
          <button onClick={() => dispatch(copyNote({ id, title, content }))}>
            <ContentCopyIcon /> Copy
          </button>

          {/* ✅ Fixed Delete Button (Moves Note to Trash) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Deleting Note ID:", id);
              dispatch(deleteNote(id));
            }}
          >
            <DeleteIcon /> Delete
          </button>

          {/* ✅ Fixed Archive / Unarchive Button */}
          {isArchived ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Unarchiving Note ID:", id);
                dispatch(UnarchiveNote(id));
              }}
            >
              <UnarchiveIcon /> Unarchive
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Archiving Note ID:", id);
                dispatch(archiveNote(id));
              }}
            >
              <ArchiveIcon /> Archive
            </button>
          )}

          {!isArchived && (
            <button onClick={handleEdit}>
              <EditIcon /> Edit
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      {isExpanded && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>
              <CloseIcon />
            </button>

            {!isEditing ? (
              // Display note (Read-only)
              <>
                <h2>{title}</h2>
                <p>{content}</p>
              </>
            ) : (
              // Edit Mode
              <>
                <h2>Edit Note</h2>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
