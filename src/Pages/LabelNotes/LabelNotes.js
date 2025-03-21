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
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote, copyNote,UnarchiveNote } from "../../features/NotesSlice";
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
    
//     console.log(`📌 Notes for label "${labelName}":`, labelNotes);
//   }, [allNotes, labelName]); 

//   // Ensure notes are added under the correct label
//   const handleAddNote = (note) => {
//     const updatedNote = {
//       ...note,
//       labels: [...(note.labels || []), labelName], // ✅ Append label correctly
//     };
//     dispatch(addNote(updatedNote));
//   };

//   // Ensure copied notes stay within the same label
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ noteId, labelName })); // ✅ Pass labelName
//   };

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       {/* Ensure new notes are created under the selected label */}
//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       {/* Pass displayNotes so only relevant notes are shown */}
//       <NoteList 
//         noteType="label" 
//         labelName={labelName} 
//         notes={displayNotes} 
//         onCopyNote={handleCopyNote} // ✅ Pass copy function
//       />
//     </div>
//   );
// };

// export default LabelNotes;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote, copyNote, UnarchiveNote } from "../../features/NotesSlice";
// import NoteList from "../../components/NoteList/NoteList";
// import Createnote from "../../components/Createnote/Createnote";

// const LabelNotes = () => {
//   const { labelName } = useParams();
//   const dispatch = useDispatch();
  
//   // Get all notes and filter by the selected label
//   const allNotes = useSelector((state) => state.notes.notes);
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     // ✅ Filter notes that belong to this label and are NOT archived
//     const labelNotes = allNotes.filter(
//       (note) => note.labels?.includes(labelName) && !note.isArchived
//     );
//     setDisplayNotes(labelNotes);
//   }, [allNotes, labelName]); 

//   // Handle adding notes to the label
//   const handleAddNote = (note) => {
//     const updatedNote = {
//       ...note,
//       labels: [...(note.labels || []), labelName],
//     };
//     dispatch(addNote(updatedNote));
//   };

//   // Handle copying notes within the label
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ noteId, labelName }));
//   };

//   // ✅ Handle unarchiving the note correctly
//   // const handleUnarchive = (noteId) => {
//   //   dispatch(UnarchiveNote({ id: noteId, labelName })); // Pass labelName
//   // };
//   // const handleUnarchive = (noteId) => {
//   //   console.log(`📌 Unarchiving Note from Label: ${labelName}, ID: ${noteId}`);
//   //   dispatch(UnarchiveNote({ id: noteId, labelName }));
//   // };
  
//   const handleUnarchive = (noteId, labels) => {
//     console.log(`📌 Unarchiving Note ID: ${noteId}, Labels: ${labels}`);
//     dispatch(UnarchiveNote({ id: noteId, labels }));
//   };
  
  

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       {/* Create Note inside the label */}
//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       {/* Show only active (non-archived) notes */}
//       <NoteList 
//         noteType="label" 
//         labelName={labelName} 
//         notes={displayNotes} 
//         onCopyNote={handleCopyNote} 
//         onUnarchive={handleUnarchive} // ✅ Pass Unarchive function
//       />
//     </div>
//   );
// };

// export default LabelNotes;
// import React from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote, copyNote, UnarchiveNote } from "../../features/NotesSlice";
// import NoteList from "../../components/NoteList/NoteList";
// import Createnote from "../../components/Createnote/Createnote";

// const LabelNotes = () => {
//   const { labelName } = useParams();
//   const dispatch = useDispatch();

//   // ✅ Get only non-archived notes for the label directly from Redux
//   // const displayNotes = useSelector((state) => 
//   //   state.notes.notes.filter((note) => note.labels?.includes(labelName) && !note.isArchived)
//   // );
//   const displayNotes = useSelector((state) => {
//     return [...state.notes.notes].filter((note) => note.labels?.includes(labelName) && !note.isArchived);
//   });
  

//   // Handle adding notes to the label
//   const handleAddNote = (note) => {
//     const updatedNote = {
//       ...note,
//       labels: [...(note.labels || []), labelName],
//     };
//     dispatch(addNote(updatedNote));
//   };

//   // Handle copying notes within the label
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ noteId, labelName }));
//   };

//   // ✅ Unarchive note and let Redux handle correct placement
//   const handleUnarchive = (noteId) => {
//     console.log(`📌 Unarchiving Note ID: ${noteId}, Label: ${labelName}`);
//     dispatch(UnarchiveNote({ id: noteId })); // ✅ No need to pass labels
//   };

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       {/* Create Note inside the label */}
//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       {/* Show only active (non-archived) notes */}
//       <NoteList 
//         noteType="label" 
//         labelName={labelName} 
//         notes={displayNotes} 
//         onCopyNote={handleCopyNote} 
//         onUnarchive={handleUnarchive} // ✅ Pass Unarchive function
//       />
//     </div>
//   );
// };

// export default LabelNotes;
// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote, copyNote, UnarchiveNote } from "../../features/NotesSlice";
// import NoteList from "../../components/NoteList/NoteList";
// import Createnote from "../../components/Createnote/Createnote";

// const LabelNotes = () => {
//   const { labelName } = useParams();
//   const dispatch = useDispatch();

//   // ✅ Use useSelector with full state update tracking
//   const notes = useSelector((state) => state.notes.notes); 
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes);
//   const labels = useSelector((state) => state.notes.labels);

//   // ✅ Ensure only unarchived notes under the current label are displayed
//   const labelNotes = notes.filter(
//     (note) => note.labels?.includes(labelName) && !note.isArchived
//   );

//   // 🔥 Debugging: Ensure state updates correctly
//   useEffect(() => {
//     console.log(`📌 Displaying notes for "${labelName}":`, labelNotes);
//     console.log("🔥 Redux State - All Notes:", notes);
//     console.log("🔥 Redux State - Archived Notes:", archivedNotes);
//     console.log("🔥 Redux State - Labels:", labels);
//   }, [labelName, notes, archivedNotes, labels]);

//   // ✅ Handle adding a note under the correct label
//   const handleAddNote = (note) => {
//     const updatedNote = {
//       ...note,
//       labels: [...(note.labels || []), labelName],
//     };
//     dispatch(addNote(updatedNote));
//   };

//   // ✅ Handle copying notes inside the label
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ noteId, labelName }));
//   };

//   // ✅ Handle unarchiving the note
//   const handleUnarchive = (noteId, labels) => {
//     console.log(`📌 Unarchiving Note ID: ${noteId}, Labels: ${labels}`);
//     dispatch(UnarchiveNote({ id: noteId, labels }));
//   };

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       {/* Create Note inside the label */}
//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       {/* Show only unarchived notes inside the label */}
//       <NoteList 
//         noteType="label" 
//         labelName={labelName} 
//         notes={labelNotes} // ✅ Now updates correctly
//         onCopyNote={handleCopyNote} 
//         onUnarchive={handleUnarchive} 
//       />
//     </div>
//   );
// };

// export default LabelNotes;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote, copyNote, UnarchiveNote } from "../../features/NotesSlice";
// import NoteList from "../../components/NoteList/NoteList";
// import Createnote from "../../components/Createnote/Createnote";

// const LabelNotes = () => {
//   const { labelName } = useParams();
//   const dispatch = useDispatch();
  
//   // Get all notes and filter by the selected label
//   const allNotes = useSelector((state) => state.notes.notes);
//   const [displayNotes, setDisplayNotes] = useState([]);

//   // useEffect(() => {
//   //   console.log("🔄 Updating LabelNotes UI for label:", labelName);

//   //   // ✅ Force UI update by mapping a NEW array
//   //   setDisplayNotes([...allNotes.filter(
//   //     (note) => note.labels?.includes(labelName) && !note.isArchived
//   //   )]);

//   // }, [allNotes, labelName]); // ✅ Trigger re-render when allNotes change
//   useEffect(() => {
//     // ✅ Fetch notes for this label that are not archived
//     const labelNotes = allNotes.filter(
//       (note) => note.labels?.includes(labelName) && !note.isArchived
//     );
//     setDisplayNotes(labelNotes);
//   }, [allNotes, archivedNotes, labelName]); // 🔥 Add archivedNotes as a dependency
  

//   // Handle adding notes to the label
//   const handleAddNote = (note) => {
//     const updatedNote = {
//       ...note,
//       labels: [...(note.labels || []), labelName],
//     };
//     dispatch(addNote(updatedNote));
//   };

//   // Handle copying notes within the label
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ noteId, labelName }));
//   };

//   // ✅ Handle unarchiving the note correctly
//   const handleUnarchive = (noteId, labels) => {
//     console.log(`📌 Dispatching UnarchiveNote with ID: ${noteId}, Labels: ${labels}`);
//     dispatch(UnarchiveNote({ id: noteId, labels: labels || [] }));
//   };

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       {/* Create Note inside the label */}
//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       {/* Show only active (non-archived) notes */}
//       <NoteList 
//         noteType="label" 
//         labelName={labelName} 
//         notes={displayNotes} 
//         onCopyNote={handleCopyNote} 
//         onUnarchive={handleUnarchive} // ✅ Pass Unarchive function
//       />
//     </div>
//   );
// };

// export default LabelNotes;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote, copyNote, UnarchiveNote } from "../../features/NotesSlice";
// import NoteList from "../../components/NoteList/NoteList";
// import Createnote from "../../components/Createnote/Createnote";

// const LabelNotes = () => {
//   const { labelName } = useParams();
//   const dispatch = useDispatch();
  
//   // Get all notes and archived notes from Redux state
//   const allNotes = useSelector((state) => state.notes.notes);
//   const archivedNotes = useSelector((state) => state.notes.archivedNotes);
//   const [displayNotes, setDisplayNotes] = useState([]);

//   useEffect(() => {
//     // ✅ Ensure UI updates after unarchiving
//     const labelNotes = allNotes.filter(
//       (note) => note.labels?.includes(labelName) && !note.isArchived
//     );
//     setDisplayNotes(labelNotes);
//   }, [allNotes, archivedNotes, labelName]); // 🔥 Added `archivedNotes` to trigger updates

//   // ✅ Handle adding notes to the label
//   const handleAddNote = (note) => {
//     const updatedNote = {
//       ...note,
//       labels: [...(note.labels || []), labelName],
//     };
//     dispatch(addNote(updatedNote));
//   };

//   // ✅ Handle copying notes within the label
//   const handleCopyNote = (noteId) => {
//     dispatch(copyNote({ noteId, labelName }));
//   };

//   // ✅ Handle unarchiving and force UI update
//   const handleUnarchive = (noteId) => {
//     dispatch(UnarchiveNote(noteId));
//   };

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       {/* ✅ Create Note inside the label */}
//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       {/* ✅ Display only active (non-archived) notes */}
//       <NoteList 
//         noteType="label" 
//         labelName={labelName} 
//         notes={displayNotes} 
//         onCopyNote={handleCopyNote} 
//         onUnarchive={handleUnarchive} 
//       />
//     </div>
//   );
// };

// export default LabelNotes;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote, copyNote } from "../../features/NotesSlice";
// import NoteList from "../../components/NoteList/NoteList";
// import Createnote from "../../components/Createnote/Createnote";

// const LabelNotes = () => {
//   const { labelName } = useParams();
//   const dispatch = useDispatch();
//   const labels = useSelector((state) => state.notes.labels) || {};
//   const [displayNotes, setDisplayNotes] = useState([]);

//   // Fetch only notes under the selected label
//   useEffect(() => {
//     const filteredNotes = labels[labelName] || []; // ✅ Fetch notes for the specific label only
//     setDisplayNotes([...filteredNotes]); // ✅ Ensures React detects changes
//   }, [labels, labelName]);

//   useEffect(() => {
//     console.log(`⚡ UI Updated - Label: ${labelName}, Notes Count: ${displayNotes.length}`);
//   }, [displayNotes]);

//   const handleAddNote = (note) => {
//     const updatedNote = {
//       ...note,
//       labels: [...(note.labels || []), labelName],
//     };
//     dispatch(addNote(updatedNote));
//   };

//   const handleCopyNote = (note) => {
//     dispatch(copyNote(note)); // ✅ No need to wrap in an object
//   };

//   return (
//     <div className="label-notes-container">
//       <h2>Notes for {labelName}</h2>

//       <Createnote addNote={handleAddNote} labelName={labelName} />

//       <NoteList 
//         noteType="label" 
//         labelName={labelName} 
//         notes={displayNotes} 
//         onCopyNote={handleCopyNote} 
//       />
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
  const labels = useSelector((state) => state.notes.labels) || {};
  const [displayNotes, setDisplayNotes] = useState([]);

  // ✅ Ensure copied notes update LabelNotes correctly
  useEffect(() => {
    if (labels[labelName]) {
      setDisplayNotes([...labels[labelName]]); // ✅ Only show notes for this label
    }
  }, [labels, labelName]);

  useEffect(() => {
    console.log(`⚡ UI Updated - Label: ${labelName}, Notes Count: ${displayNotes.length}`);
  }, [displayNotes]);

  const handleAddNote = (note) => {
    const updatedNote = {
      ...note,
      labels: [...(note.labels || []), labelName],
    };
    dispatch(addNote(updatedNote));
  };

  // const handleCopyNote = (note) => {
  //   dispatch(copyNote(note)); // ✅ Copy note within its label
  // };
  const handleCopyNote = (note) => {
    if (!note) {
      console.error("❌ handleCopyNote Error: Received undefined note");
      return;
    }
  
    console.log("📌 Copying Note:", note);
    dispatch(copyNote(note)); // ✅ Make sure we're passing the correct note
  };
  
  // console.log(`📂 Label Notes (${labelName}):`, state.labels[labelName]);

  return (
    <div className="label-notes-container">
      <h2>Notes for {labelName}</h2>

      <Createnote addNote={handleAddNote} labelName={labelName} />

      <NoteList 
        noteType="label" 
        labelName={labelName} 
        notes={displayNotes} 
        onCopyNote={handleCopyNote} 
      />
    </div>
  );
};

export default LabelNotes;

