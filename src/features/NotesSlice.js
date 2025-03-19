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
    // setUser: (state, action) => {
    //   state.userId = action.payload;
    // },

    // // Clear state on logout
    // clearUser: (state) => {
    //   state.userId = null;
    //   state.notes = [];
    //   state.trashedNotes = [];
    //   state.archivedNotes = [];
    //   state.labels = {};
    //   state.reminderNotes = [];
    // },

   
    addNote: (state, action) => {
      const newNote = {
        id: uuidv4(),
        title: action.payload.title || "",
        content: action.payload.content || "",
        labels: action.payload.labels || [],
        isPinned: action.payload.isPinned || false,
        isArchived: action.payload.isArchived || false,
      };
    
      // Ensure notes are stored in an array
      if (!Array.isArray(state.notes)) {
        state.notes = []; // Initialize as an array if undefined
      }
    
      // Store note globally in `state.notes`
      state.notes.push(newNote);
    
      // Ensure labeled notes are stored correctly under each assigned label
      newNote.labels.forEach((label) => {
        if (!state.labels[label]) {
          state.labels[label] = []; // Create label array if not exists
        }
        state.labels[label].push(newNote);
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
      state.notes.push(newReminderNote);
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
    
        console.log(`✅ Note with ID ${id} moved to Trash.`);
      } else {
        console.warn(`❌ Note with ID ${id} not found!`);
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

   
    archiveNote: (state, action) => {
      const id = action.payload;
    
      let noteToArchive =
        state.notes.find((note) => note.id === id) ||
        Object.values(state.labels).flat().find((note) => note.id === id);
    
      if (noteToArchive) {
        const updatedNote = { ...noteToArchive, isArchived: true };
    
        // Move note to archivedNotes
        state.archivedNotes.push(updatedNote);
    
        // Remove from notes
        state.notes = state.notes.filter((note) => note.id !== id);
    
        // Remove from labels
        Object.keys(state.labels).forEach((label) => {
          state.labels[label] = state.labels[label].filter((note) => note.id !== id);
        });
      }
    },
    
    
    // Unarchive note
    // UnarchiveNote: (state, action) => {
    //   const id = action.payload;
    //   const noteIndex = state.archivedNotes.findIndex((note) => note.id === id);
    //   if (noteIndex !== -1) {
    //     const noteToUnarchive = {
    //       ...state.archivedNotes[noteIndex],
    //       isArchived: false,
    //     };

    //     // Correctly update Redux state immutably
    //     state.notes = [...state.notes, noteToUnarchive];
    //     state.archivedNotes = state.archivedNotes.filter(
    //       (note) => note.id !== id
    //     );
    //   }
    // },
    // UnarchiveNote: (state, action) => {
    //   const id = action.payload;
    //   const noteIndex = state.archivedNotes.findIndex((note) => note.id === id);
    
    //   if (noteIndex !== -1) {
    //     const note = { ...state.archivedNotes[noteIndex], isArchived: false };
    
    //     // Move back to notes
    //     state.notes.push(note);
    
    //     // Remove from archive
    //     state.archivedNotes.splice(noteIndex, 1);
    //   }
    // },
    // UnarchiveNote: (state, action) => {
    //   const id = action.payload;
    
    //   let noteToRestore = state.archivedNotes.find((note) => note.id === id);
    
    //   if (noteToRestore) {
    //     const updatedNote = { ...noteToRestore, isArchived: false };
    
    //     // If note had labels before archiving, restore it there
    //     if (noteToRestore.labels?.length) {
    //       noteToRestore.labels.forEach((label) => {
    //         if (state.labels[label]) {
    //           state.labels[label].push(updatedNote);
    //         }
    //       });
    //     } else {
    //       // If no labels, restore to main notes
    //       state.notes.push(updatedNote);
    //     }
    
    //     // Remove from archive
    //     state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id);
    //   }
    // },
    
    // UnarchiveNote: (state, action) => {
    //   const id = action.payload;
    
    //   let noteToRestore = state.archivedNotes.find((note) => note.id === id);
    
    //   if (noteToRestore) {
    //     const updatedNote = { ...noteToRestore, isArchived: false };
    
    //     // ✅ If note had labels before archiving, restore it to those labels
    //     if (noteToRestore.labels?.length) {
    //       let restored = false;
    //       noteToRestore.labels.forEach((label) => {
    //         if (state.labels[label]) {
    //           state.labels[label].push(updatedNote);
    //           restored = true;
    //         }
    //       });
    
    //       // ✅ If the labels were deleted, move the note to Home
    //       if (!restored) {
    //         state.notes.push(updatedNote);
    //       }
    //     } else {
    //       // ✅ If the note was created in Home, move it back to Home
    //       state.notes.push(updatedNote);
    //     }
    
    //     // ✅ Remove from Archive
    //     state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id);
    //   }
    // },
    UnarchiveNote: (state, action) => {
      const id = action.payload;
      let noteToRestore = state.archivedNotes.find((note) => note.id === id);
    
      if (noteToRestore) {
        const updatedNote = { ...noteToRestore, isArchived: false };
    
        // Ensure it's restored to the correct label
        if (noteToRestore.labels?.length) {
          noteToRestore.labels.forEach((label) => {
            if (state.labels[label]) {
              // ✅ Correct way to update Redux state to trigger UI update
              state.labels = {
                ...state.labels,
                [label]: [...state.labels[label], updatedNote],  // NEW array reference
              };
            }
          });
        } else {
          state.notes = [...state.notes, updatedNote]; // Ensure new reference for UI update
        }
    
        state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id); // Remove from archive
      }
    },
    
    
    
    copyNote: (state, action) => {
      const originalNote = action.payload;

      const copiedNote = {
        ...originalNote,
        id: uuidv4(), // Generate a new unique ID
        labels: [...(originalNote.labels || [])], // Ensure labels exist
      };

      // Add copied note to `state.notes`
      state.notes.push(copiedNote);

      // Ensure copied note is stored under correct labels
      copiedNote.labels.forEach((label) => {
        if (!state.labels[label]) {
          state.labels[label] = []; // Create label array if it doesn’t exist
        }
        state.labels[label] = [...state.labels[label], copiedNote]; // Add copied note under label
      });

      console.log(" Copied Note:", copiedNote);
      console.log("Updated Labels:", state.labels);
    },

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
