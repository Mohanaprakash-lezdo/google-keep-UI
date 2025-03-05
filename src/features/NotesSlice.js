import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notes: [],
  trashedNotes: [],
  archivedNotes: [],
  labels: {},
  reminderNotes: [],
  searchQuery: "",
};

const NotesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // add note
    addNote: (state, action) => {
      const newNote = {
        id: uuidv4(),
        title: action.payload.title || "",
        content: action.payload.content || "",
        labels: action.payload.labels || [], // Ensure labels array exists
        isPinned: action.payload.isPinned || false,
        isArchived: action.payload.isArchived || false,
      };
    
      if (action.payload.labels && action.payload.labels.length > 0) {
        // Store in correct label
        action.payload.labels.forEach((label) => {
          if (!state.labels[label]) {
            state.labels[label] = []; // Initialize array if missing
          }
          state.labels[label].push(newNote);
        });
    
        console.log(`✅ Note stored under label(s): ${newNote.labels}`);
      } else {
        //  Store in "Notes" if no label is provided
        state.notes.push(newNote);
        console.log("✅ Note stored in Notes:", newNote);
      }
    },
    
    

    addReminderNote: (state, action) => {
      state.reminderNotes.push({
        ...action.payload,
        id: uuidv4(),
        isReminder: action.payload.reminderTime || new Date().toLocaleString(),
      });
    },
    
    // delete note
    deleteNote: (state, action) => {
      const id = action.payload;
      let noteToTrash =
        state.notes.find((note) => note.id === id) ||
        state.archivedNotes.find((note) => note.id === id)||
        Object.values(state.labels).flat()
        .find((note)=>note.id ===id);

      if (noteToTrash) {
        state.trashedNotes.push({
          ...noteToTrash,
          deletedFromArchive: !!state.archivedNotes.find((n) => n.id === id),
          deleteLabel:noteToTrash.labels || [], 
          // store labels  before deleting
        });

        state.notes = state.notes.filter((note) => note.id !== id);
        state.archivedNotes = state.archivedNotes.filter(
          (note) => note.id !== id
        );

        // Remove from labels
        Object.keys(state.labels).forEach((label)=>{
          state.labels[label]=state.labels[label].filter(
            (note)=>note.id !==id
          )
        })
      }
    },
    restoreNote: (state, action) => {
      const noteIndex = state.trashedNotes.findIndex(
        (note) => note.id === action.payload
      );
    
      if (noteIndex !== -1) {
        const restoredNote = state.trashedNotes[noteIndex];
    
        //  Ensure labels exist
        const noteLabels = restoredNote.labels || []; 
    
        //  Find missing labels
        const missingLabels = noteLabels.filter(
          (label) => !state.labels[label]
        );
    
        if (missingLabels.length > 0) {
          const userConfirmed = window.confirm(
            `Label(s) ${missingLabels.join(", ")} have been deleted!\nDo you want to move this note to the Home page?`
          );
    
          if (!userConfirmed) {
            return; 
            // Keep note in Trash if user cancels
          }
    
          restoredNote.labels = []; 
          //  Remove deleted labels before restoring
        } else {
          //  Restore under existing labels
          restoredNote.labels.forEach((label) => {
            if (state.labels[label]) {
              state.labels[label].push(restoredNote);
            }
          });
        }
    
        // Restore to correct location (Home or Archive)
        if (restoredNote.deletedFromArchive) {
          state.archivedNotes.push({ ...restoredNote, isArchived: true });
        } else {
          state.notes.push({ ...restoredNote, isArchived: false });
        }
        state.trashedNotes.splice(noteIndex, 1);
      }
    },
    // Permanent Delete 
    permanentDeleteNote: (state, action) => {
      state.trashedNotes = state.trashedNotes.filter(
        (note) => note.id !== action.payload
      );
      state.reminderNotes = state.reminderNotes.filter(
        (note) => note.id !== action.payload
      );
    },

    // Edit Note
    editNote: (state, action) => {
      const { id, updatedTitle, updateContent, updatedImage } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.title = updatedTitle;
        note.Content = updateContent;
        note.image = updatedImage;
        note.lastEdited = new Date().toLocaleTimeString();
      }
    },

    // pin note
    pinNote: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
      }
    },

    // archive note
    archiveNote: (state, action) => {
      const id = action.payload;
      const noteToArchive = state.notes.find((note) => note.id === id);
      if (noteToArchive) {
        state.archivedNotes.push({ ...noteToArchive, isArchived: true });
        state.notes = state.notes.filter((note) => note.id !== id);
      }
    },

    // unarchive note
    UnarchiveNote: (state, action) => {
      const id = action.payload;
      const noteIndex = state.archivedNotes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        const noteToUnarchive = {
          ...state.archivedNotes[noteIndex],
          isArchived: false,
        };
        state.notes.push(noteToUnarchive);
        state.archivedNotes.splice(noteIndex, 1);
      }
    },

    // copy a note
    copyNote: (state, action) => {
      const originalNote = state.notes.find(
        (note) => note.id === action.payload
      );
      if (originalNote) {
        state.notes.push({
          ...originalNote,
          id: uuidv4(),
          lastEdited: null,
        });
      }
    },

   
    addLabel: (state, action) => {
      const labelName = action.payload.trim();
      if (labelName && !state.labels[labelName]) {
        state.labels[labelName] = [];
      }
    },

    // Delete Label
    deleteLabel: (state, action) => {
      const label=action.payload;
      if(state.labels[label]){
        delete state.labels[label];
      }  
    },

    // Add Note to Specific Label
    addNoteToLabel: (state, action) => {
      const { label, noteId } = action.payload;
      if (state.labels[label]) {
        state.labels[label]=state.labels[label].filter(
          (note)=>note.id !==noteId,
        )
        };
    },
    
    // Delete Note from Specific Label
    deleteNoteFromLabel: (state, action) => {
      const { label, noteId } = action.payload;
      if (state.labels[label]) {
        state.labels[label] = state.labels[label].filter(
          (note) => note.id !== noteId
        );
      }
    },
    copyNoteToLabel: (state, action) => {
      const { noteId, label } = action.payload;
      const noteToCopy = state.notes.find((note) => note.id === noteId);
    
      if (noteToCopy) {
        const newNote = { 
          ...noteToCopy, 
          id: uuidv4(), 
          labels: [...noteToCopy.labels, label] 
        };
    
        if (!state.labels[label]) {
          state.labels[label] = []; // Create the label if it doesn't exist
        }
    
        state.labels[label].push(newNote);
        console.log(`✅ Note copied to label: ${label}`);
      }
    },
    

    // Search Query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
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
  setSearchQuery,
} = NotesSlice.actions;

export default NotesSlice.reducer;
