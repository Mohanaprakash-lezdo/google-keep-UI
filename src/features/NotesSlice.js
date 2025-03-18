import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notes: {},
  trashedNotes: [],
  archivedNotes: [],
  labels: {},
  reminderNotes: [],
  searchQuery: "",
  userId: null
};

const NotesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // add note
    // addNote: (state, action) => {
    //   const newNote = {
    //     id: uuidv4(),
    //     title: action.payload.title || "",
    //     content: action.payload.content || "",
    //     labels: action.payload.labels || [],
    //     isPinned: action.payload.isPinned || false,
    //     isArchived: action.payload.isArchived || false,
    //   };
    
    //   // Always store the note in `state.notes` so it appears in UI
    //   state.notes.push(newNote);
    
    //   // If the note has labels, add it under each label
    //   if (newNote.labels.length > 0) {
    //     newNote.labels.forEach((label) => {
    //       if (!state.labels[label]) {
    //         state.labels[label] = []; // Create label array if not exists
    //       }
    //       state.labels[label].push(newNote); // Store note under correct label
    //     });
    //   }
    // },
    // addNote: (state, action) => {
    //   const newNote = {
    //     id: uuidv4(),
    //     title: action.payload.title || "",
    //     content: action.payload.content || "",
    //     labels: action.payload.labels || [],
    //     isPinned: action.payload.isPinned || false,
    //     isArchived: action.payload.isArchived || false,
    //   };
    
    //   // Store note in `state.notes` only if it has NO labels (for Home page)
    //   if (newNote.labels.length === 0) {
    //     state.notes.push(newNote);
    //   }
    
    //   // Store note under each assigned label
    //   newNote.labels.forEach((label) => {
    //     if (!state.labels[label]) {
    //       state.labels[label] = []; // Create array for label if not exists
    //     }
    //     state.labels[label].push(newNote);
    //   });
    // },
    // addNote: (state, action) => {
    //   const newNote = {
    //     id: uuidv4(),
    //     title: action.payload.title || "",
    //     content: action.payload.content || "",
    //     labels: action.payload.labels || [],  //  Ensure labels are assigned
    //     isPinned: action.payload.isPinned || false,
    //     isArchived: action.payload.isArchived || false,
    //   };
    
    //   //  Store note globally
    //   state.notes.push(newNote);
    
    //   //  Ensure labeled notes are stored under the correct label
    //   newNote.labels.forEach((label) => {
    //     if (!state.labels[label]) {
    //       state.labels[label] = []; // Create label array if not exists
    //     }
    //     state.labels[label].push(newNote);
    //   });
    // },
    setUser: (state, action) => {
      const newUserId = action.payload;
    
      // If the user is switching accounts, reset the state
      if (state.userId !== newUserId) {
        state.notes = {};          // Clear previous user's notes
        state.trashedNotes = {};   // Clear trash notes
        state.archivedNotes = {};  // Clear archived notes
        state.labels = {};         // Clear labels
        state.reminderNotes = {};  // Clear reminders
      }
    
      state.userId = newUserId;
    
      // Ensure the new user has their data initialized
      if (!state.notes[state.userId]) {
        state.notes[state.userId] = [];
        state.trashedNotes[state.userId] = [];
        state.archivedNotes[state.userId] = [];
        state.labels[state.userId] = {};
        state.reminderNotes[state.userId] = [];
      }
    },
    
    // Clear state on logout
    clearUser: (state) => {
      state.userId = null;
    },


    // addNote: (state, action) => {
    //   const newNote = {
    //     id: uuidv4(),
    //     title: action.payload.title || "",
    //     content: action.payload.content || "",
    //     labels: action.payload.labels || [],  //  Ensure labels are properly assigned
    //     isPinned: action.payload.isPinned || false,
    //     isArchived: action.payload.isArchived || false,
    //   };
    
    //   // Always store in `state.notes`
    //   state.notes.push(newNote);
    
    //   //Ensure labeled notes are added under their correct label
    //   if (newNote.labels.length > 0) {
    //     newNote.labels.forEach((label) => {
    //       if (!state.labels[label]) {
    //         state.labels[label] = []; // Create label array if not exists
    //       }
    //       state.labels[label].push(newNote);
    //     });
    //   }
    // },
     // Add a new note
     addNote: (state, action) => {
      if (!state.userId) return; // Ensure user is logged in
    
      // Initialize user-specific notes if they don't exist
      if (!state.notes[state.userId]) {
        state.notes[state.userId] = [];
      }
    
      // Create new note
      const newNote = {
        id: uuidv4(),
        userId: state.userId,
        title: action.payload.title || "",
        content: action.payload.content || "",
        labels: action.payload.labels || [],
        isPinned: action.payload.isPinned || false,
        isArchived: action.payload.isArchived || false,
      };
    
      // ✅ Properly update the state while ensuring immutability
      state.notes[state.userId] = {...state.notes,
        [state.userId]:[...NotesSlice(state.notes[state.userId] || []),newNote] };
    
      // ✅ Handle labels: Store note under its assigned labels
      newNote.labels.forEach((label) => {
        if (!state.labels[state.userId]) {
          state.labels[state.userId] = {}; // Ensure labels exist for the user
        }
        if (!state.labels[state.userId][label]) {
          state.labels[state.userId][label] = []; // Ensure label category exists
        }
        state.labels[state.userId][label].push(newNote);
      });
    },
    
    
    
    
    // updateNote: (state, action) => {
    //   const { id, title, content } = action.payload;
    //   const note = state.notes.find((note) => note.id === id);
    //   if (note) {
    //     note.title = title;
    //     note.content = content;
    //   }
    // },
    updateNote: (state, action) => {
      const { id, title, content, userId } = action.payload;
      const note = state.notes.find((note) => note.id === id && note.userId === userId);
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
    // addReminderNote: (state, action) => {
    //   const newReminderNote = {
    //     ...action.payload,
    //     id: uuidv4(),
    //     isReminder: true,  // Boolean flag to indicate it’s a reminder
    //     reminderTime: action.payload.reminderTime || new Date().toLocaleString(),
    //   };
    
    //   // Add to main notes list to ensure visibility everywhere
    //   state.notes.push(newReminderNote);
    // },
    addReminderNote: (state, action) => {
      const { userId, reminderTime, ...rest } = action.payload;
      
      const newReminderNote = {
        ...rest,
        id: uuidv4(),
        userId, // Associate the note with a specific user
        isReminder: true,
        reminderTime: reminderTime || new Date().toLocaleString(),
      };
    
      // Ensure the note is added only for the logged-in user
      state.notes.push(newReminderNote);
    },
    
    
    
    // delete note
    // deleteNote: (state, action) => {
    //   const id = action.payload;
    //   let noteToTrash =
    //     state.notes.find((note) => note.id === id) ||
    //     state.archivedNotes.find((note) => note.id === id)||
    //     Object.values(state.labels).flat()
    //     .find((note)=>note.id ===id);

    //   if (noteToTrash) {
    //     state.trashedNotes.push({
    //       ...noteToTrash,
    //       deletedFromArchive: !!state.archivedNotes.find((n) => n.id === id),
    //       deleteLabel:noteToTrash.labels || [], 
    //       // store labels  before deleting
    //     });

    //     state.notes = state.notes.filter((note) => note.id !== id);
    //     state.archivedNotes = state.archivedNotes.filter(
    //       (note) => note.id !== id
    //     );

    //     // Remove from labels
    //     Object.keys(state.labels).forEach((label)=>{
    //       state.labels[label]=state.labels[label].filter(
    //         (note)=>note.id !==id
    //       )
    //     })
    //   }
    // },
    deleteNote: (state, action) => {
      if (!state.userId) return;
      const id = action.payload;
      let noteToTrash =
        state.notes[state.userId]?.find((note) => note.id === id) ||
        state.archivedNotes[state.userId]?.find((note) => note.id === id) ||
        Object.values(state.labels[state.userId] || {}).flat()
        .find((note) => note.id === id);
    
      if (noteToTrash) {
        state.trashedNotes[state.userId].push({
          ...noteToTrash,
          deletedFromArchive: !!state.archivedNotes[state.userId]?.find((n) => n.id === id),
          deleteLabel: noteToTrash.labels || [],
        });
    
        state.notes[state.userId] = state.notes[state.userId]?.filter((note) => note.id !== id) || [];
        state.archivedNotes[state.userId] = state.archivedNotes[state.userId]?.filter(
          (note) => note.id !== id
        ) || [];
    
        Object.keys(state.labels[state.userId] || {}).forEach((label) => {
          state.labels[state.userId][label] = state.labels[state.userId][label]?.filter(
            (note) => note.id !== id
          ) || [];
        });
      }
    },
    
    // restoreNote: (state, action) => {
    //   const noteIndex = state.trashedNotes.findIndex(
    //     (note) => note.id === action.payload
    //   );
    
    //   if (noteIndex !== -1) {
    //     const restoredNote = state.trashedNotes[noteIndex];
    
    //     //  Ensure labels exist
    //     const noteLabels = restoredNote.labels || []; 
    
    //     //  Find missing labels
    //     const missingLabels = noteLabels.filter(
    //       (label) => !state.labels[label]
    //     );
    
    //     if (missingLabels.length > 0) {
    //       const userConfirmed = window.confirm(
    //         `Label(s) ${missingLabels.join(", ")} have been deleted!\nDo you want to move this note to the Home page?`
    //       );
    
    //       if (!userConfirmed) {
    //         return; 
    //         // Keep note in Trash if user cancels
    //       }
    
    //       restoredNote.labels = []; 
    //       //  Remove deleted labels before restoring
    //     } else {
    //       //  Restore under existing labels
    //       restoredNote.labels.forEach((label) => {
    //         if (state.labels[label]) {
    //           state.labels[label].push(restoredNote);
    //         }
    //       });
    //     }
    
    //     // Restore to correct location (Home or Archive)
    //     if (restoredNote.deletedFromArchive) {
    //       state.archivedNotes.push({ ...restoredNote, isArchived: true });
    //     } else {
    //       state.notes.push({ ...restoredNote, isArchived: false });
    //     }
    //     state.trashedNotes.splice(noteIndex, 1);
    //   }
    // },

    restoreNote: (state, action) => {
      const { noteId, userId } = action.payload;
    
      // Find the note in Trash that belongs to the current user
      const noteIndex = state.trashedNotes.findIndex(
        (note) => note.id === noteId && note.userId === userId
      );
    
      if (noteIndex !== -1) {
        const restoredNote = state.trashedNotes[noteIndex];
    
        // Ensure labels exist
        const noteLabels = restoredNote.labels || [];
    
        // Find missing labels
        const missingLabels = noteLabels.filter(
          (label) => !state.labels[label]
        );
    
        if (missingLabels.length > 0) {
          const userConfirmed = window.confirm(
            `Label(s) ${missingLabels.join(", ")} have been deleted!\nDo you want to move this note to the Home page?`
          );
    
          if (!userConfirmed) {
            return; // Keep the note in Trash if the user cancels
          }
    
          restoredNote.labels = []; // Remove deleted labels before restoring
        } else {
          // Restore under existing labels for the current user
          restoredNote.labels.forEach((label) => {
            if (state.labels[label]) {
              state.labels[label].push(restoredNote);
            }
          });
        }
    
        // Restore to correct location (Home or Archive) while preserving user association
        if (restoredNote.deletedFromArchive) {
          state.archivedNotes.push({ ...restoredNote, isArchived: true, userId });
        } else {
          state.notes.push({ ...restoredNote, isArchived: false, userId });
        }
    
        // Remove from Trash
        state.trashedNotes.splice(noteIndex, 1);
      }
    },
    
    // Permanent Delete 
    // permanentDeleteNote: (state, action) => {
    //   state.trashedNotes = state.trashedNotes.filter(
    //     (note) => note.id !== action.payload
    //   );
    //   state.reminderNotes = state.reminderNotes.filter(
    //     (note) => note.id !== action.payload
    //   );
    // },
    permanentDeleteNote: (state, action) => {
      const { noteId, userId } = action.payload;
    
      // Permanently delete the note from the trash for the current user
      state.trashedNotes = state.trashedNotes.filter(
        (note) => !(note.id === noteId && note.userId === userId)
      );
    
      // Permanently delete the note from reminderNotes if it exists for the current user
      state.reminderNotes = state.reminderNotes.filter(
        (note) => !(note.id === noteId && note.userId === userId)
      );
    },
    

    // Edit Note
    // editNote: (state, action) => {
    //   const { id, updatedTitle, updateContent, updatedImage } = action.payload;
    //   const note = state.notes.find((note) => note.id === id);
    //   if (note) {
    //     note.title = updatedTitle;
    //     note.Content = updateContent;
    //     note.image = updatedImage;
    //     note.lastEdited = new Date().toLocaleTimeString();
    //   }
    // },
    editNote: (state, action) => {
      const { id, userId, updatedTitle, updatedContent, updatedImage } = action.payload;
    
      // Find the note that matches both ID and userId
      const note = state.notes.find((note) => note.id === id && note.userId === userId);
    
      if (note) {
        note.title = updatedTitle;
        note.content = updatedContent;  // Fixed incorrect capitalization of "content"
        note.image = updatedImage;
        note.lastEdited = new Date().toLocaleTimeString();
      }
    },
    

    // pin note
    // pinNote: (state, action) => {
    //   const note = state.notes.find((note) => note.id === action.payload);
    //   if (note) {
    //     note.isPinned = !note.isPinned;
    //   }
    // },
    pinNote: (state, action) => {
      const { noteId, userId } = action.payload;
    
      // Find the note that belongs to the logged-in user
      const note = state.notes.find(
        (note) => note.id === noteId && note.userId === userId
      );
    
      // Toggle the pinned state if the note exists and belongs to the current user
      if (note) {
        note.isPinned = !note.isPinned;
      }
    },
    

    // archive note
    // archiveNote: (state, action) => {
    //   const id = action.payload;
    //   const noteToArchive = state.notes.find((note) => note.id === id);
    //   if (noteToArchive) {
    //     state.archivedNotes = [...state.archivedNotes, { ...noteToArchive, isArchived: true }];
    //     state.notes = state.notes.filter((note) => note.id !== id);
    //   }
    // },
    archiveNote: (state, action) => {
      const { noteId, userId } = action.payload;
    
      // Find the note to archive, ensuring it belongs to the logged-in user
      const noteToArchive = state.notes.find(
        (note) => note.id === noteId && note.userId === userId
      );
    
      if (noteToArchive) {
        // Move the note to the archived notes list
        state.archivedNotes.push({ ...noteToArchive, isArchived: true });
    
        // Remove the note from the active notes list
        state.notes = state.notes.filter(
          (note) => !(note.id === noteId && note.userId === userId)
        );
      }
    },
    

    // Unarchive note
    // UnarchiveNote: (state, action) => {
    //   const id = action.payload;
    //   const noteIndex = state.archivedNotes.findIndex((note) => note.id === id);
    //   if (noteIndex !== -1) {
    //     const noteToUnarchive = { ...state.archivedNotes[noteIndex], isArchived: false };
        
    //     // Correctly update Redux state immutably
    //     state.notes = [...state.notes, noteToUnarchive];
    //     state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id);
    //   }
    // },
    unarchiveNote: (state, action) => {
      const { noteId, userId } = action.payload;
    
      const noteIndex = state.archivedNotes.findIndex(
        (note) => note.id === noteId && note.userId === userId
      );
    
      if (noteIndex !== -1) {
        const noteToUnarchive = { 
          ...state.archivedNotes[noteIndex], 
          isArchived: false 
        };
    
        // Add the note back to the user's notes list
        state.notes.push(noteToUnarchive);
    
        // Remove the note from the user's archived notes
        state.archivedNotes = state.archivedNotes.filter(
          (note) => !(note.id === noteId && note.userId === userId)
        );
      }
    },
    

    // deleteNote: (state, action) => {
    //   const id = action.payload;
    //   state.notes = state.notes.filter((note) => note.id !== id);
    //   state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id);
    // },

    // copy a note
    // copyNote: (state, action) => {
    //   const { id, title, content, labels } = action.payload;
    
    //   const newNote = {
    //     id: uuidv4(), // Generate a new unique ID
    //     title,
    //     content,
    //     isPinned: false,
    //     isArchived: false,
    //     labels: labels ? [...labels] : [], // Ensure labels are copied
    //   };
    
    //   state.notes.push(newNote);
    //   if (newNote.labels.length > 0) {
    //     newNote.labels.forEach((label) => {
    //     if (!state.labels[label]) {
    //     state.labels[label] = [];
    //     }
    //     state.labels[label].push(newNote);
    //     });
    //     }
    // },
    // copyNote: (state, action) => {
    //   const originalNote = action.payload;
    
    //   const copiedNote = {
    //     ...originalNote,
    //     id: uuidv4(), // Generate a new unique ID
    //     labels: [...(originalNote.labels || [])], // Ensure labels exist
    //   };
    
    //   // Add copied note to `state.notes`
    //   state.notes.push(copiedNote);
    
    //   // Ensure copied note is stored under correct labels
    //   copiedNote.labels.forEach((label) => {
    //     if (!state.labels[label]) {
    //       state.labels[label] = []; // Create label array if it doesn’t exist
    //     }
    //     state.labels[label] = [...state.labels[label], copiedNote]; // Add copied note under label
    //   });
    
    //   console.log(" Copied Note:", copiedNote);
    //   console.log("Updated Labels:", state.labels);
    // },
    
    
    copyNote: (state, action) => {
      const { note, userId } = action.payload;
    
      // Ensure the copied note belongs to the same user
      const copiedNote = {
        ...note,
        id: uuidv4(), // Generate a new unique ID
        userId, // Associate the copied note with the same user
        labels: [...(note.labels || [])], // Ensure labels exist
      };
    
      // Add copied note to `state.notes` for the specific user
      state.notes.push(copiedNote);
    
      // Ensure copied note is stored under correct labels for the same user
      copiedNote.labels.forEach((label) => {
        if (!state.labels[userId]) {
          state.labels[userId] = {}; // Ensure the user has a label object
        }
        if (!state.labels[userId][label]) {
          state.labels[userId][label] = []; // Create label array if it doesn’t exist
        }
        state.labels[userId][label].push(copiedNote); // Add copied note under the correct label
      });
    
      console.log("Copied Note:", copiedNote);
      console.log("Updated Labels:", state.labels);
    },
    
   
    // addLabel: (state, action) => {
    //   const labelName = action.payload.trim();
    //   if (labelName && !state.labels[labelName]) {
    //     state.labels[labelName] = [];
    //   }
    // },
    addLabel: (state, action) => {
      const { labelName, userId } = action.payload;
      const trimmedLabel = labelName.trim();
    
      if (!trimmedLabel) return; // Prevent empty labels
    
      // Ensure user-specific label storage
      if (!state.labels[userId]) {
        state.labels[userId] = {};
      }
    
      // Add the label only if it doesn't exist for the current user
      if (!state.labels[userId][trimmedLabel]) {
        state.labels[userId][trimmedLabel] = [];
      }
    },
    
    // Delete Label
    // deleteLabel: (state, action) => {
    //   const label=action.payload;
    //   if(state.labels[label]){
    //     delete state.labels[label];
    //   }  
    // },
    deleteLabel: (state, action) => {
      const { label, userId } = action.payload;
    
      // Ensure labels exist for the specific user before deleting
      if (state.labels[userId] && state.labels[userId][label]) {
        delete state.labels[userId][label];
    
        // Remove the label from all notes belonging to this user
        state.notes = state.notes.map((note) =>
          note.userId === userId
            ? { ...note, labels: note.labels.filter((lbl) => lbl !== label) }
            : note
        );
    
        // Also update archived and trashed notes
        state.archivedNotes = state.archivedNotes.map((note) =>
          note.userId === userId
            ? { ...note, labels: note.labels.filter((lbl) => lbl !== label) }
            : note
        );
    
        state.trashedNotes = state.trashedNotes.map((note) =>
          note.userId === userId
            ? { ...note, labels: note.labels.filter((lbl) => lbl !== label) }
            : note
        );
      }
    },
    

    // Add Note to Specific Label
    // addNoteToLabel: (state, action) => {
    //   const { label, noteId } = action.payload;
    //   if (state.labels[label]) {
    //     state.labels[label]=state.labels[label].filter(
    //       (note)=>note.id !==noteId,
    //     )
    //     };
    // },
    addNoteToLabel: (state, action) => {
      const { label, noteId, userId } = action.payload;
    
      // Ensure the label exists for the specific user
      if (state.labels[label]) {
        // Remove any existing instance of the note under this label (to prevent duplicates)
        state.labels[label] = state.labels[label].filter(
          (note) => !(note.id === noteId && note.userId === userId)
        );
    
        // Find the note from the user's main notes
        const noteToAdd = state.notes.find(
          (note) => note.id === noteId && note.userId === userId
        );
    
        if (noteToAdd) {
          // Add the note under this label for the user
          state.labels[label].push(noteToAdd);
        }
      }
    },
    
    
    // Delete Note from Specific Label
    // deleteNoteFromLabel: (state, action) => {
    //   const { label, noteId } = action.payload;
    //   if (state.labels[label]) {
    //     state.labels[label] = state.labels[label].filter(
    //       (note) => note.id !== noteId
    //     );
    //   }
    // },
    deleteNoteFromLabel: (state, action) => {
      const { label, noteId, userId } = action.payload;
    
      if (state.labels[label]) {
        state.labels[label] = state.labels[label].filter(
          (note) => !(note.id === noteId && note.userId === userId)
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