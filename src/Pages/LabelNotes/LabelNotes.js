// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote } from "../../features/NotesSlice";
// import NoteList from "../../components/NoteList/NoteList";
// import Createnote from "../../components/Createnote/Createnote";

// const LabelNotes = () => {
//   const { labelName } = useParams();
//   const dispatch = useDispatch();

//   //  Ensure component re-renders when notes change
//   const notes = useSelector((state) => state.notes.notes).filter((note) =>
//     note.labels?.includes(labelName)
//   );

//   //  Debugging: Check if notes are correctly fetched
//   // useEffect(() => {
//   //   console.log(`📌 Notes for label "${labelName}":`, notes);
//   // }, [notes]); // Re-run when notes change
//   useEffect(() => {
//     const labelNotes = notes.filter((note) => note.labels?.includes(labelName));
    
//     setDisplayNotes(labelNotes);
    
//     console.log(`📌 Notes for label "${labelName}":`, labelNotes);
//   }, [notes, labelName]); // ✅ Re-run when notes or labelName change
  
//   // Ensure notes are added under the correct label
//   const handleAddNote = (note) => {
//     const updatedNote = {
//       ...note,
//       labels: [...(note.labels || []), labelName], // ✅ Append label correctly
//     };
//     dispatch(addNote(updatedNote));
//   };

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       {/* Ensure new notes are created under the selected label */}
//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       {/*  Pass labelName so NoteList can fetch the right notes */}
//       <NoteList noteType="label" labelName={labelName} notes={notes} />
//     </div>
//   );
// };

// export default LabelNotes;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote,copyNote } from "../../features/NotesSlice";
// import NoteList from "../../components/NoteList/NoteList";
// import Createnote from "../../components/Createnote/Createnote";

// const LabelNotes = () => {
//   const { labelName } = useParams();
//   const dispatch = useDispatch();
  
//   // Get all notes and filter by the selected label
//   const allNotes = useSelector((state) => state.notes.notes);
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     const labelNotes = allNotes.filter((note) => note.labels?.includes(labelName));
//     setDisplayNotes(labelNotes);
    
//     console.log(` Notes for label "${labelName}":`, labelNotes);
//   }, [allNotes, labelName]); // Re-run when notes or labelName change

//   // Ensure notes are added under the correct label
//   const handleAddNote = (note) => {
//     const updatedNote = {
//       ...note,
//       labels: [...(note.labels || []), labelName], //  Append label correctly
//     };
//     dispatch(addNote(updatedNote));
    
//   const handleCopy = (noteId) => {
//     dispatch(copyNote({ noteId, labelName })); //  Pass labelName
//     };
  
//   };

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       {/* Ensure new notes are created under the selected label */}
//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       {/* Pass displayNotes so only relevant notes are shown */}
//       <NoteList noteType="label" labelName={labelName} notes={displayNotes}
//       onCopyNote={handleCopy} />
//     </div>
//   );
// };

// export default LabelNotes;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNote, copyNote } from "../../features/NotesSlice";
import NoteList from "../../components/NoteList/NoteList";
import Createnote from "../../components/Createnote/Createnote";

const LabelNotes = () => {
  const { labelName } = useParams();
  const dispatch = useDispatch();
  
  // Get all notes and filter by the selected label
  const allNotes = useSelector((state) => state.notes.notes);
  const [displayNotes, setDisplayNotes] = useState([]);

  useEffect(() => {
    const labelNotes = allNotes.filter((note) => note.labels?.includes(labelName));
    setDisplayNotes(labelNotes);
    
    console.log(`📌 Notes for label "${labelName}":`, labelNotes);
  }, [allNotes, labelName]); 

  // Ensure notes are added under the correct label
  const handleAddNote = (note) => {
    const updatedNote = {
      ...note,
      labels: [...(note.labels || []), labelName], // ✅ Append label correctly
    };
    dispatch(addNote(updatedNote));
  };

  // Ensure copied notes stay within the same label
  const handleCopyNote = (noteId) => {
    dispatch(copyNote({ noteId, labelName })); // ✅ Pass labelName
  };

  return (
    <div className="label-notes-container">
      <h2>Notes for {labelName}</h2>

      {/* Ensure new notes are created under the selected label */}
      <Createnote addNote={handleAddNote} labelName={labelName} />

      {/* Pass displayNotes so only relevant notes are shown */}
      <NoteList 
        noteType="label" 
        labelName={labelName} 
        notes={displayNotes} 
        onCopyNote={handleCopyNote} // ✅ Pass copy function
      />
    </div>
  );
};

export default LabelNotes;
