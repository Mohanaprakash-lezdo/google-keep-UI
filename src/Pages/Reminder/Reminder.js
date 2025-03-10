import React  from "react";
import { useSelector,useDispatch} from "react-redux";
import CreateNote from '../../components/Createnote/Createnote';
import NoteList from "../../components/NoteList/NoteList";
import {addReminderNote} from '../../features/NotesSlice'
// import { deleteNote, editNote, pinNote, copyNote } from "../../features/NotesSlice";

const Reminder = () => {
  const dispatch = useDispatch();
  const reminderNotes = useSelector((state) => state.notes.reminderNotes);

  console.log(reminderNotes);

    // // Function to add reminder notes
    const handleAddReminderNote = (newNote) => {
      if (newNote.title || newNote.content){
      dispatch(addReminderNote({...newNote,isReminder:true}))};
    };
  

  return (
    <div>
      <h2>Reminders</h2>
      <CreateNote onAddNote={handleAddReminderNote} isReminder={true}/>
      {reminderNotes.length > 0 ? (
        <NoteList noteType='reminder'/>
      ) : (
        <p>No reminders yet!</p>
      )}
    </div>
  );
};
export default Reminder;
