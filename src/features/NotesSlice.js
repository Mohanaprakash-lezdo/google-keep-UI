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
    //     labels: action.payload.labels || [], //  Ensure labels are assigned
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
    // setUser: (state, action) => {
    //   const newUserId = action.payload;

    //   // If the user is switching accounts, reset the state
    //   if (state.userId !== newUserId) {
    //     state.notes = {};          // Clear previous user's notes
    //     state.trashedNotes = {};   // Clear trash notes
    //     state.archivedNotes = {};  // Clear archived notes
    //     state.labels = {};         // Clear labels
    //     state.reminderNotes = {};  // Clear reminders
    //   }

    //   state.userId = newUserId;

    //   // Ensure the new user has their data initialized
    //   if (!state.notes[state.userId]) {
    //     state.notes[state.userId] = [];
    //     state.trashedNotes[state.userId] = [];
    //     state.archivedNotes[state.userId] = [];
    //     state.labels[state.userId] = {};
    //     state.reminderNotes[state.userId] = [];
    //   }
    // },

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
    // addNote: (state, action) => {
    //   const { userId, title, content, labels, isPinned, isArchived } = action.payload;

    //   const newNote = {
    //     id: uuidv4(),
    //     title: title || "",
    //     content: content || "",
    //     labels: labels || [],
    //     isPinned: isPinned || false,
    //     isArchived: isArchived || false,
    //   };

    //   // ✅ Ensure `state.notes[userId]` exists as an array
    //   if (!state.notes[userId]) {
    //     state.notes[userId] = [];
    //   }

    //   // ✅ Use immutable update to add new note
    //   state.notes[userId] = [...state.notes[userId], newNote];

    //   // ✅ Store labeled notes correctly under userId
    //   if (newNote.labels.length > 0) {
    //     if (!state.labels[userId]) {
    //       state.labels[userId] = {};
    //     }

    //     newNote.labels.forEach((label) => {
    //       if (!state.labels[userId][label]) {
    //         state.labels[userId][label] = [];
    //       }
    //       state.labels[userId][label] = [...state.labels[userId][label], newNote];
    //     });
    //   }
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
    // updateNote: (state, action) => {
    //   const { id, title, content, userId } = action.payload;
    //   const note = state.notes.find((note) => note.id === id && note.userId === userId);
    //   if (note) {
    //     note.title = title;
    //     note.content = content;
    //   }
    // },

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
        isReminder: true, // Boolean flag to indicate it’s a reminder
        reminderTime:
          action.payload.reminderTime || new Date().toLocaleString(),
      };

      // Add to main notes list to ensure visibility everywhere
      state.notes.push(newReminderNote);
    },
    // addReminderNote: (state, action) => {
    //   const { userId, reminderTime, ...rest } = action.payload;

    //   const newReminderNote = {
    //     ...rest,
    //     id: uuidv4(),
    //     userId, // Associate the note with a specific user
    //     isReminder: true,
    //     reminderTime: reminderTime || new Date().toLocaleString(),
    //   };

    //   // Ensure the note is added only for the logged-in user
    //   state.notes.push(newReminderNote);
    // },

    // delete note
    // deleteNote: (state, action) => {
    //   const id = action.payload;
    //   let noteToTrash =
    //     state.notes.find((note) => note.id === id) ||
    //     state.archivedNotes.find((note) => note.id === id) ||
    //     Object.values(state.labels)
    //       .flat()
    //       .find((note) => note.id === id);

    //   if (noteToTrash) {
    //     state.trashedNotes.push({
    //       ...noteToTrash,
    //       deletedFromArchive: !!state.archivedNotes.find((n) => n.id === id),
    //       deleteLabel: noteToTrash.labels || [],
    //       // store labels  before deleting
    //     });

    //     state.notes = state.notes.filter((note) => note.id !== id);
    //     state.archivedNotes = state.archivedNotes.filter(
    //       (note) => note.id !== id
    //     );

    //     // Remove from labels
    //     Object.keys(state.labels).forEach((label) => {
    //       state.labels[label] = state.labels[label].filter(
    //         (note) => note.id !== id
    //       );
    //     });
    //   }
    // },

    // deleteNote: (state, action) => {
    //   const id = action.payload;
      
    //   let noteToTrash =
    //     state.notes.find((note) => note.id === id) ||
    //     state.archivedNotes.find((note) => note.id === id) ||
    //     Object.values(state.labels).flat().find((note) => note.id === id);
    
    //   if (noteToTrash) {
    //     state.trashedNotes.push({
    //       ...noteToTrash,
    //       deletedFromArchive: !!state.archivedNotes.find((n) => n.id === id),
    //       deleteLabel: noteToTrash.labels || [], // Store labels before deleting
    //     });
    
    //     // Remove from notes and archive
    //     state.notes = state.notes.filter((note) => note.id !== id);
    //     state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id);
    
    //     // Remove from labels
    //     Object.keys(state.labels).forEach((label) => {
    //       state.labels[label] = state.labels[label].filter((note) => note.id !== id);
    //     });
    //   }
    // },
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
    
    
    
    // deleteNote: (state, action) => {
    //   if (!state.userId) return;
    //   const id = action.payload;
    //   let noteToTrash =
    //     state.notes[state.userId]?.find((note) => note.id === id) ||
    //     state.archivedNotes[state.userId]?.find((note) => note.id === id) ||
    //     Object.values(state.labels[state.userId] || {}).flat()
    //     .find((note) => note.id === id);

    //   if (noteToTrash) {
    //     state.trashedNotes[state.userId].push({
    //       ...noteToTrash,
    //       deletedFromArchive: !!state.archivedNotes[state.userId]?.find((n) => n.id === id),
    //       deleteLabel: noteToTrash.labels || [],
    //     });

    //     state.notes[state.userId] = state.notes[state.userId]?.filter((note) => note.id !== id) || [];
    //     state.archivedNotes[state.userId] = state.archivedNotes[state.userId]?.filter(
    //       (note) => note.id !== id
    //     ) || [];

    //     Object.keys(state.labels[state.userId] || {}).forEach((label) => {
    //       state.labels[state.userId][label] = state.labels[state.userId][label]?.filter(
    //         (note) => note.id !== id
    //       ) || [];
    //     });
    //   }
    // },

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

    // archive note
    // archiveNote: (state, action) => {
    //   const id = action.payload;
    //   const noteToArchive = state.notes.find((note) => note.id === id);
    //   if (noteToArchive) {
    //     state.archivedNotes = [
    //       ...state.archivedNotes,
    //       { ...noteToArchive, isArchived: true },
    //     ];
    //     state.notes = state.notes.filter((note) => note.id !== id);
    //   }
    // },
    // archiveNote: (state, action) => {
    //   const id = action.payload;
    //   const noteIndex = state.notes.findIndex((note) => note.id === id);
    
    //   if (noteIndex !== -1) {
    //     const note = { ...state.notes[noteIndex], isArchived: true };
    
    //     // Move to archive
    //     state.archivedNotes.push(note);
    
    //     // Remove from main notes
    //     state.notes.splice(noteIndex, 1);
    //   }
    // },
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
