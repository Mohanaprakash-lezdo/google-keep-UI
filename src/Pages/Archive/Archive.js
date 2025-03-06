import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Note from "../../components/Note/Note";
import { UnarchiveNote, deleteNote } from "../../features/NotesSlice"; 
import "../../components/NoteList/NoteList.css"; 

const ArchiveList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(null);

  // ✅ Get archived notes from Redux
  const archivedNotes = useSelector((state) => state.notes.archivedNotes || []);

  // ✅ Debugging: Ensure archived notes are correctly retrieved
  useEffect(() => {
    console.log("Archived Notes in Redux Store:", archivedNotes);
  }, [archivedNotes]);

  // ✅ Handle Unarchive Click
  const handleUnarchive = (e, noteId) => {
    e.stopPropagation();
    dispatch(UnarchiveNote(noteId));
    navigate("/"); // Redirect to Home after unarchiving
  };

  // ✅ Handle Delete Click
  const handleDelete = (e, noteId) => {
    e.stopPropagation();
    dispatch(deleteNote(noteId));
  };

  return (
    <div className="note-list">
      {archivedNotes.length > 0 ? (
        archivedNotes.map((note) => (
          <div 
            key={note.id} 
            className="note-item"
            onMouseLeave={() => setMenuOpen(null)} // Hide menu when mouse leaves
          >
            {/* ✅ Pass all note props explicitly */}
            <Note 
              id={note.id}
              title={note.title}
              content={note.content}
              labels={note.labels}
              isPinned={note.isPinned}
              isArchived={true} // ✅ Ensure it's marked as archived
              image={note.image}
            />
            
            {/* ✅ Three-dot menu on hover */}
            <div className="menu-container" onClick={(e) => setMenuOpen(note.id)}>
              <span className="menu-icon">⋮</span>
              {menuOpen === note.id && (
                <div className="menu">
                  <button onClick={(e) => handleUnarchive(e, note.id)}>Unarchive</button>
                  <button onClick={(e) => handleDelete(e, note.id)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="empty-message">No archived notes</p>
      )}
    </div>
  );
};

export default ArchiveList;
