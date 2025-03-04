import React,{useState}from "react";
import {useNavigate, useParams } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import Note from "../Note/Note";
import { permanentDeleteNote } from "../../features/NotesSlice"; // Import archive action
import "./NoteList.css";


const NoteList = ({noteType,labelName}) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { id } = useParams();
  // const location=useLocation()

  // get notes from redux store
  const allnotes=useSelector((state)=>state.notes.notes) || [];
  const reminderNotes=useSelector((state)=>state.notes.reminderNotes) || [];
  const notes = noteType === "reminder" ? reminderNotes : allnotes;
  // const unarchivedNotes = notes.filter((note) => !note.isArchived); 
 
  // filter notes based in labelname if present
  const filteredNotes=labelName?notes.filter((note)=>note.labels.includes(labelName))
  :notes.filter((note)=>note.labels.length===0);

  // Ensure  selectednote is only found if id exists

  const selectedNote = id?filteredNotes.find((note) => note.id === id)||null:null;
  const [hoveredNote, setHoveredNote] = useState(null);
  const [menuOpen, setShowMenu] = useState(null);

  const formatTime = (dateString) => {
    if (!dateString) return "No time set";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

   // Handle permanent delete
   const handleDelete = (e, noteId) => {
    e.stopPropagation(); // Prevents note from opening
    dispatch(permanentDeleteNote(noteId));
    setShowMenu(null); // Close menu after deleting
  };


  //  // Handle Archive Click
  //  const handleArchive = (e, noteId) => {
  //   e.stopPropagation(); // Prevents modal from opening
  //   dispatch(archiveNote({id:noteId}));
  //   console.log('Archived notes',noteId);
    
  // };

  return (
    <div className="note-list">
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <div key={note.id} 
          // onClick={() => navigate(`/note/${note.id}`)}
          className="note-item"
          onMouseEnter={()=>setHoveredNote(note.id)}
          onMouseLeave={()=>setHoveredNote(null)}>


            {/* {Show only title  and reminderTime  for  reminder} */}
            {noteType==='reminder'?(
              <div className='reminder-note'>
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
                        <button onClick={(e) => handleDelete(e, note.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </div>  
            ):(
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
