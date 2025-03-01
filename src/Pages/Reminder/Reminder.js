import React from "react";
import { useSelector } from "react-redux";
// import NoteList from "../../components/NoteList/NoteList";
// import { deleteNote, editNote, pinNote, copyNote } from "../../features/NotesSlice";

const Reminder = () => {
  // const dispatch = useDispatch();
  const reminderNotes = useSelector((state) => state.notes.reminderNotes);

  return (
    <div>
      <h2>Reminders</h2>
      {reminderNotes.length > 0 ? (
        <div >
          {reminderNotes.map((note, index) => (
            <div key={index} className="reminder-note">
              <h3>{note.title}</h3>
              <p>{note.reminderTime}</p> {/* Show only the time */}
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
