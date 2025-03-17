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
        labels: action.payload.labels || [],
        isPinned: action.payload.isPinned || false,
        isArchived: action.payload.isArchived || false,
      };
    
      // Always store the note in `state.notes` so it appears in UI
      state.notes.push(newNote);
    
      // If the note has labels, add it under each label
      if (newNote.labels.length > 0) {
        newNote.labels.forEach((label) => {
          if (!state.labels[label]) {
            state.labels[label] = []; // Create label array if not exists
          }
          state.labels[label].push(newNote); // Store note under correct label
        });
      }
    },
    updateNote: (state, action) => {
      const { id, title, content } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }
    },
    

    // addReminderNote: (state, action) => {
    //   state.reminderNotes.push({
    //     ...action.payload,
    //     id: uuidv4(),
    //     isReminder: action.payload.reminderTime || new Date().toLocaleString(),
    //   });
    // },
    addReminderNote: (state, action) => {
      const newReminderNote = {
        ...action.payload,
        id: uuidv4(),
        isReminder: true,  // Boolean flag to indicate it’s a reminder
        reminderTime: action.payload.reminderTime || new Date().toLocaleString(),
      };
    
      // Add to main notes list to ensure visibility everywhere
      state.notes.push(newReminderNote);
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
        state.archivedNotes = [...state.archivedNotes, { ...noteToArchive, isArchived: true }];
        state.notes = state.notes.filter((note) => note.id !== id);
      }
    },

    // Unarchive note
    UnarchiveNote: (state, action) => {
      const id = action.payload;
      const noteIndex = state.archivedNotes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        const noteToUnarchive = { ...state.archivedNotes[noteIndex], isArchived: false };
        
        // ✅ Correctly update Redux state immutably
        state.notes = [...state.notes, noteToUnarchive];
        state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id);
      }
    },

    // deleteNote: (state, action) => {
    //   const id = action.payload;
    //   state.notes = state.notes.filter((note) => note.id !== id);
    //   state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id);
    // },

    // copy a note
    copyNote: (state, action) => {
      const { id, title, content, labels } = action.payload;
    
      const newNote = {
        id: uuidv4(), // Generate a new unique ID
        title,
        content,
        isPinned: false,
        isArchived: false,
        labels: labels ? [...labels] : [], // Ensure labels are copied
      };
    
      state.notes.push(newNote);
      if (newNote.labels.length > 0) {
        newNote.labels.forEach((label) => {
        if (!state.labels[label]) {
        state.labels[label] = [];
        }
        state.labels[label].push(newNote);
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
      
      // Find the note
      const note = state.notes.find((note) => note.id === noteId) || 
                   state.archivedNotes.find((note) => note.id === noteId);
    
      if (note) {
        const copiedNote = { ...note, id: uuidv4() }; // Create a new copy with a new ID
    
        // Add the copied note to the label
        if (!state.labels[label]) {
          state.labels[label] = [];
        }
        state.labels[label].push(copiedNote);
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
  copyNoteToLabel,
  setSearchQuery,
  updateNote
} = NotesSlice.actions;

export default NotesSlice.reducer;