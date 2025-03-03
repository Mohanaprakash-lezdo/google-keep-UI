import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Note from "../../components/Note/Note";
import { UnarchiveNote, deleteNote } from "../../features/NotesSlice"; 
import "../../components/NoteList/NoteList.css"; 

const ArchiveList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(null);

  // Get archived notes from Redux
  const archivedNotes = useSelector((state) => state.notes.archivedNotes);

  console.log("Archived Notes in Redux Store:", archivedNotes);

  // Handle Unarchive Click
  const handleUnarchive = (e, noteId) => {
    e.stopPropagation();
    dispatch(UnarchiveNote(noteId));
    navigate("/"); // Redirect to Home after unarchiving
  };

  // Handle Delete Click
  const handleDelete = (e, noteId) => {
    e.stopPropagation();
    dispatch(deleteNote(noteId));
  };

  // Toggle 3-dot menu
  const toggleMenu = (e, noteId) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === noteId ? null : noteId);
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
            <Note {...note} />
           
          </div>
        ))
      ) : (
        <p className="empty-message">No archived notes</p>
      )}
    </div>
  );
};

export default ArchiveList;
