// import { Unarchive } from '@mui/icons-material';
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
      if (!action.payload.isReminder) {
        const newNote = {
          id: uuidv4(),
          title: action.payload.title || "",
          content: action.payload.content || "",
          labels: "",
          isPinned: action.payload.isPinned || false,
          isArchived: action.payload.isArchived || false,
        };

        // If the note has labels, don't add it to the main notes array
        if (newNote.labels.length > 0) {
          state.notes.push(newNote);
        } else {
          state.notes.push(newNote); // If no labels, add it to home
        }
      }
    },

    addReminderNote: (state, action) => {
      state.reminderNotes.push({
        ...action.payload,
        id: uuidv4(),
        isReminder: action.payload.reminderTime || new Date().toLocaleString(),
      });
    },
    // reminderTime:action.payload.reminderTime || new Date().toLocaleString(),
    // delete note
    deleteNote: (state, action) => {
      const id = action.payload;
      let noteToTrash =
        state.notes.find((note) => note.id === id) ||
        state.archivedNotes.find((note) => note.id === id);

      if (noteToTrash) {
        state.trashedNotes.push({
          ...noteToTrash,
          deletedFromArchive: !!state.archivedNotes.find((n) => n.id === id),
        });

        state.notes = state.notes.filter((note) => note.id !== id);
        state.archivedNotes = state.archivedNotes.filter(
          (note) => note.id !== id
        );
      }
    },

    // restore note
    restoreNote: (state, action) => {
      const noteIndex = state.trashedNotes.findIndex(
        (note) => note.id === action.payload
      );
      if (noteIndex !== -1) {
        const restoredNote = state.trashedNotes[noteIndex];

        if (restoredNote.deletedFromArchive) {
          // Restore to Archive
          state.archivedNotes.push({ ...restoredNote, isArchived: true });
        } else {
          // Restore to Home
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

    // Add Label
    addLabel: (state, action) => {
      const labelName = action.payload;
      if (!state.labels[labelName]) {
        state.labels[labelName] = [];
        // Initialize label with empty notes array
      }
    },

    // Delete Label
    deleteLabel: (state, action) => {
      delete state.labels[action.payload];
    },

    // Add Note to Specific Label
    addNoteToLabel: (state, action) => {
      const { label, note } = action.payload;
      if (state.labels[label]) {
        state.labels[label].push({
          ...note,
          id: uuidv4(),
        });
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
