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


// import React from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote, deleteNote, editNote, pinNote, copyNote } from "../../features/NotesSlice";
// import NoteList from "../../components/NoteList/NoteList";
// import Createnote from "../../components/Createnote/Createnote";



// const LabelNotes = () => {
//   const { labelName } = useParams();
//   const dispatch = useDispatch();

//   // Get notes for specific label
//   const notes = useSelector((state) => state.notes.labels[labelName])|| []; 
//   // Get notes for specific label
  
//   console.log("Redux labels state:", useSelector((state) => state.notes.labels));
//    // Debugging
//   console.log(`Notes for label "${labelName}":`, notes); 
//   // Debugging

//   const handleAddNote = (note) => {
//     dispatch(addNote({ ...note, labels:[labelName]}));
//   };

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       {notes.length > 0 ? (
//         <NoteList
//           notes={notes}
//           noteType='label'
//           labelName={labelName}
//           deleteNote={(id) => dispatch(deleteNote({ id, label: labelName }))}
//           pinNote={(id) => dispatch(pinNote({ id, label: labelName }))}
//           copyNote={(id) => dispatch(copyNote({ id, label: labelName }))}
//           editNote={(id, updatedNote) => dispatch(editNote({ id, updatedNote, label: labelName }))}
//         />  
//       ) : (
//         <p>No Notes for this label</p>
//       )}
//     </div>
//   );
// };

// export default LabelNotes;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../features/NotesSlice";
import NoteList from "../../components/NoteList/NoteList";
import Createnote from "../../components/Createnote/Createnote";

const LabelNotes = () => {
  const { labelName } = useParams();
  const dispatch = useDispatch();

  // ✅ Ensure component re-renders when notes change
  const notes = useSelector((state) => state.notes.notes).filter((note) =>
    note.labels?.includes(labelName)
  );

  // ✅ Debugging: Check if notes are correctly fetched
  useEffect(() => {
    console.log(`📌 Notes for label "${labelName}":`, notes);
  }, [notes]); // Re-run when notes change

  // ✅ Ensure notes are added under the correct label
  const handleAddNote = (note) => {
    const updatedNote = {
      ...note,
      labels: [...(note.labels || []), labelName], // ✅ Append label correctly
    };
    dispatch(addNote(updatedNote));
  };

  return (
    <div className="label-notes-container">
      <h2>Notes for {labelName}</h2>

      {/* ✅ Ensure new notes are created under the selected label */}
      <Createnote addNote={handleAddNote} labelName={labelName} />

      {/* ✅ Pass labelName so NoteList can fetch the right notes */}
      <NoteList noteType="label" labelName={labelName} notes={notes} />
    </div>
  );
};

export default LabelNotes;

