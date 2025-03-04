// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { addNote, deleteNote, editNote, pinNote, copyNote } from "../../features/NotesSlice";
// import NoteList from '../../components/NoteList/NoteList';
// import Createnote from '../../components/Createnote/Createnote';
// import { useDispatch,useSelector} from 'react-redux';

// const LabelNotes = () => {

//     const {labelName}=useParams();
//     const dispatch=useDispatch();

//     // select notes  that  belong to this label
//     const notes = useSelector((state) => state.notes.notes);
//     const filteredNotes = notes.filter((note) => note.labels.includes(labelName));

//     const handleAddNote = (note) => {
//       dispatch(addNote({ ...note, labels: [...(note.labels || []), labelName] }));
//     };

//   return (
//     <div className='label-notes-container'>
//         <h2>Notes for {labelName}</h2>
//         {/* Create a note */}
//         <Createnote addNote={handleAddNote}  labelName={labelName} />

//         {filteredNotes.length>0 ?(
//             <NoteList notes={filteredNotes}
//             deleteNote={(id)=>dispatch(deleteNote(id))}
//             pinNote={(id)=>dispatch(pinNote(id))}
//             copyNote={(id)=>dispatch(copyNote(id))}
//             editNote={editNote}
           
//             />
//         ):(
//             <p>No Notes for this label</p>
//         )}
        

//     </div>
//   )
// }

// export default LabelNotes


import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNote, deleteNote, editNote, pinNote, copyNote } from "../../features/NotesSlice";
import NoteList from "../../components/NoteList/NoteList";
import Createnote from "../../components/Createnote/Createnote";

const LabelNotes = () => {
  const { labelName } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes[labelName] || []); // Get notes for specific label

  const handleAddNote = (note) => {
    dispatch(addNote({ ...note, labels: [labelName] }));
  };

  return (
    <div className="label-notes-container">
      <h2>Notes for {labelName}</h2>

      <Createnote addNote={handleAddNote} labelName={labelName} />

      {notes.length > 0 ? (
        <NoteList
          notes={notes}
          deleteNote={(id) => dispatch(deleteNote({ id, label: labelName }))}
          pinNote={(id) => dispatch(pinNote({ id, label: labelName }))}
          copyNote={(id) => dispatch(copyNote({ id, label: labelName }))}
          editNote={(id, updatedNote) => dispatch(editNote({ id, updatedNote, label: labelName }))}
        />
      ) : (
        <p>No Notes for this label</p>
      )}
    </div>
  );
};

export default LabelNotes;
