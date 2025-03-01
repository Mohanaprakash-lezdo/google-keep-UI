import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Note from "../Note/Note";
import "./NoteList.css";
// import { deleteNote } from "../../features/NotesSlice";
// import { pinNote } from "../../features/NotesSlice";

const NoteList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // get notes from redux store
  const notes=useSelector((state)=>state.notes.notes) || []

  // separate  pinned and unpinned notes
  // const pinnedNotes=notes.filter((note)=>note.isPinned);
  // const unpinnedNotes=notes.filter((note)=>!note.isPinned);

  // Ensure  selectednote is only found if id exists

  const selectedNote = id?notes.find((note) => note.id === parseInt(id,10)):null;

  return (
    <div className="note-list">
      {
        notes.length>0?(
          notes.map((note) => (
            <div key={note.id} onClick={() => navigate(`/note/${note.id}`)}>
              <Note
                 {...note}/>
              {/* <button className="pin-button" onClick={()=>pinNote(note.id)}>
                {note.isPinned? '':''}
              </button> */}
                {/* // pass a copy function */}
  
            </div>
          ))

        ):(
          <p className="empty-message">No notes available</p>
        )}
      
      {/* {modal for selected note} */}
      {selectedNote &&(
        <div className="modal-overlay" onClick={() => navigate("/")}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <Note
           {...selectedNote}
          />
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
