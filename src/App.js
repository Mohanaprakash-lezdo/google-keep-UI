import {React,useState,useEffect} from "react";
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
import AuthLayout from "./components/auth/AuthLayout";
import SignIn from './Pages/Signin/SignIn';
import SignUp from './Pages/SignUp/SignUp';
// import { LabelSharp } from "@mui/icons-material";

function App() {
  const dispatch=useDispatch();
  const notes=useSelector((state)=>state.notes.notes);
  const trashedNotes=useSelector((state)=>state.notes.trashedNotes);
  const searchQuery= useSelector((state)=>state.notes.searchQuery);
  const archivedNotes=useSelector((state)=>state.notes.archivedNotes)
  const labels=useSelector((state)=>state.notes.labels)
  const reminderNotes=useSelector((state)=>state.notes.reminderNotes)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");  // Redirect to Sign In if not logged in
    }
  }, [isAuthenticated, navigate,location.pathname]);

  return (
    <div className="App">
       {/* Show header only if not on Sign In or Sign Up */}
       {!["/signin", "/signup"].includes(location.pathname) && <Header />}
      <div className="main-content">
           {/* Show sidebar only if authenticated */}
           {isAuthenticated && <Layout labels={labels} openModal={openModal} />}
      
           <Routes>
          {/* Authentication Routes */}

            <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>}/>
            <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

          {/* Protected Routes (Only accessible when logged in) */}
          {isAuthenticated ? (
            <Route element={<Layout labels={labels} openModal={openModal} />}>
              <Route path="/" element={<Home />} />
              <Route path="/Reminder" element={<Reminder notes={filteredReminderNotes} />} />
              <Route path="/Archive" element={<Archive archivedNotes={archivedNotes} UnarchiveNote={(id) => dispatch(UnarchiveNote(id))} />} />
              <Route path="/Trash" element={<Trash trashedNotes={trashedNotes} restoreNote={(id) => dispatch(restoreNote(id))} permanentDeleteNote={(id) => dispatch(permanentDeleteNote(id))} />} />
              <Route path="/note/:id" element={<NoteList notes={notes} editNote={(id, updatedNote) => dispatch(editNote({ id, ...updatedNote }))} />} />
              <Route path="/label/:labelName" element={<LabelNotes notes={notes} addNote={(newNote) => dispatch(addNote(newNote))} deleteNote={(id) => dispatch(deleteNote(id))} editNote={(id, updatedNote) => dispatch(editNote({ id, ...updatedNote }))} pinNote={(id) => dispatch(pinNote(id))} copyNote={(id) => dispatch(copyNote(id))} />} />
              <Route path="/edit-labels" element={<EditLabel labels={labels} addLabel={(label) => dispatch(addLabel(label))} deleteLabel={(label) => dispatch(deleteLabel(label))} closeModal={closeModal} />} />
            </Route>
          ) : (
            <Route path="*" element={<navigate to="/signin" />} />
          )}
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
  );
}

export default App;

