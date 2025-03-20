// import React  from "react";
// import { useSelector,useDispatch} from "react-redux";
// import CreateNote from '../../components/Createnote/Createnote';
// import NoteList from "../../components/NoteList/NoteList";
// import {addReminderNote} from '../../features/NotesSlice'
// // import { deleteNote, editNote, pinNote, copyNote } from "../../features/NotesSlice";

// const Reminder = () => {
//   const dispatch = useDispatch();
//   const reminderNotes = useSelector((state) => state.notes.reminderNotes);

//   console.log(reminderNotes);

//     // // Function to add reminder notes
//     const handleAddReminderNote = (newNote) => {
//       if (newNote.title || newNote.content){
//       dispatch(addReminderNote({...newNote,isReminder:true}))};
//     };
  

//   return (
//     <div>
//       <h2>Reminders</h2>
//       <CreateNote onAddNote={handleAddReminderNote} isReminder={true}/>
//       {reminderNotes.length > 0 ? (
//         <NoteList noteType='reminder'/>
//       ) : (
//         <p>No reminders yet!</p>
//       )}
//     </div>
//   );
// };
// export default Reminder;
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import CreateNote from "../../components/Createnote/Createnote";
// import NoteList from "../../components/NoteList/NoteList";
// import { addReminderNote } from "../../features/NotesSlice";

// const Reminder = () => {
//   const dispatch = useDispatch();
//   const notes = useSelector((state) => state.notes.notes); // Get all notes

//   // Filter out notes that have a reminder
//   const reminderNotes = notes.filter((note) => note.isReminder);

//   console.log("Reminder Notes:", reminderNotes);

//   // Function to add a reminder note
//   const handleAddReminderNote = (newNote) => {
//     if (newNote.title || newNote.content) {
//       dispatch(addReminderNote({ ...newNote, isReminder: true }));
//     }
//   };

//   return (
//     <div>
//       <h2>Reminders</h2>
//       <CreateNote onAddNote={handleAddReminderNote} isReminder={true} />
//       {reminderNotes.length > 0 ? (
//         <NoteList notes={reminderNotes} noteType="reminder" />
//       ) : (
//         <p>No reminders yet!</p>
//       )}
//     </div>
//   );
// };

// export default Reminder;
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import CreateNote from "../../components/Createnote/Createnote";
// import NoteList from "../../components/NoteList/NoteList";
// import { addReminderNote } from "../../features/NotesSlice";

// const Reminder = () => {
//   const dispatch = useDispatch();

//   // ✅ Fix: Select reminder notes from state.notes.notes
//   const reminderNotes = useSelector((state) => 
//     state.notes.notes.filter(note => note.isReminder)
//   );

//   console.log("Reminder Notes:", reminderNotes);

//   // ✅ Fix: Ensure new reminders are added correctly
//   const handleAddReminderNote = (newNote) => {
//     if (newNote.title || newNote.content) {
//       dispatch(addReminderNote({ ...newNote, isReminder: true }));
//     }
//   };

//   return (
//     <div>
//       <h2>Reminders</h2>
//       <CreateNote onAddNote={handleAddReminderNote} isReminder={true} />

//       {reminderNotes.length > 0 ? (
//         <NoteList notes={reminderNotes} noteType="reminder" />
//       ) : (
//         <p>No reminders yet!</p>
//       )}
//     </div>
//   );
// };

// export default Reminder;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateNote from "../../components/Createnote/Createnote";
import { addReminderNote } from "../../features/NotesSlice";
import "./Reminder.css"; // Optional for better styling

const Reminder = () => {
  const dispatch = useDispatch();
  // const reminderNotes = useSelector((state) =>
  //   state.notes.notes.filter((note) => note.isReminder) // ✅ Filter reminder notes
  // );
  const reminderNotes = useSelector((state) => state.notes.reminderNotes || []);

  console.log(reminderNotes);

  // Function to add reminder notes
  const handleAddReminderNote = (newNote) => {
    if (newNote.title || newNote.content) {
      dispatch(addReminderNote({ ...newNote, isReminder: true }));
    }
  };

  return (
    <div className="reminder-container">
      <h2>Reminders</h2>
      <CreateNote onAddNote={handleAddReminderNote} isReminder={true} />
      
      {reminderNotes.length > 0 ? (
        <div className="reminder-list">
          {reminderNotes.map((note) => (
            <div key={note.id} className="reminder-note">
              <p className="note-title">{note.title}</p>
              {/* <p className="note-content">{note.content}</p> */}
              <p className="reminder-time">⏰ Reminder: {note.reminderTime}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reminders yet!</p>
      )}
    </div>
  );
};

export default Reminder;
