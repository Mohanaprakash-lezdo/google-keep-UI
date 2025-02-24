import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Header from "./components/Header/Header";
import CreateNote from "./components/Createnote/Createnote";
import NoteList from "./components/NoteList/NoteList";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Reminder from "./Pages/Reminder/Reminder";
import EditLabel from "./Pages/EditLabels/EditLabel";
import Archive from "./Pages/Archive/Archive";
import Trash from "./Pages/Trash/Trash";




function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  // get the  current  route

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...newNote, ispinned: false, id: uuidv4(), lastedited: null },
      ];
      // generating a unique id
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return note.id !== id;
      });
    });
  };

  // pin  or unpin a note
  const pinNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  // copy a note
  const copyNote = (note) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...note, id: uuidv4(), lastedited: null },
    ]);
  };

  // Edit a note
  const editNote = (id, updateTitle, updatedContent, updatedImage) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              title: updateTitle,
              content: updatedContent,
              image: updatedImage,
              lastedited: new Date().toLocaleTimeString(),
            }
          : note
      )
    );
  };

  // note search filter
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // separte pin and unpin notes
  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);
  console.log(notes);

  // Determine if we're in Trash  or Archive
  const isTrash=location.pathname ==='/Trash';
  const isArchive=location.pathname ==='/Archive';
  const isReminder=location.pathname ==='/Reminder';
  const isHome=location.pathname ==='/';


  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery} />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Reminder" element={<Reminder />} />
            <Route path="/EditLabel" element={<EditLabel />} />
            <Route path="/Archive" element={<Archive />} />
            <Route path="/Trash" element={<Trash />} />
          </Routes>

          {/* {show create note only for Home and Reminder path } */}
          {(isHome || isReminder) &&<CreateNote addNote={addNote}/>}

          {/* {Show Reminder paragraph below CreateNote} */}
          {isReminder && <Reminder/>}
          
          {/* {show notes  only on home} */}
          {isHome &&(
             <>
             {/* {Show pinned notes} */}
           {pinnedNotes.length > 0 && (
             <>
               <h2>pinned</h2>
               <NoteList
                 notes={pinnedNotes}
                 deleteNote={deleteNote}
                 pinNote={pinNote}
                 copyNote={copyNote}
                 editNote={editNote}
               />
             </>
           )}
           {/* {show other notes} */}
           {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
             <>
               <h2>Others</h2>
               <NoteList
                 notes={unpinnedNotes}
                 deleteNote={deleteNote}
                 pinNote={pinNote}
                 copyNote={copyNote}
                 editNote={editNote}
               />
             </>
           )}

           {/* unpinned notes */}
           {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
             <NoteList
               notes={unpinnedNotes}
               deleteNote={deleteNote}
               pinNote={pinNote}
               copyNote={copyNote}
               editNote={editNote}
             />
           )}
             </>
           )}
 
             {/* {Show Trash page} */}
             {isTrash }
             
             {/* {Show Archive page} */}
             {isArchive }
        </div>
      </div>
    </div>
  );
}

export default App;
