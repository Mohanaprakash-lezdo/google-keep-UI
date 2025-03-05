import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Note from "../Note/Note";
import { permanentDeleteNote} from "../../features/NotesSlice"; // Import delete action
import "./NoteList.css";

const NoteList = ({ noteType, labelName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Get notes from Redux store
  const homeNotes = useSelector((state) => state.notes.notes) || [];
  const reminderNotes = useSelector((state) => state.notes.reminderNotes) || [];
  const labeledNotes =
    useSelector((state) => state.notes.labels[labelName]) || [];

  // Correct note filtering logic
  let notes = [];
  if(noteType==='reminder'){
    notes=reminderNotes;
  }
   else if (labelName==='Edit Label') {
    notes = labeledNotes; 
    //Only show notes for this label
  }else if (labelName){
    notes=labeledNotes
  } 
  else {
    notes = homeNotes.filter((note) => note.labels.length === 0); 
    // Show only unlabeled notes in "Notes"
  }

  console.log(`📝 Displaying notes for ${labelName || "Home"}:`, notes);

  // Find selected note
  const selectedNote = id ? notes.find((note) => note.id === id) || null : null;
  const [hoveredNote, setHoveredNote] = useState(null);
  const [menuOpen, setShowMenu] = useState(null);

  const formatTime = (dateString) => {
    if (!dateString) return "No time set";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Handle permanent delete
  const handleDelete = (e, noteId) => {
    e.stopPropagation();
    dispatch(permanentDeleteNote(noteId));
    setShowMenu(null);
  };

  return (
    <div className="note-list">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            onMouseEnter={() => setHoveredNote(note.id)}
            onMouseLeave={() => setHoveredNote(null)}
          >
            {noteType === "reminder" ? (
              <div className="reminder-note">
                <h3>{note.title}</h3>
                <p className="reminder-time">{formatTime(note.reminderTime)}</p>

                {/* Show 3-dot menu on hover */}
                {hoveredNote === note.id && (
                  <div className="menu-container">
                    <button
                      className="menu-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(menuOpen === note.id ? null : note.id);
                      }}
                    >
                      ⋮
                    </button>
                    {menuOpen === note.id && (
                      <div className="menu-dropdown">
                        <button onClick={(e) => handleDelete(e, note.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Note {...note} />
            )}
          </div>
        ))
      ) : (
        <p className="empty-message">No notes available</p>
      )}

      {/* Modal for selected note */}
      {selectedNote && (
        <div className="modal-overlay" onClick={() => navigate("/")}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Note {...selectedNote} />
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
