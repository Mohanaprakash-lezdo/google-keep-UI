// import { Unarchive } from '@mui/icons-material';
import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const initialState={
    notes:[],
    trashedNotes:[],
    archivedNotes:[],
    labels:[],
    reminderNotes:[],
    searchQuery:'',
};

const NotesSlice=createSlice({
    name:'notes',
    initialState,
    reducers:{
        // add note 
        addNote:(state,action)=>{
            state.notes.push(
                {id:uuidv4(),
                ...action.payload});
            // store in normal note
            },
        addReminderNote:(state,action)=>{
            state.reminderNotes.push(
                {id:uuidv4(),
                ...action.payload,
                reminderTime:action.payload.reminderTime || new Date().toLocaleString(),
                });
        },
        // delete note
        deleteNote:(state,action)=>{
            const id=action.payload;
            const noteToTrash=state.notes.find((note)=>note.id===id);
            if (noteToTrash){
                state.trashedNotes.push(noteToTrash);
                state.notes=state.notes.filter((note)=>note.id !==id);
            }
        },
        // restore note
        restoreNote: (state, action) => {
            const noteIndex = state.trashedNotes.findIndex(note => note.id === action.payload);
            if (noteIndex !== -1) {
              const restoredNote = state.trashedNotes[noteIndex];
          
              // Add it back to `notes`
              state.notes.push(restoredNote);
          
              // Remove from `trashedNotes`
              state.trashedNotes.splice(noteIndex, 1);
            }
          },
          
        // Permanent Delete
        permanentDeleteNote:(state,action)=>{
            state.trashedNotes=state.trashedNotes.filter((note)=>note.id !==action.payload);
        },

        // Edit Note
        editNote:(state,action)=>{
            const {id,updatedTitle,updateContent,updatedImage}=action.payload;
            const note=state.notes.find((note)=>note.id===id);
            if (note){
                note.title=updatedTitle;
                note.Content=updateContent;
                note.image=updatedImage;
                note.lastEdited=new Date().toLocaleTimeString();
            }
        },

        // pin note
        pinNote:(state,action)=>{
            const note=state.notes.find((note)=>note.id===action.payload)
            if (note){
                note.isPinned= !note.isPinned;
            }
        },

        // archive note
        archivedNote:(state,action)=>{
            const id =action.payload;
            const  noteToArchive=state.notes.find((note)=>note.id===id);
            if (noteToArchive){
                state.archivedNotes.push(noteToArchive);
                state.notes=state.notes.filter((note)=>note.id !==id)
            }
        },

        // unarchive note
        UnarchiveNote:(state,action)=>{
            const id=action.payload;
            const noteToUnarchive=state.archivedNotes.find((note)=>note.id===id);
            if (noteToUnarchive){
                state.notes.push(noteToUnarchive);
                state.archivedNotes=state.archivedNotes.filte((note)=>note.id !==id);
            }
        },

        // copy a note
        copyNote:(state,action)=>{
            const originalNote=state.notes.find((note)=>note.id===action.payload);
            if (originalNote){
                state.notes.push({
                    ...originalNote,
                    id:uuidv4(),
                    lastEdited:null
                })
            }
        },

        // Add Label
        addLabel:(state,action)=>{
            if (!state.labels.includes(action.payload)){
                state.labels.push(action.payload)
            }
        },
        
        // Delete Label
        deleteLabel:(state,action)=>{
            state.labels=state.labels.filter((label)=>label !==action.payload)
        },

        // Search Query
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload
        },
    }

})
export const {
    addNote,
    addReminderNote,
    deleteNote,
    restoreNote,
    permanentDeleteNote,
    editNote,
    pinNote,
    archiveNote,
    UnarchiveNote,
    addLabel,
    deleteLabel,
    copyNote,
    setSearchQuery
}=NotesSlice.actions;

export default NotesSlice.reducer;