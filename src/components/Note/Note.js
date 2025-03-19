

// import React, { useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateNote, deleteNote, copyNote, archiveNote, UnarchiveNote, pinNote } from "../../features/NotesSlice";
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

//   const note = useSelector(
//     useMemo(
//       () => (state) =>
//         state.notes.notes.find((note) => note.id === id) ||
//         state.notes.archivedNotes.find((note) => note.id === id),
//       [id]
//     )
//   );

//   if (!note) return null;

//   const { title, content, isPinned, isArchived } = note;

//   // Open modal (just for viewing)
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
//             <button className="pin-icon" onClick={() => dispatch(pinNote(id))} title="Pin Note">
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
//           <button onClick={() => dispatch(deleteNote(id))}>
//             <DeleteIcon /> Delete
//           </button>
//           {isArchived ? (
//             <button onClick={() => dispatch(UnarchiveNote(id))}>
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <>
//               <button onClick={() => dispatch(archiveNote(id))}>
//                 <ArchiveIcon /> Archive
//               </button>
//               <button onClick={handleEdit}>
//                 <EditIcon /> Edit
//               </button>
//             </>
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
// import React, { useState, useMemo } from "react";
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

//   const note = useSelector(
//     useMemo(
//       () => (state) => 
//         state.notes.notes?.[id] || state.notes.archivedNotes?.[id],
//       [id]
//     )
//   );

//   if (!note) return null;

//   const { title, content, isPinned, isArchived } = note;

//   // Open modal (just for viewing)
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
//             <button className="pin-icon" onClick={() => dispatch(pinNote(id))} title="Pin Note">
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
//           <button onClick={() => dispatch(deleteNote(id))}>
//             <DeleteIcon /> Delete
//           </button>
//           {isArchived ? (
//             <button onClick={() => dispatch(UnarchiveNote(id))}>
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <>
//               <button onClick={() => dispatch(archiveNote(id))}>
//                 <ArchiveIcon /> Archive
//               </button>
//               <button onClick={handleEdit}>
//                 <EditIcon /> Edit
//               </button>
//             </>
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

//   // 🔥 Fetch current user ID from Redux
//   const currentUser = useSelector((state) => state.notes.userId);

//   // 🔥 Fetch the note from Redux (Ensure correct selection based on user)
//   // const note = useSelector((state) => 
//   //   state.notes.notes?.[currentUser]?.find((n) => n.id === id) ||
//   //   state.notes.archivedNotes?.[currentUser]?.find((n) => n.id === id)
//   // );
//   const note = useSelector((state) => state.notes.notes?.[currentUser]?.[id]);

  
//   // Debugging logs
//   console.log("Rendering Note Component for ID:", id);
//   console.log("Fetched Note:", note);

//   if (!note) {
//     console.warn(`Note with ID ${id} not found!`);
//     return null;
//   }

//   const { title, content, isPinned, isArchived } = note;

//   // Open modal (just for viewing)
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
//     dispatch(updateNote({ userId: currentUser, id, title: editedTitle, content: editedContent }));
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
//             <button className="pin-icon" onClick={() => dispatch(pinNote({ userId: currentUser, id }))} title="Pin Note">
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
//           <button onClick={() => dispatch(copyNote({ userId: currentUser, id, title, content }))}>
//             <ContentCopyIcon /> Copy
//           </button>
//           <button onClick={() => dispatch(deleteNote({ userId: currentUser, id }))}>
//             <DeleteIcon /> Delete
//           </button>
//           {isArchived ? (
//             <button onClick={() => dispatch(UnarchiveNote({ userId: currentUser, id }))}>
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <>
//               <button onClick={() => dispatch(archiveNote({ userId: currentUser, id }))}>
//                 <ArchiveIcon /> Archive
//               </button>
//               <button onClick={handleEdit}>
//                 <EditIcon /> Edit
//               </button>
//             </>
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

//   // 🔥 Get current user ID from Redux
//   const currentUser = useSelector((state) => state.notes.currentUser);

//   // 🔥 Fetch the notes array and find the note by ID
//   const notesArray = useSelector((state) => state.notes.notes?.[currentUser]) || [];
//   const note = notesArray.find((n) => n.id === id);

//   // Debugging logs
//   console.log("Rendering Note Component for ID:", id);
//   console.log("Fetched Note:", note);

//   if (!note) {
//     console.warn(`Note with ID ${id} not found!`);
//     return null;
//   }

//   const { title, content, isPinned, isArchived } = note;

//   // Open modal (just for viewing)
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
//     dispatch(updateNote({ userId: currentUser, id, title: editedTitle, content: editedContent }));
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
//             <button className="pin-icon" onClick={() => dispatch(pinNote({ userId: currentUser, id }))} title="Pin Note">
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
//           <button onClick={() => dispatch(copyNote({ userId: currentUser, id, title, content }))}>
//             <ContentCopyIcon /> Copy
//           </button>
//           <button onClick={() => dispatch(deleteNote({ userId: currentUser, id }))}>
//             <DeleteIcon /> Delete
//           </button>
//           {isArchived ? (
//             <button onClick={() => dispatch(UnarchiveNote({ userId: currentUser, id }))}>
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <>
//               <button onClick={() => dispatch(archiveNote({ userId: currentUser, id }))}>
//                 <ArchiveIcon /> Archive
//               </button>
//               <button onClick={handleEdit}>
//                 <EditIcon /> Edit
//               </button>
//             </>
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

//   // ✅ Fetch notes as an array (fix)
//   const notesArray = useSelector((state) => state.notes.notes) || [];
//   const note = notesArray.find((n) => n.id === id);

//   // Debugging logs
//   console.log("Rendering Note Component for ID:", id);
//   console.log("Fetched Note:", note);

//   if (!note) {
//     console.warn(`Note with ID ${id} not found!`);
//     return null;
//   }

//   const { title, content, isPinned, isArchived } = note;

//   // Open modal (just for viewing)
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
//           <button onClick={() => dispatch(deleteNote({ id }))}>
//             <DeleteIcon /> Delete
//           </button>
//           {isArchived ? (
//             <button onClick={() => dispatch(UnarchiveNote({ id }))}>
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <>
//               <button onClick={() => dispatch(archiveNote({ id }))}>
//                 <ArchiveIcon /> Archive
//               </button>
//               <button onClick={handleEdit}>
//                 <EditIcon /> Edit
//               </button>
//             </>
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

//           {/* ✅ FIXED DELETE BUTTON (Works for Both Home & Archive) */}
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
//                 dispatch(UnarchiveNote({ id }));
//               }}
//             >
//               <UnarchiveIcon /> Unarchive
//             </button>
//           ) : (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Archiving Note ID:", id);
//                 dispatch(archiveNote({ id }));
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



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  updateNote, 
  deleteNote, 
  copyNote, 
  archiveNote, 
  UnarchiveNote, 
  pinNote 
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
            <button className="pin-icon" onClick={() => dispatch(pinNote({ id }))} title="Pin Note">
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

          {/* ✅ FIXED DELETE BUTTON (Moves Note to Trash) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Deleting Note ID:", id);
              dispatch(deleteNote(id));
            }}
          >
            <DeleteIcon /> Delete
          </button>

          {/* ✅ FIXED ARCHIVE / UNARCHIVE BUTTON */}
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
