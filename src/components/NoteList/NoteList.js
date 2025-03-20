// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // ✅ Get all notes from Redux state
//   const allNotes = useSelector((state) => state.notes.notes) || [];
//   const reminderNotes = useSelector((state) => state.notes.reminderNotes) || [];
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes) || [];
//   const labels = useSelector((state) => state.notes.labels);
//   // ✅ State to store displayed notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = [];

//     if (noteType === "reminder") {
//       filteredNotes = reminderNotes;
//     } else if (noteType === "archive") {
//       filteredNotes = archivedNotes;
//     } else if (labelName) {
//       // 🚀 Ensure label matching is case-insensitive
//       filteredNotes = labels[labelName] || [];
//     } else {
//       //  Show only untagged notes in Home
//       filteredNotes = allNotes.filter((note) => !note.labels || note.labels.length === 0);
//     }

//     setDisplayNotes(filteredNotes);
//     console.log(`📝 Displaying notes for ${labelName || "Home"}:`, filteredNotes);
//   }, [noteType, labelName, allNotes, reminderNotes, archivedNotes]);

//   // ✅ Find selected note for modal
//   const selectedNote = id ? displayNotes.find((note) => note.id === id) || null : null;

//   // ✅ Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote(noteId));
//   };

//   return (
//     <div className="note-list">
//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div className="note-item">
//             <Note 
//             key={note.id} {...note} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {selectedNote && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note {...selectedNote} />
//             <button className="close-btn" onClick={() => navigate("/")}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;




// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote } from "../../features/NotesSlice"; // Import delete action
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get notes and search query from Redux store
//   const homeNotes = useSelector((state) => state.notes.notes) || [];
//   const reminderNotes = useSelector((state) => state.notes.reminderNotes) || [];
//   const labeledNotes = useSelector((state) => state.notes.labels[labelName]) || [];
//   const searchQuery = useSelector((state) => state.notes.searchQuery); // ✅ Get search query

//   //  Correct note filtering logic
//   let notes = [];
//   if (noteType === "reminder") {
//     notes = reminderNotes;
//   } else if (labelName === "Edit Label") {
//     notes = labeledNotes; 
//   } else if (labelName) {
//     notes = labeledNotes;
//   } else {
//     notes = homeNotes.filter((note) => note.labels.length === 0);
//   }

//   //  Filter notes based on search query
//   const filteredNotes = searchQuery
//     ? notes.filter(
//         (note) =>
//           note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           note.content.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : notes; // Show all notes if no search

//   console.log(`📝 Displaying notes for ${labelName || "Home"}:`, filteredNotes);

//   // Find selected note
//   const selectedNote = id ? filteredNotes.find((note) => note.id === id) || null : null;
//   const [hoveredNote, setHoveredNote] = useState(null);
//   const [menuOpen, setShowMenu] = useState(null);

//   const formatTime = (dateString) => {
//     if (!dateString) return "No time set";
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote(noteId));
//     setShowMenu(null);
//   };

//   return (
//     <div className="note-list">
//       {filteredNotes.length > 0 ? (
//         filteredNotes.map((note) => (
//           <div
//             key={note.id}
//             className="note-item"
//             onMouseEnter={() => setHoveredNote(note.id)}
//             onMouseLeave={() => setHoveredNote(null)}
//           >
//             {noteType === "reminder" ? (
//               <div className="reminder-note">
//                 <h3>{note.title}</h3>
//                 <p className="reminder-time">{formatTime(note.reminderTime)}</p>

//                 {/* Show 3-dot menu on hover */}
//                 {hoveredNote === note.id && (
//                   <div className="menu-container">
//                     <button
//                       className="menu-button"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setShowMenu(menuOpen === note.id ? null : note.id);
//                       }}
//                     >
//                       ⋮
//                     </button>
//                     {menuOpen === note.id && (
//                       <div className="menu-dropdown">
//                         <button onClick={(e) => handleDelete(e, note.id)}>
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Note {...note} />
//             )}
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes found</p>
//       )}

//       {/* Modal for selected note */}
//       {selectedNote && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note {...selectedNote} />
//             <button className="close-btn" onClick={() => navigate("/")}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get all notes from Redux state
//   const allNotes = useSelector((state) => state.notes.notes) || [];
//   const reminderNotes = useSelector((state) => state.notes.reminderNotes) || [];
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes) || [];
//   const labels = useSelector((state) => state.notes.labels) || {};

//   // State to store displayed notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = [];

//     if (noteType === "reminder") {
//       filteredNotes = reminderNotes;
//     } else if (noteType === "archive") {
//       filteredNotes = archivedNotes;
//     } else if (labelName) {
//       filteredNotes = labels[labelName] || [];
//     } else {
//       filteredNotes = allNotes.filter((note) => Array.isArray(note.labels) && note.labels.length === 0);
//     }

//     setDisplayNotes(filteredNotes);
//     console.log(`📝 Displaying notes for ${labelName || "Home"}:`, filteredNotes);
//   }, [noteType, labelName, allNotes, reminderNotes, archivedNotes, labels]);

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote(noteId));
//   };

//   return (
//     <div className="note-list">
//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} />
//             <button className="close-btn" onClick={() => navigate("/")}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote,copyNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get all notes from Redux state
//   const allNotes = useSelector((state) => state.notes.notes) || [];
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes) || [];
//   const labels = useSelector((state) => state.notes.labels) || {};

//   // State to store displayed notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = [];

//     if (noteType === "reminder") {
//       filteredNotes = allNotes.filter((note) => note.isReminder); //  Fix: Get reminders from `allNotes`
//     } else if (noteType === "archive") {
//       filteredNotes = archivedNotes;
//     } else if (labelName) {
//       filteredNotes = allNotes.filter((note) => note.labels.includes(labelName));
//       //  //  Fix: Filter notes by label
//       // filteredNotes = labels[labelName] || [];
//       // filteredNotes = labels[labelName] ? [...labels[labelName]] : [];
//     } else {
//       // filteredNotes = allNotes.filter((note) => !note.isReminder && !note.isArchived);
//       // filteredNotes = allNotes.filter((note) => note.labels.length === 0);
//       // filteredNotes = allNotes.filter((note) => !note.isReminder && !note.isArchived);
//       filteredNotes = allNotes.filter((note) => note.labels.length === 0 && !note.isArchived);
//     }

//     setDisplayNotes(filteredNotes);
//     console.log(` Displaying notes for ${labelName || "Home"}:`, filteredNotes);
//   }, [noteType, labelName, allNotes, archivedNotes, labels]);

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote(noteId));
//   };

//    // Handle copying a note while ensuring it stays in the correct label
//    const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ noteId, labelName })); //  Ensure copied note retains label
//   };

//   return (
//     <div className="note-list">
//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} 
//             onCopy={()=>handleCopyNote(note.id)}/>
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} />
//             <button className="close-btn" onClick={() => navigate("/")}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote, copyNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get current user ID
//   const currentUser = useSelector((state) => state.notes.currentUser);
  
//   // Get notes for the logged-in user
//   const allNotes = useSelector((state) => state.notes.notes?.[currentUser]) || {};
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes?.[currentUser]) || {};
//   const labels = useSelector((state) => state.notes.labels?.[currentUser]) || {};

//   // State to store displayed notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = Object.values(allNotes); // Convert notes object to array

//     if (noteType === "reminder") {
//       filteredNotes = filteredNotes.filter((note) => note.isReminder);
//     } else if (noteType === "archive") {
//       filteredNotes = Object.values(archivedNotes); // Get archived notes as array
//     } else if (labelName) {
//       filteredNotes = filteredNotes.filter((note) => note.labels?.includes(labelName));
//     } else {
//       filteredNotes = filteredNotes.filter((note) => note.labels?.length === 0 && !note.isArchived);
//     }

//     setDisplayNotes(filteredNotes);
//     console.log(`Displaying notes for ${labelName || "Home"}:`, filteredNotes);
//   }, [noteType, labelName, allNotes, archivedNotes, labels]);

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote({ userId: currentUser, noteId }));
//   };

//   // Handle copying a note while ensuring it stays in the correct label
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ userId: currentUser, noteId, labelName }));
//   };

//   return (
//     <div className="note-list">
//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} onCopy={() => handleCopyNote(note.id)} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} />
//             <button className="close-btn" onClick={() => navigate("/")}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote, copyNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get current user ID
//   const currentUser = useSelector((state) => state.notes.userId);
//   console.log("Current User:", currentUser);

//   // ✅ FIX: Convert object to array
//   const allNotes = useSelector((state) =>
//     state.notes.notes ? Object.values(state.notes.notes) : []
//   );
//   const archivedNotes = useSelector((state) =>
//     state.notes.archivedNotes ? Object.values(state.notes.archivedNotes) : []
//   );
//   const labels = useSelector((state) => state.notes.labels) || {};

//   console.log("All Notes from Redux:", allNotes);

//   // ✅ State for filtered notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = [...allNotes];

//     if (noteType === "reminder") {
//       filteredNotes = filteredNotes.filter((note) => note.isReminder);
//     } else if (noteType === "archive") {
//       filteredNotes = [...archivedNotes];
//     } else if (labelName) {
//       filteredNotes = filteredNotes.filter((note) => note.labels?.includes(labelName));
//     } else {
//       filteredNotes = filteredNotes.filter((note) => !note.isArchived && note.labels?.length === 0);
//     }

//     // Update state only if the new array is different
//     if (JSON.stringify(displayNotes) !== JSON.stringify(filteredNotes)) {
//       setDisplayNotes(filteredNotes);
//       console.log("Updated Display Notes:", filteredNotes);
//     }
//   }, [noteType, labelName, allNotes, archivedNotes]);

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote({ userId: currentUser, noteId }));
//   };

//   // Handle copying a note
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ userId: currentUser, noteId, labelName }));
//   };

//   return (
//     <div className="note-list">
//       {console.log("Rendering Display Notes:", displayNotes)}

//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} noteData={note} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} noteData={displayNotes.find((note) => note.id === id)} />
//             <button className="close-btn" onClick={() => navigate("/")}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote, copyNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get the current user ID
//   const currentUser = useSelector((state) => state.notes.userId);
//   console.log("Current User:", currentUser);

//   // Get only the current user's notes
//   const allNotes = useSelector((state) => state.notes.notes?.[currentUser] || {});
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes?.[currentUser] || {});
//   const labels = useSelector((state) => state.notes.labels?.[currentUser] || {});

//   // Convert notes object to an array
//   const allNotesArray = Object.values(allNotes);
//   const archivedNotesArray = Object.values(archivedNotes);

//   console.log("All Notes from Redux:", allNotesArray);

//   // ✅ State for filtered notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = [...allNotesArray];

//     if (noteType === "reminder") {
//       filteredNotes = filteredNotes.filter((note) => note.isReminder);
//     } else if (noteType === "archive") {
//       filteredNotes = [...archivedNotesArray];
//     } else if (labelName) {
//       filteredNotes = filteredNotes.filter((note) => note.labels?.includes(labelName));
//     } else {
//       filteredNotes = filteredNotes.filter((note) => !note.isArchived && note.labels?.length === 0);
//     }

//     // Update state only if the new array is different
//     if (JSON.stringify(displayNotes) !== JSON.stringify(filteredNotes)) {
//       setDisplayNotes(filteredNotes);
//       console.log("Updated Display Notes:", filteredNotes);
//     }
//   }, [noteType, labelName, allNotesArray, archivedNotesArray]);

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote({ userId: currentUser, noteId }));
//   };

//   // Handle copying a note
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ userId: currentUser, noteId, labelName }));
//   };

//   return (
//     <div className="note-list">
//       {console.log("Rendering Display Notes:", displayNotes)}

//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} />
//             <button className="close-btn" onClick={() => navigate("/")}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../../components/Note/Note"; // Fixed path case sensitivity
// import { permanentDeleteNote, copyNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get current user ID
//   const currentUser = useSelector((state) => state.notes.currentUser);

//   // Get notes for the logged-in user (🔥 Now as an array, not an object!)
//   const allNotes = useSelector((state) => state.notes.notes?.[currentUser]) || [];
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes?.[currentUser]) || [];
//   const labels = useSelector((state) => state.notes.labels?.[currentUser]) || [];

//   // State to store displayed notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = [...allNotes]; // Notes are already an array

//     if (noteType === "reminder") {
//       filteredNotes = filteredNotes.filter((note) => note.isReminder);
//     } else if (noteType === "archive") {
//       filteredNotes = [...archivedNotes]; // Get archived notes (already an array)
//     } else if (labelName) {
//       filteredNotes = filteredNotes.filter((note) => note.labels?.includes(labelName));
//     } else {
//       filteredNotes = filteredNotes.filter((note) => note.labels?.length === 0 && !note.isArchived);
//     }

//     setDisplayNotes(filteredNotes);
//     console.log(`Displaying notes for ${labelName || "Home"}:`, filteredNotes);
//   }, [noteType, labelName, allNotes, archivedNotes, labels]);

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote({ userId: currentUser, noteId }));
//   };

//   // Handle copying a note while ensuring it stays in the correct label
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ userId: currentUser, noteId, labelName }));
//   };

//   return (
//     <div className="note-list">
//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} onCopy={() => handleCopyNote(note.id)} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} />
//             <button className="close-btn" onClick={() => navigate("/")}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;
// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../../components/Note/Note"; // Case-sensitive import fix
// import { permanentDeleteNote, copyNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get current user ID
//   const currentUser = useSelector((state) => state.notes.currentUser);

//   // Get notes for the logged-in user (Array-based)
//   const allNotes = useSelector((state) => state.notes.notes?.[currentUser]) || [];
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes?.[currentUser]) || [];

//   // 🔥 Directly filter notes without using useState (avoids infinite re-renders)
//   let displayNotes = [...allNotes];

//   // if (noteType === "reminder") {
//   //   displayNotes = displayNotes.filter((note) => note.isReminder);
//   // } else if (noteType === "archive") {
//   //   displayNotes = [...archivedNotes]; // Archive notes are already an array
//   // } else if (labelName) {
//   //   displayNotes = displayNotes.filter((note) => note.labels?.includes(labelName));
//   // } else {
//   //   displayNotes = displayNotes.filter((note) => note.labels?.length === 0 && !note.isArchived);
//   // }
//   if (noteType === "reminder") {
//   displayNotes = displayNotes.filter((note) => note.isReminder);
// } else if (noteType === "archive") {
//   displayNotes = [...archivedNotes];
// } else if (labelName) {
//   displayNotes = displayNotes.filter((note) => note.labels?.includes(labelName));
// } else {
//   // ✅ Fix: Ensure `labels` exists before checking length
//   displayNotes = displayNotes.filter((note) => (!note.labels || note.labels.length === 0) && !note.isArchived);
// }


//   console.log(`Displaying notes for ${labelName || "Home"}:`, displayNotes);

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote({ userId: currentUser, noteId }));
//   };

//   // Handle copying a note
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ userId: currentUser, noteId, labelName }));
//   };

//   return (
//     <div className="note-list">
//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} onCopy={() => handleCopyNote(note.id)} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} />
//             <button className="close-btn" onClick={() => navigate("/")}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get all notes from Redux state
//   const allNotes = useSelector((state) => state.notes.notes) || [];
//   const reminderNotes = useSelector((state) => state.notes.reminderNotes) || [];
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes) || [];
//   const labels = useSelector((state) => state.notes.labels) || {};

//   // State to store displayed notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = [];

//     if (noteType === "reminder") {
//       filteredNotes = reminderNotes;
//     } else if (noteType === "archive") {
//       filteredNotes = archivedNotes;
//     } else if (labelName) {
//       filteredNotes = labels[labelName] || [];
//     } else {
//       filteredNotes = allNotes.filter((note) => Array.isArray(note.labels) && note.labels.length === 0);
//     }

//     setDisplayNotes(filteredNotes);
//     console.log(`📝 Displaying notes for ${labelName || "Home"}:`, filteredNotes);
//   }, [noteType, labelName, allNotes, reminderNotes, archivedNotes, labels]);

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote(noteId));
//   };

//   return (
//     <div className="note-list">
//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} />
//             <button className="close-btn" onClick={() => navigate("/")}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // ✅ Get the logged-in user ID
//   const currentUser = useSelector((state) => state.auth.user);
//   const userId = currentUser?.id;

//   // ✅ Fetch only the logged-in user's notes
//   const allNotes = useSelector((state) => state.notes[userId]?.notes) || [];
//   const reminderNotes = useSelector((state) => state.notes[userId]?.reminderNotes) || [];
//   const archivedNotes = useSelector((state) => state.notes[userId]?.archivedNotes) || [];
//   const labels = useSelector((state) => state.notes[userId]?.labels) || {};

//   // State to store displayed notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = [];

//     if (noteType === "reminder") {
//       filteredNotes = reminderNotes;
//     } else if (noteType === "archive") {
//       filteredNotes = archivedNotes;
//     } else if (labelName) {
//       filteredNotes = labels[labelName] || [];
//     } else {
//       filteredNotes = allNotes.filter((note) => Array.isArray(note.labels) && note.labels.length === 0);
//     }

//     setDisplayNotes(filteredNotes);
//     console.log(`📝 Displaying notes for ${labelName || "Home"} (User: ${userId}):`, filteredNotes);
//   }, [noteType, labelName, allNotes, reminderNotes, archivedNotes, labels, userId]);

//   // ✅ Handle permanent delete (pass `userId`)
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote({ userId, noteId }));
//   };

//   return (
//     <div className="note-list">
//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} />
//             <button className="close-btn" onClick={() => navigate("/")}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Note from "../Note/Note";
// import { permanentDeleteNote } from "../../features/NotesSlice";
// import "./NoteList.css";

// const NoteList = ({ noteType, labelName }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Get all notes from Redux state
//   const allNotes = useSelector((state) => state.notes.notes) || [];
//   const reminderNotes = useSelector((state) => state.notes.reminderNotes) || [];
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes) || [];
//   const labels = useSelector((state) => state.notes.labels) || {};

//   // State to store displayed notes
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     let filteredNotes = [];

//     if (noteType === "reminder") {
//       filteredNotes = reminderNotes;
//     } else if (noteType === "archive") {
//       filteredNotes = archivedNotes;
//     } else if (labelName) {
//       // ✅ Fetch the latest notes belonging to the label
//       filteredNotes = allNotes.filter(
//         (note) => note.labels?.includes(labelName) && !note.isArchived
//       );
//       console.log("📋 Filtered Notes for Label:", filteredNotes);
//     } else {
//       // ✅ Show only unarchived notes in "Home"
//       filteredNotes = allNotes.filter(
//         (note) => !note.isArchived && (!note.labels || note.labels.length === 0)
//       );
//     }

//     setDisplayNotes([...filteredNotes]); // ✅ Force React to detect changes

//     console.log(`📝 Displaying notes for ${labelName || "Home"}:`, filteredNotes);
//   }, [noteType, labelName, allNotes, reminderNotes, archivedNotes, labels]);

//   // Handle permanent delete
//   const handleDelete = (e, noteId) => {
//     e.stopPropagation();
//     dispatch(permanentDeleteNote(noteId));
//   };

//   return (
//     <div className="note-list">
//       {displayNotes.length > 0 ? (
//         displayNotes.map((note) => (
//           <div key={note.id} className="note-item">
//             <Note id={note.id} />
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No notes available</p>
//       )}

//       {/* Modal for selected note */}
//       {id && (
//         <div className="modal-overlay" onClick={() => navigate("/")}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <Note id={id} />
//             <button className="close-btn" onClick={() => navigate("/")}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Note from "../Note/Note";
import { permanentDeleteNote } from "../../features/NotesSlice";
import "./NoteList.css";

const NoteList = ({ noteType, labelName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Get all notes from Redux state
  const allNotes = useSelector((state) => state.notes.notes) || [];
  const reminderNotes = useSelector((state) => state.notes.reminderNotes) || [];
  const archivedNotes = useSelector((state) => state.notes.archivedNotes) || [];
  const labels = useSelector((state) => state.notes.labels) || {};

  // State to store displayed notes
  const [displayNotes, setDisplayNotes] = useState([]);

  useEffect(() => {
    let filteredNotes = [];

    if (noteType === "reminder") {
      filteredNotes = reminderNotes;
    } else if (noteType === "archive") {
      filteredNotes = archivedNotes;
    } else if (labelName) {
      // ✅ Fetch the latest notes belonging to the label
      filteredNotes = allNotes.filter(
        (note) => note.labels?.includes(labelName) && !note.isArchived
      );
    } else {
      // ✅ Show only unarchived notes in "Home"
      filteredNotes = allNotes.filter(
        (note) => !note.isArchived && (!note.labels || note.labels.length === 0)
      );
    }

    // ✅ Sort notes: Pinned notes first, then unpinned
    const sortedNotes = [
      ...filteredNotes.filter((note) => note.isPinned),
      ...filteredNotes.filter((note) => !note.isPinned),
    ];

    setDisplayNotes([...sortedNotes]); // ✅ Ensure React detects changes
  }, [noteType, labelName, allNotes, reminderNotes, archivedNotes, labels]);

  // Handle permanent delete
  const handleDelete = (e, noteId) => {
    e.stopPropagation();
    dispatch(permanentDeleteNote(noteId));
  };

  return (
    <div className="note-list">
      {displayNotes.length > 0 ? (
        displayNotes.map((note) => (
          <div key={note.id} className="note-item">
            <Note id={note.id} />
          </div>
        ))
      ) : (
        <p className="empty-message">No notes available</p>
      )}

      {/* Modal for selected note */}
      {id && (
        <div className="modal-overlay" onClick={() => navigate("/")}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Note id={id} />
            <button className="close-btn" onClick={() => navigate("/")}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;

