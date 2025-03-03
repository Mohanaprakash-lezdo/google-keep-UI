import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import Note from "../Note/Note";
import { archiveNote } from "../../features/NotesSlice"; // Import archive action
import "./NoteList.css";


const NoteList = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { id } = useParams();

  // get notes from redux store
  const notes=useSelector((state)=>state.notes.notes) || []
  const unarchivedNotes = notes.filter((note) => !note.isArchived); 
 

  // Ensure  selectednote is only found if id exists

  const selectedNote = id?notes.find((note) => note.id === id)||null:null;

   // Handle Archive Click
   const handleArchive = (e, noteId) => {
    e.stopPropagation(); // Prevents modal from opening
    dispatch(archiveNote({id:noteId}));
    console.log('Archived notes',noteId);
    
  };

  return (
    <div className="note-list">
      {unarchivedNotes.length > 0 ? (
        unarchivedNotes.map((note) => (
          <div key={note.id} onClick={() => navigate(`/note/${note.id}`)} className="note-item">
            <Note {...note} />
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
