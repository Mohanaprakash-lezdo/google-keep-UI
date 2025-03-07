import {React,useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import {addNote,deleteNote,editNote,pinNote,UnarchiveNote,addReminderNote,copyNote, addLabel,restoreNote,permanentDeleteNote,deleteLabel} from './features/NotesSlice'
import "./App.css";
import Header from "./components/Header/Header";
import CreateNote from "./components/Createnote/Createnote";  
import NoteList from "./components/NoteList/NoteList";
// import Sidebar from "./Components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Reminder from "./Pages/Reminder/Reminder";
import EditLabel from "./Pages/EditLabels/EditLabel";
import Archive from "./Pages/Archive/Archive";
import Trash from "./Pages/Trash/Trash";
import LabelNotes from "./Pages/LabelNotes/LabelNotes";
// import { LabelSharp } from "@mui/icons-material";

function App() {
  const dispatch=useDispatch();
  const notes=useSelector((state)=>state.notes.notes);
  const trashedNotes=useSelector((state)=>state.notes.trashedNotes);
  const searchQuery= useSelector((state)=>state.notes.searchQuery);
  const archivedNotes=useSelector((state)=>state.notes.archivedNotes)
  const labels=useSelector((state)=>state.notes.labels)
  const reminderNotes=useSelector((state)=>state.notes.reminderNotes)
  const navigate=useNavigate();
  const location = useLocation();
  const[isModalOpen,setIsModalOpen]=useState(false);

  // add a note
  const handleAddNote=(newNote)=>{
    dispatch(addNote(newNote))
  }

  // add  a note for reminders
  const handleAddReminderNote = (newNote) => {
    dispatch(addReminderNote(newNote));
  };


  // copy a note
  const handleCopyNote = (id) => {
    dispatch(copyNote(id))
  }

  // pin/unpin note
  const handlePinNote=(id)=>{
    dispatch(pinNote(id))
  }

  

  // // note search filter
  // const filteredNotes = notes.filter(note=>{
  //   if(!note || !note.title || !note.content) return false;
  //   return  note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       note.content.toLowerCase().includes(searchQuery.toLowerCase())
  // })
  
  // Remove  reminder notes  from home
  const filteredHomeNotes=notes.filter(
    (note)=>!note.isReminder)

  const filteredReminderNotes=reminderNotes.filter(note=>note.isReminder)

  // // separte pin and unpin notes
  const pinnedNotes = filteredHomeNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredHomeNotes.filter((note) => !note.isPinned);
  console.log('notes',notes);
  console.log('trashnednotes',trashedNotes);
  console.log('remindernotes',reminderNotes)

  // Determine if we're in Trash  or Archive
  const isTrash=location.pathname ==='/Trash';
  const isArchive=location.pathname ==='/Archive';
  
  const isHome=location.pathname ==='/';
  const isReminder = location.pathname === "/Reminder"; 
 

  
  // open modal
  const openModal=()=>{
    setIsModalOpen(true)
  }

  // close modal
  const closeModal=()=>{
    setIsModalOpen(false);
    navigate('/')
  }
  

  return (
    <div className="App">
      <Header/>
      <div className="main-content">

        <Layout labels={labels} openModal={openModal}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/Reminder" element={
              <Reminder 
              // handleAddNote={handleAddNote}
              />
              }
               />
            
            <Route path="/Archive" element={<Archive archivedNote={archivedNotes}
             UnarchiveNote={(id) => dispatch(UnarchiveNote(id))} />} />

            <Route path="/Trash" element={
              <Trash
               trashedNotes={trashedNotes}
               restoreNote={(id)=>dispatch(restoreNote(id))}
               permanentDeleteNote={(id)=>dispatch(permanentDeleteNote(id))}
               />} />
            <Route path='/note/:id' element={<NoteList notes={notes} editNote={(id, updatedNote) => dispatch(editNote({ id, ...updatedNote }))} />} />
            <Route path='/label/:labelName' element={
              <LabelNotes notes={notes} 
              addNote={handleAddNote}
              deleteNote={(id)=>dispatch(deleteNote(id))}
              editNote={editNote}
              pinNote={handlePinNote}
              copyNote={handleCopyNote}/>}/>
          </Routes>

          {/* editlabel modal */}
          {isModalOpen &&(
            <EditLabel
            labels={labels}
            addLabel={(label)=>dispatch(addLabel(label))}
            deleteLabel={(label)=>dispatch(deleteLabel(label))}
            closeModal={closeModal}/>
          )}

          {/* {show create note only for Home and Reminder path } */}
          {isHome && <CreateNote addNote={handleAddNote}/>}

        
          {/* {show notes  only on home} */}
          {isHome &&(
             <>
             {/* {Show pinned notes} */}
           {pinnedNotes.length > 0 && (
             <>
               <h2>Pinned</h2>
               <NoteList
                 notes={pinnedNotes}
                 deleteNote={(id)=>dispatch(deleteNote(id))}
                 pinNote={handlePinNote}
                 copyNote={handleCopyNote}
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
                 deleteNote={(id)=>dispatch(deleteNote(id))}
                 pinNote={handlePinNote}
                 copyNote={handleCopyNote}
                 editNote={editNote}
               />
             </>
           )}

           {/* unpinned notes */}
           {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
             <NoteList
               notes={unpinnedNotes}
               deleteNote={(id)=>dispatch(deleteNote(id))}
               pinNote={handlePinNote}
               copyNote={handleCopyNote}
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

