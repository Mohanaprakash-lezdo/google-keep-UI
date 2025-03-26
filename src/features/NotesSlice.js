import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notes: [],
  trashedNotes: [],
  archivedNotes: [],
  labels: {},
  reminderNotes: [],
  searchQuery: "",
  userId: null,
};

const NotesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // Clear state on logout
    clearUser: (state) => {
      state.userId = null;  
    },
   

   
    // addNote: (state, action) => {
    //   const newNote = {
    //     id: uuidv4(),
    //     title: action.payload.title || "",
    //     content: action.payload.content || "",
    //     labels: action.payload.labels || [],
    //     isPinned: action.payload.isPinned || false,
    //     isArchived: action.payload.isArchived || false,
    //   };
    
    //   // Ensure notes are stored in an array
    //   if (!Array.isArray(state.notes)) {
    //     state.notes = []; // Initialize as an array if undefined
    //   }
    
    //   // Store note globally in `state.notes`
    //   state.notes.push(newNote);
    
    //   // Ensure labeled notes are stored correctly under each assigned label
    //   newNote.labels.forEach((label) => {
    //     if (!state.labels[label]) {
    //       state.labels[label] = []; // Create label array if not exists
    //     }
    //     state.labels[label].push(newNote);
    //   });
    // },
    
    addNote: (state, action) => {
      const newNote = {
        id: uuidv4(),
        title: action.payload.title || "",
        content: action.payload.content || "",
        image: action.payload.image || "", // Ensure image support
        labels: action.payload.labels || [],
        isPinned: action.payload.isPinned || false,
        isArchived: action.payload.isArchived || false,
      };
    
      // Ensure notes are initialized as an array
      if (!Array.isArray(state.notes)) {
        state.notes = [];
      }
    
      // **🔹 Update Redux State Properly**
      state.notes = [...state.notes, newNote]; // Ensure new array reference
    
      // **🔹 Ensure labels exist and update correctly**
      newNote.labels.forEach((label) => {
        if (!state.labels[label]) {
          state.labels[label] = [];
        }
        state.labels[label] = [...state.labels[label], newNote]; // Spread for immutability
      });
    },
    
    updateNote: (state, action) => {
      const { id, title, content } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }
    },
   
    addReminderNote: (state, action) => {
      const newReminderNote = {
        ...action.payload,
        id: uuidv4(),
        isReminder: true, // Boolean flag to indicate it’s a reminder
        reminderTime:
          action.payload.reminderTime || new Date().toLocaleString(),
      };

      // Add to main notes list to ensure visibility everywhere
      // state.notes.push(newReminderNote);
      state.reminderNotes.push(newReminderNote); 
    },
    
    deleteNote: (state, action) => {
      const id = action.payload;
    
      // Find the note in all possible locations
      let noteToTrash =
        state.notes.find((note) => note.id === id) ||
        state.archivedNotes.find((note) => note.id === id) ||
        Object.values(state.labels || {}).flat().find((note) => note.id === id);
    
      if (noteToTrash) {
        // Move the note to Trash
        state.trashedNotes.push({
          ...noteToTrash,
          deletedFromArchive: state.archivedNotes.some((n) => n.id === id),
          deleteLabel: noteToTrash.labels ? [...noteToTrash.labels] : [],
        });
    
        // Remove note from `notes`
        state.notes = state.notes.filter((note) => note.id !== id);
    
        // Remove note from `archivedNotes`
        state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id);
    
        // Remove note from `labels`
        Object.keys(state.labels || {}).forEach((label) => {
          state.labels[label] = state.labels[label].filter((note) => note.id !== id);
        });
    
        console.log(` Note with ID ${id} moved to Trash.`);
      } else {
        console.warn(` Note with ID ${id} not found!`);
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
            `Label(s) ${missingLabels.join(
              ", "
            )} have been deleted!\nDo you want to move this note to the Home page?`
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
      const { id, updatedTitle, updatedContent, updatedImage } = action.payload;
      
      state.notes = state.notes.map(note =>
        note.id === id
          ? {
              ...note,
              title: updatedTitle,
              content: updatedContent, // Fixed typo
              image: updatedImage,
              lastEdited: new Date().toLocaleTimeString(),
            }
          : note
      );
    },
    

    // pin note
    // pinNote: (state, action) => {
    //   const note = state.notes.find((note) => note.id === action.payload);
    //   if (note) {
    //     note.isPinned = !note.isPinned;
    //   }
    // },
    // unpinNote: (state, action) => {
    //   const note = state.notes.find((note) => note.id === action.payload);
    //   if (note) {
    //     note.isPinned = false;
    //   }
    // },
    pinNote: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        note.isPinned = true; // ✅ Set pinned to true
      }
    },
    unpinNote: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        note.isPinned = false; // ✅ Set pinned to false
      }
    },
   
    
    archiveNote: (state, action) => {
      const id = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
    
      if (noteIndex !== -1) {
        const archivedNote = { ...state.notes[noteIndex], isArchived: true };
        state.archivedNotes.push(archivedNote);
        state.notes = state.notes.filter((note) => note.id !== id);
      }
    
      // ✅ Remove from label lists if it belongs to any label
      Object.keys(state.labels).forEach(label => {
        state.labels[label] = state.labels[label].filter(note => note.id !== id);
      });
    },
    
   
   
    
    UnarchiveNote: (state, action) => {
      const noteId = action.payload;
      
      // ✅ Find note in archivedNotes
      const noteIndex = state.archivedNotes.findIndex((note) => note.id === noteId);
      
      if (noteIndex !== -1) {
        // ✅ Restore note and remove from archive
        const restoredNote = { ...state.archivedNotes[noteIndex], isArchived: false };
        state.notes.push(restoredNote); // Move it back to notes
        state.archivedNotes.splice(noteIndex, 1); // Remove from archive
      } else {
        console.error(`❌ Note ID ${noteId} not found in archivedNotes`);
      }
    },
    
    
    
    copyNote: (state, action) => {
      const originalNote = action.payload;
      console.log("📌 Original Note:", originalNote);
    
      // Create a new copy of the note with a unique ID
      const copiedNote = {
        ...originalNote,
        id: uuidv4(), // Generate a new ID
        labels: [...(originalNote.labels || [])], // Preserve labels
      };
    
      console.log("📋 Copied Note Before Adding:", copiedNote);
    
      if (copiedNote.labels.length > 0) {
        copiedNote.labels.forEach((label) => {
          if (!state.labels[label]) {
            state.labels[label] = []; // Ensure label array exists
          }
          state.labels[label].push(copiedNote); // ✅ Add copied note to the correct label
        });
      } else {
        state.notes.push(copiedNote); // ✅ Only add to Home if it has no labels
      }
    
      console.log("📂 Updated Labels State:", JSON.parse(JSON.stringify(state.labels)));
      console.log("🏠 Updated Notes (Home):", state.notes);
    },
   

    // copyNote: (state, action) => {
    //   const { note, labelName } = action.payload;
    //   if (!note) return;
    
    //   const copiedNote = {
    //     ...note,
    //     id: crypto.randomUUID(), // ✅ Ensure unique ID
    //   };
    
    //   console.log("📝 Copying Note:", copiedNote);
    
    //   if (labelName && state.labels[labelName]) {
    //     state.labels[labelName] = [...state.labels[labelName], copiedNote];
    //     console.log(`📂 Copied to Label: ${labelName}`, state.labels[labelName]);
    //   } else {
    //     state.notes.push(copiedNote);
    //     console.log("🏠 Copied to Home Notes:", state.notes);
    //   }
    
    //   console.log("🔍 Redux State After Copying:", JSON.stringify(state, null, 2));
    // },
    
    
    
    
    
    addLabel: (state, action) => {
      const labelName = action.payload.trim();
      if (labelName && !state.labels[labelName]) {
        state.labels[labelName] = [];
      }
    },

    // Delete Label
    deleteLabel: (state, action) => {
      const label = action.payload;
      if (state.labels[label]) {
        delete state.labels[label];
      }
    },

    // Add Note to Specific Label
    addNoteToLabel: (state, action) => {
      const { label, noteId } = action.payload;
      if (state.labels[label]) {
        state.labels[label] = state.labels[label].filter(
          (note) => note.id !== noteId
        );
      }
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
      const note =
        state.notes.find((note) => note.id === noteId) ||
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
      state.searchQuery = action.payload.toLowerCase();
    },
  },
});
export const selectFilteredNotes = (state) => {
  const query = state.notes.searchQuery.toLowerCase();
  if (!query) return state.notes.notes; // Return all notes if no search query

  return state.notes.notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
  );
};
export const {
  addNote,
  addReminderNote,
  deleteNote,
  restoreNote,
  permanentDeleteNote,
  editNote,
  pinNote,
  unpinNote,
  archiveNote,
  UnarchiveNote,
  addLabel,
  deleteLabel,
  copyNote,
  copyNoteToLabel,
  setSearchQuery,
  updateNote,
} = NotesSlice.actions;

export default NotesSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

// const initialState = {
//   notes: [],
//   trashedNotes: [],
//   archivedNotes: [],
//   labels: {},
//   reminderNotes: [],
//   searchQuery: "",
//   userId: null, // Track the currently logged-in user
// };

// const NotesSlice = createSlice({
//   name: "notes",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.userId = action.payload; // Set user ID when logging in
//     },

//     clearUser: (state) => {
//       return { ...initialState, userId: null }; // Reset state on logout
//     },

//     addNote: (state, action) => {
//       if (!state.userId) return; // Ensure user is logged in

//       const newNote = {
//         id: uuidv4(),
//         title: action.payload.title || "",
//         content: action.payload.content || "",
//         labels: action.payload.labels || [],
//         isPinned: action.payload.isPinned || false,
//         isArchived: action.payload.isArchived || false,
//         userId: state.userId, // Attach note to user
//       };

//       state.notes.push(newNote);

//       newNote.labels.forEach((label) => {
//         if (!state.labels[label]) {
//           state.labels[label] = [];
//         }
//         state.labels[label].push(newNote);
//       });
//     },

//     updateNote: (state, action) => {
//       const { id, title, content } = action.payload;
//       const note = state.notes.find((note) => note.id === id && note.userId === state.userId);
//       if (note) {
//         note.title = title;
//         note.content = content;
//       }
//     },

//     deleteNote: (state, action) => {
//       const id = action.payload;
//       let noteToTrash =
//         state.notes.find((note) => note.id === id && note.userId === state.userId) ||
//         state.archivedNotes.find((note) => note.id === id && note.userId === state.userId);

//       if (noteToTrash) {
//         state.trashedNotes.push({
//           ...noteToTrash,
//           deletedFromArchive: state.archivedNotes.some((n) => n.id === id),
//           deleteLabel: noteToTrash.labels ? [...noteToTrash.labels] : [],
//         });

//         state.notes = state.notes.filter((note) => !(note.id === id && note.userId === state.userId));
//         state.archivedNotes = state.archivedNotes.filter((note) => !(note.id === id && note.userId === state.userId));
//         Object.keys(state.labels || {}).forEach((label) => {
//           state.labels[label] = state.labels[label].filter((note) => !(note.id === id && note.userId === state.userId));
//         });
//       }
//     },

//     restoreNote: (state, action) => {
//       const noteIndex = state.trashedNotes.findIndex(
//         (note) => note.id === action.payload && note.userId === state.userId
//       );

//       if (noteIndex !== -1) {
//         const restoredNote = state.trashedNotes[noteIndex];
//         const noteLabels = restoredNote.labels || [];
//         const missingLabels = noteLabels.filter((label) => !state.labels[label]);

//         if (missingLabels.length > 0) {
//           const userConfirmed = window.confirm(
//             `Label(s) ${missingLabels.join(", ")} have been deleted!\nDo you want to move this note to the Home page?`
//           );

//           if (!userConfirmed) {
//             return;
//           }
//           restoredNote.labels = [];
//         } else {
//           restoredNote.labels.forEach((label) => {
//             if (state.labels[label]) {
//               state.labels[label].push(restoredNote);
//             }
//           });
//         }

//         if (restoredNote.deletedFromArchive) {
//           state.archivedNotes.push({ ...restoredNote, isArchived: true });
//         } else {
//           state.notes.push({ ...restoredNote, isArchived: false });
//         }
//         state.trashedNotes.splice(noteIndex, 1);
//       }
//     },

//     archiveNote: (state, action) => {
//       const id = action.payload;
//       let noteToArchive = state.notes.find((note) => note.id === id && note.userId === state.userId);

//       if (noteToArchive) {
//         const updatedNote = { ...noteToArchive, isArchived: true };
//         state.archivedNotes.push(updatedNote);
//         state.notes = state.notes.filter((note) => !(note.id === id && note.userId === state.userId));
//       }
//     },

//     unarchiveNote: (state, action) => {
//       const id = action.payload;
//       let noteToRestore = state.archivedNotes.find((note) => note.id === id && note.userId === state.userId);

//       if (noteToRestore) {
//         const updatedNote = { ...noteToRestore, isArchived: false };

//         if (noteToRestore.labels?.length) {
//           noteToRestore.labels.forEach((label) => {
//             if (state.labels[label]) {
//               state.labels[label].push(updatedNote);
//             }
//           });
//         } else {
//           state.notes.push(updatedNote);
//         }

//         state.archivedNotes = state.archivedNotes.filter((note) => !(note.id === id && note.userId === state.userId));
//       }
//     },

//     copyNote: (state, action) => {
//       const originalNote = action.payload;
//       const copiedNote = {
//         ...originalNote,
//         id: uuidv4(),
//         userId: state.userId, // Attach to the logged-in user
//       };

//       state.notes.push(copiedNote);

//       copiedNote.labels.forEach((label) => {
//         if (!state.labels[label]) {
//           state.labels[label] = [];
//         }
//         state.labels[label].push(copiedNote);
//       });
//     },

//     addLabel: (state, action) => {
//       const labelName = action.payload.trim();
//       if (labelName && !state.labels[labelName]) {
//         state.labels[labelName] = [];
//       }
//     },

//     deleteLabel: (state, action) => {
//       const label = action.payload;
//       if (state.labels[label]) {
//         delete state.labels[label];
//       }
//     },

//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     //     // Permanent Delete
//     permanentDeleteNote: (state, action) => {
//       state.trashedNotes = state.trashedNotes.filter(
//         (note) => note.id !== action.payload
//       );
//       state.reminderNotes = state.reminderNotes.filter(
//         (note) => note.id !== action.payload
//       );
//     },
//     //     // pin note
//     pinNote: (state, action) => {
//       const note = state.notes.find((note) => note.id === action.payload);
//       if (note) {
//         note.isPinned = !note.isPinned;
//       }
//     },
//     // Edit Note
//     editNote: (state, action) => {
//       const { id, updatedTitle, updateContent, updatedImage } = action.payload;
//       const note = state.notes.find((note) => note.id === id);
//       if (note) {
//         note.title = updatedTitle;
//         note.Content = updateContent;
//         note.image = updatedImage;
//         note.lastEdited = new Date().toLocaleTimeString();
//       }
//     },
//     //     addReminderNote: (state, action) => {
// //       const newReminderNote = {
// //         ...action.payload,
// //         id: uuidv4(),
// //         isReminder: true, // Boolean flag to indicate it’s a reminder
// //         reminderTime:
// //           action.payload.reminderTime || new Date().toLocaleString(),
// //       };

// //       // Add to main notes list to ensure visibility everywhere
// //       state.notes.push(newReminderNote);
// //     },
//     addReminderNote: (state, action) => {
//       const newReminderNote = {
//         ...action.payload,
//         id: uuidv4(),
//         isReminder: true, // Boolean flag to indicate it’s a reminder
//         reminderTime:
//           action.payload.reminderTime || new Date().toLocaleString(),
//       };

//       // Add to main notes list to ensure visibility everywhere
//       state.notes.push(newReminderNote);
//     },


//   },
// });

// export const {
//   setUser,
//   clearUser,
//   addNote,
//   deleteNote,
//   restoreNote,
//   archiveNote,
//   unarchiveNote,
//   copyNote,
//   addLabel,
//   deleteLabel,
//   setSearchQuery,
//   updateNote,
//   permanentDeleteNote,
//   pinNote,
//   editNote,
//   addReminderNote
// } = NotesSlice.actions;

// export default NotesSlice.reducer;
