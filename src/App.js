// import {React,useState,useEffect} from "react";
// import { useSelector,useDispatch } from "react-redux";
// import {addNote,deleteNote,editNote,pinNote,UnarchiveNote,addReminderNote,copyNote, addLabel,restoreNote,permanentDeleteNote,deleteLabel} from './features/NotesSlice'
// import "./App.css";
// import Header from "./components/Header/Header";
// import CreateNote from "./components/Createnote/Createnote";  
// import NoteList from "./components/NoteList/NoteList";
// // import Sidebar from "./Components/Sidebar/Sidebar";
// import Layout from "./components/Layout/Layout";
// import { Routes, Route, useLocation, useNavigate,Navigate } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Reminder from "./Pages/Reminder/Reminder";
// import EditLabel from "./Pages/EditLabels/EditLabel";
// import Archive from "./Pages/Archive/Archive";
// import Trash from "./Pages/Trash/Trash";
// import LabelNotes from "./Pages/LabelNotes/LabelNotes";
// import AuthLayout from "./components/Auth/AuthLayout";
// import SignIn from './Pages/Signin/Sign';
// import SignUp from './Pages/SignUp/SignUp';
// import { signIn,signOut } from "./features/authSlice";  
// // import "./auth/AuthLayout.css";

// // Import signIn action

// // import { LabelSharp } from "@mui/icons-material";

// function App() {
//   const dispatch=useDispatch();
//   const navigate=useNavigate();
//   const location = useLocation();

//   // get  userid  from auth state
//   const currentUser = useSelector((state) => state.auth?.user);
//   // const userId = useSelector((state) => state.auth.userId);
//   const userId = currentUser?.id; // Extract user ID
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
//    // Retrieve user-specific notes, reminders, labels, archive, and trash
//   // const notes=useSelector((state)=>state.notes.notes);
//   // const trashedNotes=useSelector((state)=>state.notes.trashedNotes);
//   const searchQuery= useSelector((state)=>state.notes.searchQuery);
//   // const archivedNotes=useSelector((state)=>state.notes.archivedNotes)
//   // const labels=useSelector((state)=>state.notes.labels)
//   // const reminderNotes=useSelector((state)=>state.notes.reminderNotes)
//   // const notes = useSelector((state) => state.notes[userId]?.notes) || [];
//   // const trashedNotes = useSelector((state) => state.notes.trashedNotes[userId]) || [];
//   // const archivedNotes = useSelector((state) => state.notes.archivedNotes[userId]) || [];
//   // const reminderNotes = useSelector((state) => state.notes.reminderNotes[userId]) || [];
//   // const labels = useSelector((state) => state.notes.labels[userId]) || {};
//   const notes = useSelector((state) => state.notes[userId]?.notes || {});
//   const trashedNotes = useSelector((state) => state.notes[userId]?.trashedNotes || []);
//   const archivedNotes = useSelector((state) => state.notes[userId]?.archivedNotes || []);
//   const labels = useSelector((state) => state.notes[userId]?.labels || {});
//   const reminderNotes = useSelector((state) => state.notes[userId]?.reminderNotes || {});
 
//   const[isModalOpen,setIsModalOpen]=useState(false);

//   // add a note
//   // const handleAddNote=(newNote)=>{
//   //   dispatch(addNote(newNote))
//   // }
//   const handleAddNote = (newNote) => {
//     dispatch(addNote({ userId, ...newNote }));
//   };

//   // add  a note for reminders
//   // const handleAddReminderNote = (newNote) => {
//   //   dispatch(addReminderNote(newNote));
//   // };

//   const handleAddReminderNote = (newNote) => {
//     dispatch(addReminderNote({ userId, ...newNote }));
//   };


//   // copy a note
//   // const handleCopyNote = (id) => {
//   //   dispatch(copyNote(id))
//   // }
//   const handleCopyNote = (id) => {
//     dispatch(copyNote({ userId, id }));
//   };

//   // pin/unpin note
//   // const handlePinNote=(id)=>{
//   //   dispatch(pinNote(id))
//   // }
//   const handlePinNote = (id) => {
//     dispatch(pinNote({ userId, id }));
//   };

  
//   // Remove  reminder notes  from home
//   // const filteredHomeNotes=notes.filter(
//   //   (note)=>!note.isReminder)

//   // const filteredReminderNotes=reminderNotes.filter(note=>note.isReminder)

//     // Filter notes
//   // const filteredHomeNotes = notes.filter((note) => !note.isReminder);
//   // const filteredReminderNotes = reminderNotes.filter((note) => note.isReminder);
//   // const filteredHomeNotes = Object.values(notes || {}).filter((note) => !note.isReminder);
//   // const filteredReminderNotes = Object.values(reminderNotes || {}).filter((note) => note.isReminder);
//   const filteredHomeNotes = Array.isArray(notes) ? notes.filter((note) => !note.isReminder) : [];
// const filteredReminderNotes = Array.isArray(reminderNotes) ? reminderNotes.filter((note) => note.isReminder) : [];

//   // // separte pin and unpin notes
//   const pinnedNotes = filteredHomeNotes.filter((note) => note.isPinned);
//   const unpinnedNotes = filteredHomeNotes.filter((note) => !note.isPinned);
//   console.log('notes',notes);
//   console.log('trashnednotes',trashedNotes);
//   console.log('remindernotes',reminderNotes)

//   // Determine if we're in Trash  or Archive
//   const isTrash=location.pathname ==='/Trash';
//   const isArchive=location.pathname ==='/Archive';
  
//   const isHome=location.pathname ==='/';
//   const isReminder = location.pathname === "/Reminder"; 
 

  
//   // open modal
//   const openModal=()=>{
//     setIsModalOpen(true)
//   }

//   // close modal
//   const closeModal=()=>{
//     setIsModalOpen(false);
//     navigate('/')
//   }


//   //  When the app starts, check if user data exists
//   // useEffect(() => {
//   //   const storedUser = JSON.parse(localStorage.getItem("user"));
//   //   const storedAuth = localStorage.getItem("isAuthenticated") === "true";

//   //   if (!storedUser || !storedAuth) {
//   //     dispatch(signOut());  
//   //     // Force sign out on restart if no stored session
//   //   } else {
//   //     dispatch(signIn(storedUser));  
//   //     // Restore session only if data exists
//   //   }
//   // }, [dispatch]);

//   // //  Redirect to Sign In if not authenticated
//   // useEffect(() => {
//   //   if (!isAuthenticated && !["/signin", "/signup"].includes(location.pathname)) {
//   //     navigate("/signin");
//   //   }
//   // }, [isAuthenticated, navigate, location.pathname]);
//   // Function to start session timeout (1 minute)
//   // const startSessionTimeout = () => {
//   //   sessionStorage.setItem("sessionStartTime", Date.now());
    
//   //   setTimeout(() => {
//   //     if (isAuthenticated) {
//   //       alert("Session Timed Out");
//   //       dispatch(signOut());
//   //       sessionStorage.removeItem("sessionStartTime");
//   //       navigate("/signin");
//   //     }
//   //   }, 300000);
//   // };
//   let sessionTimeout; // Store timeout globally

//   const startSessionTimeout = () => {
//     // Clear existing timeout before setting a new one
//     if (sessionTimeout) {
//       clearTimeout(sessionTimeout);
//     }
  
//     sessionStorage.setItem("sessionStartTime", Date.now());
  
//     sessionTimeout = setTimeout(() => {
//       if (isAuthenticated) {
//         alert("Session Timed Out");
//         dispatch(signOut());
//         sessionStorage.removeItem("sessionStartTime");
//         navigate("/signin");
//       }
//     }, 60000); // 1 minute timeout
//   };
//   // On App Load - Restore session or logout if expired
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const storedAuth = localStorage.getItem("isAuthenticated") === "true";
//     const sessionStartTime = sessionStorage.getItem("sessionStartTime");

//     if (!storedUser || !storedAuth) {
//       dispatch(signOut());
//     } else {
//       if (sessionStartTime && Date.now() - sessionStartTime > 60000) {
//         alert("Session Timed Out");
//         dispatch(signOut());
//         sessionStorage.removeItem("sessionStartTime");
//         navigate("/signin");
//       } else {
//         dispatch(signIn(storedUser));
//         startSessionTimeout();
//       }
//     }
//   }, [dispatch]);

//   // Reset session timeout on user activity
//   useEffect(() => {
//     if (isAuthenticated) {
//       const resetSessionTimeout = () => startSessionTimeout();
//       window.addEventListener("mousemove", resetSessionTimeout);
//       window.addEventListener("keydown", resetSessionTimeout);
//       return () => {
//         window.removeEventListener("mousemove", resetSessionTimeout);
//         window.removeEventListener("keydown", resetSessionTimeout);
//       };
//     }
//   }, [isAuthenticated]);


//   return (
//     <div className="App">
//        {/* Show header only if not on Sign In or Sign Up */}
//        {!["/signin", "/signup"].includes(location.pathname) && <Header />}
//       <div className="main-content">
//            {/* Show sidebar only if authenticated */}
//            {isAuthenticated && <Layout labels={labels} openModal={openModal} />}
      
//            <Routes>
//           {/* Authentication Routes */}
            
//             <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>}/>
//             <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

//           {/* Protected Routes (Only accessible when logged in) */}
//           {isAuthenticated ? (
//             // <Route element={<Layout labels={labels} openModal={openModal} />}>
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/Reminder" element={<Reminder notes={filteredReminderNotes} />} />
//               <Route path="/Archive" element={<Archive archivedNotes={archivedNotes} UnarchiveNote={(id) => dispatch(UnarchiveNote({userId,id}))} />} />
//               <Route path="/Trash" element={<Trash trashedNotes={trashedNotes} restoreNote={(id) => dispatch(restoreNote({userId,id}))} permanentDeleteNote={(id) => dispatch(permanentDeleteNote({userId,id}))} />} />
//               <Route path="/note/:id" element={<NoteList notes={notes} editNote={(id, updatedNote) => dispatch(editNote({ id, ...updatedNote }))} />} />
//               <Route path="/label/:labelName" element={<LabelNotes notes={notes} addNote={(newNote) => dispatch(addNote(newNote))} deleteNote={(id) => dispatch(deleteNote({userId,id}))} editNote={(id, updatedNote) => dispatch(editNote({ userId,id, ...updatedNote }))} pinNote={(id) => dispatch(pinNote(id))} copyNote={(id) => dispatch(copyNote(id))} />} />
//               <Route path="/edit-labels" element={<EditLabel labels={labels} addLabel={(label) => dispatch(addLabel(label))} deleteLabel={(label) => dispatch(deleteLabel({userId,label}))} closeModal={closeModal} />} />
//             {/* </Route> */}
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/signin" />} />
//           )}
//         </Routes>


//           {/* editlabel modal */}
//           {isModalOpen &&(
//             <EditLabel
//             labels={labels}
//             addLabel={(label)=>dispatch(addLabel({userId,label}))}
//             deleteLabel={(label)=>dispatch(deleteLabel({userId,label}))}
//             closeModal={closeModal}/>
//           )}

//           {/* {show create note only for Home and Reminder path } */}
//           {isHome 
//           // && <CreateNote addNote={handleAddNote}/>
//           }

        
//           {/* {show notes  only on home} */}
//           {isHome &&(
//              <>
//              {/* {Show pinned notes} */}
//            {pinnedNotes.length > 0 && (
//              <>
//                <h2>Pinned</h2>
//                <NoteList
//                  notes={pinnedNotes}
//                  deleteNote={(id)=>dispatch(deleteNote({userId,id}))}
//                  pinNote={handlePinNote}
//                  copyNote={handleCopyNote}
//                  editNote={editNote}
//                />
//              </>
//            )}
//            {/* {show other notes} */}
//            {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
//              <>
//                <h2>Others</h2>
//                <NoteList
//                  notes={unpinnedNotes}
//                  deleteNote={(id)=>dispatch(deleteNote({userId,id}))}
//                  pinNote={handlePinNote}
//                  copyNote={handleCopyNote}
//                  editNote={editNote}
//                />
//              </>
//            )}

//            {/* unpinned notes */}
//            {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
//              <NoteList
//                notes={unpinnedNotes}
//                deleteNote={(id)=>dispatch(deleteNote({userId,id}))}
//                pinNote={handlePinNote}
//                copyNote={handleCopyNote}
//                editNote={editNote}
//              />
//            )}
//              </>
//            )}
 
//              {/* {Show Trash page} */}
//              {isTrash }
             
//              {/* {Show Archive page} */}
//              {isArchive }
//         </div>
//       </div>
//   );
// }

// export default App;

// import { React, useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addNote, deleteNote, editNote, pinNote, UnarchiveNote, addReminderNote, copyNote, addLabel, restoreNote, permanentDeleteNote, deleteLabel } from './features/NotesSlice';
// import "./App.css";
// import Header from "./components/Header/Header";
// import Layout from "./components/Layout/Layout";
// import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Reminder from "./Pages/Reminder/Reminder";
// import EditLabel from "./Pages/EditLabels/EditLabel";
// import Archive from "./Pages/Archive/Archive";
// import Trash from "./Pages/Trash/Trash";
// import LabelNotes from "./Pages/LabelNotes/LabelNotes";
// import AuthLayout from "./components/Auth/AuthLayout";
// import SignIn from './Pages/Signin/Sign';
// import SignUp from './Pages/SignUp/SignUp';
// import { signIn, signOut } from "./features/authSlice";
// import NoteList from "./components/NoteList/NoteList";

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const currentUser = useSelector((state) => state.auth?.user);
//   const userId = currentUser?.id;
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Fetch notes as arrays
//   const notes = useSelector((state) => state.notes[userId]?.notes || []);
//   const trashedNotes = useSelector((state) => state.notes[userId]?.trashedNotes || []);
//   const archivedNotes = useSelector((state) => state.notes[userId]?.archivedNotes || []);
//   const labels = useSelector((state) => state.notes[userId]?.labels || {});
//   const reminderNotes = useSelector((state) => state.notes[userId]?.reminderNotes || []);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Filtered notes
//   const filteredHomeNotes = notes.filter((note) => !note.isReminder);
//   const filteredReminderNotes = reminderNotes.filter((note) => note.isReminder);

//   // Separate pinned and unpinned notes
//   const pinnedNotes = filteredHomeNotes.filter((note) => note.isPinned);
//   const unpinnedNotes = filteredHomeNotes.filter((note) => !note.isPinned);

//   const isTrash = location.pathname === '/Trash';
//   const isArchive = location.pathname === '/Archive';
//   const isHome = location.pathname === '/';

//   const closeModal = () => {
//     setIsModalOpen(false);
//     navigate('/');
//   };
//   useEffect(() => {
//     let timeout;

//     const checkSession = () => {
//       const sessionStartTime = sessionStorage.getItem("sessionStartTime");

//       if (sessionStartTime) {
//         const elapsedTime = Date.now() - parseInt(sessionStartTime, 10);

//         if (elapsedTime >= 5 * 60 * 1000) { // 5 minutes
//           alert("Session timed out");
//           handleLogout();
//         }
//       }
//     };

//     const resetTimeout = () => {
//       clearTimeout(timeout);
//       sessionStorage.setItem("sessionStartTime", Date.now().toString());

//       timeout = setTimeout(() => {
//         alert("Session timed out");
//         handleLogout();
//       }, 5 * 60 * 1000);
//     };

//     const handleLogout = () => {
//       dispatch(signOut());
//       sessionStorage.removeItem("sessionStartTime");
//       navigate("/signin");
//     };

//     if (isAuthenticated) {
//       checkSession();
//       resetTimeout();
//       window.addEventListener("mousemove", resetTimeout);
//       window.addEventListener("keydown", resetTimeout);
//     }

//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener("mousemove", resetTimeout);
//       window.removeEventListener("keydown", resetTimeout);
//     };
//   }, [isAuthenticated, dispatch, navigate]);



//   return (
//     <div className="App">
//       {!["/signin", "/signup"].includes(location.pathname) && <Header />}
//       <div className="main-content">
//         {isAuthenticated && <Layout labels={labels} openModal={() => setIsModalOpen(true)} />}
        
//         <Routes>
//           <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
//           <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/Reminder" element={<Reminder notes={filteredReminderNotes} />} />
//               <Route path="/Archive" element={<Archive archivedNotes={archivedNotes} UnarchiveNote={(id) => dispatch(UnarchiveNote({ userId, id }))} />} />
//               <Route path="/Trash" element={<Trash trashedNotes={trashedNotes} restoreNote={(id) => dispatch(restoreNote({ userId, id }))} permanentDeleteNote={(id) => dispatch(permanentDeleteNote({ userId, id }))} />} />
//               <Route path="/note/:id" element={<NoteList notes={notes} editNote={(id, updatedNote) => dispatch(editNote({ userId, id, ...updatedNote }))} />} />
//               <Route path="/label/:labelName" element={<LabelNotes notes={notes} />} />
//               <Route path="/edit-labels" element={<EditLabel labels={labels} addLabel={(label) => dispatch(addLabel({ userId, label }))} deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} closeModal={closeModal} />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/signin" />} />
//           )}
//         </Routes>

//         {isModalOpen && (
//           <EditLabel
//             labels={labels}
//             addLabel={(label) => dispatch(addLabel({ userId, label }))}
//             deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))}
//             closeModal={closeModal}
//           />
//         )}

//         {isHome && (
//           <>
//             {pinnedNotes.length > 0 && (
//               <>
//                 <h2>Pinned</h2>
//                 <NoteList notes={pinnedNotes} deleteNote={(id) => dispatch(deleteNote({ userId, id }))} pinNote={(id) => dispatch(pinNote({ userId, id }))} />
//               </>
//             )}
//             {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
//               <>
//                 <h2>Others</h2>
//                 <NoteList notes={unpinnedNotes} deleteNote={(id) => dispatch(deleteNote({ userId, id }))} pinNote={(id) => dispatch(pinNote({ userId, id }))} />
//               </>
//             )}
//             {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
//               <NoteList notes={unpinnedNotes} deleteNote={(id) => dispatch(deleteNote({ userId, id }))} pinNote={(id) => dispatch(pinNote({ userId, id }))} />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import { React, useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { 
//   addNote, deleteNote, editNote, pinNote, UnarchiveNote, 
//   addReminderNote, copyNote, addLabel, restoreNote, 
//   permanentDeleteNote, deleteLabel 
// } from './features/NotesSlice';
// import "./App.css";
// import Header from "./components/Header/Header";
// import Layout from "./components/Layout/Layout";
// import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Reminder from "./Pages/Reminder/Reminder";
// import EditLabel from "./Pages/EditLabels/EditLabel";
// import Archive from "./Pages/Archive/Archive";
// import Trash from "./Pages/Trash/Trash";
// import LabelNotes from "./Pages/LabelNotes/LabelNotes";
// import AuthLayout from "./components/Auth/AuthLayout";
// import SignIn from './Pages/Signin/Sign';
// import SignUp from './Pages/SignUp/SignUp';
// import { signIn, signOut } from "./features/authSlice";
// import NoteList from "./components/NoteList/NoteList";

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const currentUser = useSelector((state) => state.auth?.user);
//   const userId = currentUser?.id;
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Fetch only the current user's notes
//   const userNotes = useSelector((state) => state.notes[userId] || {});
//   const { notes = [], trashedNotes = [], archivedNotes = [], labels = {}, reminderNotes = [] } = userNotes;

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Filtered notes
//   const filteredHomeNotes = notes.filter((note) => !note.isReminder);
//   const filteredReminderNotes = reminderNotes.filter((note) => note.isReminder);

//   // Separate pinned and unpinned notes
//   const pinnedNotes = filteredHomeNotes.filter((note) => note.isPinned);
//   const unpinnedNotes = filteredHomeNotes.filter((note) => !note.isPinned);

//   const isTrash = location.pathname === '/Trash';
//   const isArchive = location.pathname === '/Archive';
//   const isHome = location.pathname === '/';

//   const closeModal = () => {
//     setIsModalOpen(false);
//     navigate('/');
//   };

//   // Session timeout logic
//   useEffect(() => {
//     let timeout;

//     const checkSession = () => {
//       const sessionStartTime = sessionStorage.getItem("sessionStartTime");

//       if (sessionStartTime) {
//         const elapsedTime = Date.now() - parseInt(sessionStartTime, 10);

//         if (elapsedTime >= 5 * 60 * 1000) { // 5 minutes
//           alert("Session timed out");
//           handleLogout();
//         }
//       }
//     };

//     const resetTimeout = () => {
//       clearTimeout(timeout);
//       sessionStorage.setItem("sessionStartTime", Date.now().toString());

//       timeout = setTimeout(() => {
//         alert("Session timed out");
//         handleLogout();
//       }, 5 * 60 * 1000);
//     };

//     const handleLogout = () => {
//       dispatch(signOut());
//       sessionStorage.removeItem("sessionStartTime");
//       navigate("/signin");
//     };

//     if (isAuthenticated) {
//       checkSession();
//       resetTimeout();
//       window.addEventListener("mousemove", resetTimeout);
//       window.addEventListener("keydown", resetTimeout);
//     }

//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener("mousemove", resetTimeout);
//       window.removeEventListener("keydown", resetTimeout);
//     };
//   }, [isAuthenticated, dispatch, navigate]);

//   return (
//     <div className="App">
//       {!["/signin", "/signup"].includes(location.pathname) && <Header />}
//       <div className="main-content">
//         {isAuthenticated && <Layout labels={labels} openModal={() => setIsModalOpen(true)} />}
        
//         <Routes>
//           <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
//           <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/Reminder" element={<Reminder notes={filteredReminderNotes} />} />
//               <Route path="/Archive" element={<Archive archivedNotes={archivedNotes} UnarchiveNote={(id) => dispatch(UnarchiveNote({ userId, id }))} />} />
//               <Route path="/Trash" element={<Trash trashedNotes={trashedNotes} restoreNote={(id) => dispatch(restoreNote({ userId, id }))} permanentDeleteNote={(id) => dispatch(permanentDeleteNote({ userId, id }))} />} />
//               <Route path="/note/:id" element={<NoteList notes={notes} editNote={(id, updatedNote) => dispatch(editNote({ userId, id, ...updatedNote }))} />} />
//               <Route path="/label/:labelName" element={<LabelNotes notes={notes} />} />
//               <Route path="/edit-labels" element={<EditLabel labels={labels} addLabel={(label) => dispatch(addLabel({ userId, label }))} deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} closeModal={closeModal} />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/signin" />} />
//           )}
//         </Routes>

//         {isModalOpen && (
//           <EditLabel
//             labels={labels}
//             addLabel={(label) => dispatch(addLabel({ userId, label }))} 
//             deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} 
//             closeModal={closeModal}
//           />
//         )}

//         {isHome && (
//           <>
//             {pinnedNotes.length > 0 && (
//               <>
//                 <h2>Pinned</h2>
//                 <NoteList notes={pinnedNotes} deleteNote={(id) => dispatch(deleteNote({ userId, id }))} pinNote={(id) => dispatch(pinNote({ userId, id }))} />
//               </>
//             )}
//             {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
//               <>
//                 <h2>Others</h2>
//                 <NoteList notes={unpinnedNotes} deleteNote={(id) => dispatch(deleteNote({ userId, id }))} pinNote={(id) => dispatch(pinNote({ userId, id }))} />
//               </>
//             )}
//             {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
//               <NoteList notes={unpinnedNotes} deleteNote={(id) => dispatch(deleteNote({ userId, id }))} pinNote={(id) => dispatch(pinNote({ userId, id }))} />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import { React, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { 
//   addNote, deleteNote, editNote, pinNote, UnarchiveNote, 
//   addReminderNote, copyNote, addLabel, restoreNote, 
//   permanentDeleteNote, deleteLabel 
// } from './features/NotesSlice';
// import "./App.css";
// import Header from "./components/Header/Header";
// import Layout from "./components/Layout/Layout";
// import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Reminder from "./Pages/Reminder/Reminder";
// import EditLabel from "./Pages/EditLabels/EditLabel";
// import Archive from "./Pages/Archive/Archive";
// import Trash from "./Pages/Trash/Trash";
// import LabelNotes from "./Pages/LabelNotes/LabelNotes";
// import AuthLayout from "./components/Auth/AuthLayout";
// import SignIn from './Pages/Signin/Sign';
// import SignUp from './Pages/SignUp/SignUp';
// import NoteList from "./components/NoteList/NoteList";

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const currentUser = useSelector((state) => state.auth?.user);
//   const userId = currentUser?.id;
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Fetch only the current user's notes
//   const userNotes = useSelector((state) => state.notes[userId] || {});
//   const { notes = [], trashedNotes = [], archivedNotes = [], labels = {}, reminderNotes = [] } = userNotes;

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Filtered notes
//   const filteredHomeNotes = notes.filter((note) => !note.isReminder);
//   const filteredReminderNotes = reminderNotes.filter((note) => note.isReminder);

//   // Separate pinned and unpinned notes
//   const pinnedNotes = filteredHomeNotes.filter((note) => note.isPinned);
//   const unpinnedNotes = filteredHomeNotes.filter((note) => !note.isPinned);

//   const isTrash = location.pathname === '/Trash';
//   const isArchive = location.pathname === '/Archive';
//   const isHome = location.pathname === '/';

//   const closeModal = () => {
//     setIsModalOpen(false);
//     navigate('/');
//   };

//   return (
//     <div className="App">
//       {!["/signin", "/signup"].includes(location.pathname) && <Header />}
//       <div className="main-content">
//         {isAuthenticated && <Layout labels={labels} openModal={() => setIsModalOpen(true)} />}
        
//         <Routes>
//           <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
//           <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/Reminder" element={<Reminder notes={filteredReminderNotes} />} />
//               <Route path="/Archive" element={<Archive archivedNotes={archivedNotes} UnarchiveNote={(id) => dispatch(UnarchiveNote({ userId, id }))} />} />
//               <Route path="/Trash" element={<Trash trashedNotes={trashedNotes} restoreNote={(id) => dispatch(restoreNote({ userId, id }))} permanentDeleteNote={(id) => dispatch(permanentDeleteNote({ userId, id }))} />} />
//               <Route path="/note/:id" element={<NoteList notes={notes} editNote={(id, updatedNote) => dispatch(editNote({ userId, id, ...updatedNote }))} />} />
//               <Route path="/label/:labelName" element={<LabelNotes notes={notes} />} />
//               <Route path="/edit-labels" element={<EditLabel labels={labels} addLabel={(label) => dispatch(addLabel({ userId, label }))} deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} closeModal={closeModal} />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/signin" />} />
//           )}
//         </Routes>

//         {isModalOpen && (
//           <EditLabel
//             labels={labels}
//             addLabel={(label) => dispatch(addLabel({ userId, label }))} 
//             deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} 
//             closeModal={closeModal}
//           />
//         )}

//         {isHome && (
//           <>
//             {pinnedNotes.length > 0 && (
//               <>
//                 <h2>Pinned</h2>
//                 <NoteList notes={pinnedNotes} deleteNote={(id) => dispatch(deleteNote({ userId, id }))} pinNote={(id) => dispatch(pinNote({ userId, id }))} />
//               </>
//             )}
//             {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
//               <>
//                 <h2>Others</h2>
//                 <NoteList notes={unpinnedNotes} deleteNote={(id) => dispatch(deleteNote({ userId, id }))} pinNote={(id) => dispatch(pinNote({ userId, id }))} />
//               </>
//             )}
//             {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
//               <NoteList notes={unpinnedNotes} deleteNote={(id) => dispatch(deleteNote({ userId, id }))} pinNote={(id) => dispatch(pinNote({ userId, id }))} />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import { React, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { 
//   addNote, deleteNote, editNote, pinNote, unpinNote, UnarchiveNote, 
//   addReminderNote, copyNote, addLabel, restoreNote, 
//   permanentDeleteNote, deleteLabel 
// } from './features/NotesSlice';
// import "./App.css";
// import Header from "./components/Header/Header";
// import Layout from "./components/Layout/Layout";
// import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Reminder from "./Pages/Reminder/Reminder";
// import EditLabel from "./Pages/EditLabels/EditLabel";
// import Archive from "./Pages/Archive/Archive";
// import Trash from "./Pages/Trash/Trash";
// import LabelNotes from "./Pages/LabelNotes/LabelNotes";
// import AuthLayout from "./components/Auth/AuthLayout";
// import SignIn from './Pages/Signin/Sign';
// import SignUp from './Pages/SignUp/SignUp';
// import NoteList from "./components/NoteList/NoteList";

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const currentUser = useSelector((state) => state.auth?.user);
//   const userId = currentUser?.id;
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Fetch only the current user's notes
//   const userNotes = useSelector((state) => state.notes[userId] || {});
//   const { notes = [], trashedNotes = [], archivedNotes = [], labels = {}, reminderNotes = [] } = userNotes;

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Filtered notes
//   const filteredHomeNotes = notes.filter((note) => !note.isReminder);
//   const filteredReminderNotes = reminderNotes.filter((note) => note.isReminder);

//   // Separate pinned and unpinned notes
//   const pinnedNotes = filteredHomeNotes.filter((note) => note.isPinned);
//   const unpinnedNotes = filteredHomeNotes.filter((note) => !note.isPinned);

//   const isTrash = location.pathname === '/Trash';
//   const isArchive = location.pathname === '/Archive';
//   const isHome = location.pathname === '/';

//   const closeModal = () => {
//     setIsModalOpen(false);
//     navigate('/');
//   };

//   // Handle pin/unpin action
//   const togglePin = (id, isPinned) => {
//     if (isPinned) {
//       dispatch(unpinNote({ userId, id }));
//     } else {
//       dispatch(pinNote({ userId, id }));
//     }
//   };

//   return (
//     <div className="App">
//       {!["/signin", "/signup"].includes(location.pathname) && <Header />}
//       <div className="main-content">
//         {isAuthenticated && <Layout labels={labels} openModal={() => setIsModalOpen(true)} />}
        
//         <Routes>
//           <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
//           <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/Reminder" element={<Reminder notes={filteredReminderNotes} />} />
//               <Route path="/Archive" element={<Archive archivedNotes={archivedNotes} UnarchiveNote={(id) => dispatch(UnarchiveNote({ userId, id }))} />} />
//               <Route path="/Trash" element={<Trash trashedNotes={trashedNotes} restoreNote={(id) => dispatch(restoreNote({ userId, id }))} permanentDeleteNote={(id) => dispatch(permanentDeleteNote({ userId, id }))} />} />
//               <Route path="/note/:id" element={<NoteList notes={notes} editNote={(id, updatedNote) => dispatch(editNote({ userId, id, ...updatedNote }))} />} />
//               <Route path="/label/:labelName" element={<LabelNotes notes={notes} />} />
//               <Route path="/edit-labels" element={<EditLabel labels={labels} addLabel={(label) => dispatch(addLabel({ userId, label }))} deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} closeModal={closeModal} />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/signin" />} />
//           )}
//         </Routes>

//         {isModalOpen && (
//           <EditLabel
//             labels={labels}
//             addLabel={(label) => dispatch(addLabel({ userId, label }))} 
//             deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} 
//             closeModal={closeModal}
//           />
//         )}

//         {isHome && (
//           <>
//             {pinnedNotes.length > 0 && (
//               <>
//                 <h2>Pinned</h2>
//                 <NoteList 
//                   notes={pinnedNotes} 
//                   deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
//                   togglePin={togglePin} 
//                 />
//               </>
//             )}
//             {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
//               <>
//                 <h2>Others</h2>
//                 <NoteList 
//                   notes={unpinnedNotes} 
//                   deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
//                   togglePin={togglePin} 
//                 />
//               </>
//             )}
//             {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
//               <NoteList 
//                 notes={unpinnedNotes} 
//                 deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
//                 togglePin={togglePin} 
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import { React, useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { 
//   addNote, deleteNote, editNote, pinNote, unpinNote, UnarchiveNote, 
//   addReminderNote, copyNote, addLabel, restoreNote, 
//   permanentDeleteNote, deleteLabel
// } from './features/NotesSlice';

// import "./App.css";
// import Header from "./components/Header/Header";
// import Layout from "./components/Layout/Layout";
// import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Reminder from "./Pages/Reminder/Reminder";
// import EditLabel from "./Pages/EditLabels/EditLabel";
// import Archive from "./Pages/Archive/Archive";
// import Trash from "./Pages/Trash/Trash";
// import LabelNotes from "./Pages/LabelNotes/LabelNotes";
// import AuthLayout from "./components/Auth/AuthLayout";
// import SignIn from './Pages/Signin/Sign';
// import SignUp from './Pages/SignUp/SignUp';
// import {signOut} from './features/authSlice'
// import NoteList from "./components/NoteList/NoteList";

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const currentUser = useSelector((state) => state.auth?.user);
//   const userId = currentUser?.id;
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Fetch only the current user's notes
//   const userNotes = useSelector((state) => state.notes[userId] || {});
//   const { notes = [], trashedNotes = [], archivedNotes = [], labels = {}, reminderNotes = [] } = userNotes;

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Filtered notes
//   const filteredHomeNotes = notes.filter((note) => !note.isReminder);
//   const filteredReminderNotes = reminderNotes.filter((note) => note.isReminder);

//   // Separate pinned and unpinned notes
//   const pinnedNotes = filteredHomeNotes.filter((note) => note.isPinned);
//   const unpinnedNotes = filteredHomeNotes.filter((note) => !note.isPinned);

//   const isTrash = location.pathname === '/Trash';
//   const isArchive = location.pathname === '/Archive';
//   const isHome = location.pathname === '/';

//   const closeModal = () => {
//     setIsModalOpen(false);
//     navigate('/');
//   };

//   // Handle pin/unpin action
//   const togglePin = (id, isPinned) => {
//     if (isPinned) {
//       dispatch(unpinNote({ userId, id }));
//     } else {
//       dispatch(pinNote({ userId, id }));
//     }
//   };

//   // ✅ Auto-logout after 5 minutes of inactivity
//   useEffect(() => {
//     if (isAuthenticated) {
//       const timeout = setTimeout(() => {
//         alert("Session timed out. Please sign in again.");
//         dispatch(signOut());
//       }, 300000); // 5 minutes

//       return () => clearTimeout(timeout); // Clear timeout on component unmount
//     }
//   }, [isAuthenticated, dispatch]);

//   return (
//     <div className="App">
//       {!["/signin", "/signup"].includes(location.pathname) && <Header />}
//       <div className="main-content">
//         {isAuthenticated && <Layout labels={labels} openModal={() => setIsModalOpen(true)} />}
        
//         <Routes>
//           <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
//           <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/Reminder" element={<Reminder notes={filteredReminderNotes} />} />
//               <Route path="/Archive" element={<Archive archivedNotes={archivedNotes} UnarchiveNote={(id) => dispatch(UnarchiveNote({ userId, id }))} />} />
//               <Route path="/Trash" element={<Trash trashedNotes={trashedNotes} restoreNote={(id) => dispatch(restoreNote({ userId, id }))} permanentDeleteNote={(id) => dispatch(permanentDeleteNote({ userId, id }))} />} />
//               <Route path="/note/:id" element={<NoteList notes={notes} editNote={(id, updatedNote) => dispatch(editNote({ userId, id, ...updatedNote }))} />} />
//               <Route path="/label/:labelName" element={<LabelNotes notes={notes} />} />
//               <Route path="/edit-labels" element={<EditLabel labels={labels} addLabel={(label) => dispatch(addLabel({ userId, label }))} deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} closeModal={closeModal} />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/signin" />} />
//           )}
//         </Routes>

//         {isModalOpen && (
//           <EditLabel
//             labels={labels}
//             addLabel={(label) => dispatch(addLabel({ userId, label }))} 
//             deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} 
//             closeModal={closeModal}
//           />
//         )}

//         {isHome && (
//           <>
//             {pinnedNotes.length > 0 && (
//               <>
//                 <h2>Pinned</h2>
//                 <NoteList 
//                   notes={pinnedNotes} 
//                   deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
//                   togglePin={togglePin} 
//                 />
//               </>
//             )}
//             {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
//               <>
//                 <h2>Others</h2>
//                 <NoteList 
//                   notes={unpinnedNotes} 
//                   deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
//                   togglePin={togglePin} 
//                 />
//               </>
//             )}
//             {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
//               <NoteList 
//                 notes={unpinnedNotes} 
//                 deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
//                 togglePin={togglePin} 
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import { React, useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { 
//   addNote, deleteNote, editNote, pinNote, unpinNote, UnarchiveNote, 
//   addReminderNote, copyNote, addLabel, restoreNote, 
//   permanentDeleteNote, deleteLabel, setSearchQuery
// } from './features/NotesSlice';

// import "./App.css";
// import Header from "./components/Header/Header";
// import Layout from "./components/Layout/Layout";
// import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Reminder from "./Pages/Reminder/Reminder";
// import EditLabel from "./Pages/EditLabels/EditLabel";
// import Archive from "./Pages/Archive/Archive";
// import Trash from "./Pages/Trash/Trash";
// import LabelNotes from "./Pages/LabelNotes/LabelNotes";
// import AuthLayout from "./components/Auth/AuthLayout";
// import SignIn from './Pages/Signin/Sign';
// import SignUp from './Pages/SignUp/SignUp';
// import { signOut } from './features/authSlice';
// import NoteList from "./components/NoteList/NoteList";

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const currentUser = useSelector((state) => state.auth?.user);
//   const userId = currentUser?.id;
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Fetch current user's notes
//   const userNotes = useSelector((state) => state.notes[userId] || {});
//   const { notes = [], trashedNotes = [], archivedNotes = [], labels = {}, reminderNotes = [] } = userNotes;

//   const searchQuery = useSelector((state) => state.notes.searchQuery || "");

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // 🌟 Apply search globally
//   const filterBySearch = (note) =>
//     note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     note.content.toLowerCase().includes(searchQuery.toLowerCase());

//   const filteredNotes = notes.filter(filterBySearch);
//   const filteredTrashedNotes = trashedNotes.filter(filterBySearch);
//   const filteredArchivedNotes = archivedNotes.filter(filterBySearch);
//   const filteredReminderNotes = reminderNotes.filter(filterBySearch);

//   // Separate pinned and unpinned notes
//   const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
//   const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);

//   const isTrash = location.pathname === '/Trash';
//   const isArchive = location.pathname === '/Archive';
//   const isHome = location.pathname === '/';

//   const closeModal = () => {
//     setIsModalOpen(false);
//     navigate('/');
//   };

//   // Handle pin/unpin action
//   const togglePin = (id, isPinned) => {
//     if (isPinned) {
//       dispatch(unpinNote({ userId, id }));
//     } else {
//       dispatch(pinNote({ userId, id }));
//     }
//   };

//   // ✅ Auto-logout after 5 minutes of inactivity
//   useEffect(() => {
//     if (isAuthenticated) {
//       const timeout = setTimeout(() => {
//         alert("Session timed out. Please sign in again.");
//         dispatch(signOut());
//       }, 300000); // 5 minutes

//       return () => clearTimeout(timeout); // Clear timeout on component unmount
//     }
//   }, [isAuthenticated, dispatch]);

//   return (
//     <div className="App">
//       {!["/signin", "/signup"].includes(location.pathname) && <Header />}
//       <div className="main-content">
//         {isAuthenticated && <Layout labels={labels} openModal={() => setIsModalOpen(true)} />}

//         <Routes>
//           <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
//           <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<Home notes={filteredNotes} />} />
//               <Route path="/Reminder" element={<Reminder notes={filteredReminderNotes} />} />
//               <Route path="/Archive" element={<Archive archivedNotes={filteredArchivedNotes} UnarchiveNote={(id) => dispatch(UnarchiveNote({ userId, id }))} />} />
//               <Route path="/Trash" element={<Trash trashedNotes={filteredTrashedNotes} restoreNote={(id) => dispatch(restoreNote({ userId, id }))} permanentDeleteNote={(id) => dispatch(permanentDeleteNote({ userId, id }))} />} />
//               <Route path="/note/:id" element={<NoteList notes={filteredNotes} editNote={(id, updatedNote) => dispatch(editNote({ userId, id, ...updatedNote }))} />} />
//               <Route path="/label/:labelName" element={<LabelNotes notes={filteredNotes} />} />
//               <Route path="/edit-labels" element={<EditLabel labels={labels} addLabel={(label) => dispatch(addLabel({ userId, label }))} deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} closeModal={closeModal} />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/signin" />} />
//           )}
//         </Routes>

//         {isModalOpen && (
//           <EditLabel
//             labels={labels}
//             addLabel={(label) => dispatch(addLabel({ userId, label }))} 
//             deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} 
//             closeModal={closeModal}
//           />
//         )}

//         {isHome && (
//           <>
//             {pinnedNotes.length > 0 && (
//               <>
//                 <h2>Pinned</h2>
//                 <NoteList 
//                   notes={pinnedNotes} 
//                   deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
//                   togglePin={togglePin} 
//                 />
//               </>
//             )}
//             {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
//               <>
//                 <h2>Others</h2>
//                 <NoteList 
//                   notes={unpinnedNotes} 
//                   deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
//                   togglePin={togglePin} 
//                 />
//               </>
//             )}
//             {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
//               <NoteList 
//                 notes={unpinnedNotes} 
//                 deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
//                 togglePin={togglePin} 
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  addNote, deleteNote, editNote, pinNote, unpinNote, UnarchiveNote, 
  addReminderNote, copyNote, addLabel, restoreNote, 
  permanentDeleteNote, deleteLabel
} from './features/NotesSlice';

import "./App.css";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Reminder from "./Pages/Reminder/Reminder";
import EditLabel from "./Pages/EditLabels/EditLabel";
import Archive from "./Pages/Archive/Archive";
import Trash from "./Pages/Trash/Trash";
import LabelNotes from "./Pages/LabelNotes/LabelNotes";
import AuthLayout from "./components/Auth/AuthLayout";
import SignIn from './Pages/Signin/Sign';
import SignUp from './Pages/SignUp/SignUp';
import { signOut } from './features/authSlice';
import NoteList from "./components/NoteList/NoteList";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useSelector((state) => state.auth?.user);
  const userId = currentUser?.id;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Fetch current user's notes
  const userNotes = useSelector((state) => state.notes[userId] || {});
  const { notes = [], trashedNotes = [], archivedNotes = [], labels = {}, reminderNotes = [] } = userNotes;

  // ✅ Access search query from Redux (No need to import setSearchQuery)
  const searchQuery = useSelector((state) => state.notes.searchQuery || "").toLowerCase();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🌟 Apply search globally
  const filterBySearch = (note) =>
    note.title.toLowerCase().includes(searchQuery) ||
    note.content.toLowerCase().includes(searchQuery);

  const filteredNotes = notes.filter(filterBySearch);
  const filteredTrashedNotes = trashedNotes.filter(filterBySearch);
  const filteredArchivedNotes = archivedNotes.filter(filterBySearch);
  const filteredReminderNotes = reminderNotes.filter(filterBySearch);

  // Separate pinned and unpinned notes
  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);

  const isTrash = location.pathname === '/Trash';
  const isArchive = location.pathname === '/Archive';
  const isHome = location.pathname === '/';

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  // Handle pin/unpin action
  const togglePin = (id, isPinned) => {
    if (isPinned) {
      dispatch(unpinNote({ userId, id }));
    } else {
      dispatch(pinNote({ userId, id }));
    }
  };

  // ✅ Auto-logout after 5 minutes of inactivity
  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        alert("Session timed out. Please sign in again.");
        dispatch(signOut());
      }, 300000); // 5 minutes

      return () => clearTimeout(timeout); // Clear timeout on component unmount
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="App">
      {!["/signin", "/signup"].includes(location.pathname) && <Header />}
      <div className="main-content">
        {isAuthenticated && <Layout labels={labels} openModal={() => setIsModalOpen(true)} />}

        <Routes>
          <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home notes={filteredNotes} />} />
              <Route path="/Reminder" element={<Reminder notes={filteredReminderNotes} />} />
              <Route path="/Archive" element={<Archive archivedNotes={filteredArchivedNotes} UnarchiveNote={(id) => dispatch(UnarchiveNote({ userId, id }))} />} />
              <Route path="/Trash" element={<Trash trashedNotes={filteredTrashedNotes} restoreNote={(id) => dispatch(restoreNote({ userId, id }))} permanentDeleteNote={(id) => dispatch(permanentDeleteNote({ userId, id }))} />} />
              <Route path="/note/:id" element={<NoteList notes={filteredNotes} editNote={(id, updatedNote) => dispatch(editNote({ userId, id, ...updatedNote }))} />} />
              <Route path="/label/:labelName" element={<LabelNotes notes={filteredNotes} />} />
              <Route path="/edit-labels" element={<EditLabel labels={labels} addLabel={(label) => dispatch(addLabel({ userId, label }))} deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} closeModal={closeModal} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/signin" />} />
          )}
        </Routes>

        {isModalOpen && (
          <EditLabel
            labels={labels}
            addLabel={(label) => dispatch(addLabel({ userId, label }))} 
            deleteLabel={(label) => dispatch(deleteLabel({ userId, label }))} 
            closeModal={closeModal}
          />
        )}

        {isHome && (
          <>
            {pinnedNotes.length > 0 && (
              <>
                <h2>Pinned</h2>
                <NoteList 
                  notes={pinnedNotes} 
                  deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
                  togglePin={togglePin} 
                />
              </>
            )}
            {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
              <>
                <h2>Others</h2>
                <NoteList 
                  notes={unpinnedNotes} 
                  deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
                  togglePin={togglePin} 
                />
              </>
            )}
            {/* hi */}
            {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
              <NoteList 
                notes={unpinnedNotes} 
                deleteNote={(id) => dispatch(deleteNote({ userId, id }))} 
                togglePin={togglePin} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
