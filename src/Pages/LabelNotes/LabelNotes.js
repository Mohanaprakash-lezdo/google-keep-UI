import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../features/NotesSlice";
import NoteList from "../../components/NoteList/NoteList";
import Createnote from "../../components/Createnote/Createnote";

const LabelNotes = () => {
  const { labelName } = useParams();
  const dispatch = useDispatch();

  //  Ensure component re-renders when notes change
  const notes = useSelector((state) => state.notes.notes).filter((note) =>
    note.labels?.includes(labelName)
  );

  //  Debugging: Check if notes are correctly fetched
  useEffect(() => {
    console.log(`📌 Notes for label "${labelName}":`, notes);
  }, [notes]); // Re-run when notes change

  // Ensure notes are added under the correct label
  const handleAddNote = (note) => {
    const updatedNote = {
      ...note,
      labels: [...(note.labels || []), labelName], // ✅ Append label correctly
    };
    dispatch(addNote(updatedNote));
  };

  return (
    <div className="label-notes-container">
      <h2>Notes for {labelName}</h2>

      {/* Ensure new notes are created under the selected label */}
      <Createnote addNote={handleAddNote} labelName={labelName} />

      {/*  Pass labelName so NoteList can fetch the right notes */}
      <NoteList noteType="label" labelName={labelName} notes={notes} />
    </div>
  );
};

export default LabelNotes;