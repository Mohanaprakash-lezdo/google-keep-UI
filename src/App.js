import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Header from './components/Header/Header'
import CreateNote from './components/Createnote/Createnote'
import NoteList from './components/NoteList/NoteList'
import Sidebar from './components/Sidebar/Sidebar'


function App() {
  const [notes, setNotes]=useState([])
  const [searchQuery,setSearchQuery]=useState('')

  const addNote=(newNote)=>{
    setNotes((prevNotes)=>{
      return [...prevNotes,
        {...newNote,ispinned:false,id:uuidv4(),lastedited:null}]
        // generating a unique id
    })
  }

  const deleteNote=(id)=>{
    setNotes((prevNotes)=>{
      return prevNotes.filter((note)=>{
        return note.id!==id
      })
      
    })
  }

  // pin  or unpin a note
  const pinNote=(id)=>{
    setNotes((prevNotes)=>
      prevNotes.map((note)=>
      note.id===id?{...note,isPinned:!note.isPinned}:note)
    )
  }

  // copy a note 
  const copyNote=(note)=>{
    setNotes((prevNotes)=>[...prevNotes,{...note,id:uuidv4(),lastedited:null}])
  }

  // Edit a note
  const editNote=(id,updateTitle,updatedContent,updatedImage)=>{
    setNotes((prevNotes)=>
    prevNotes.map((note)=>
    note.id===id
  ?{...note,title:updateTitle,content:updatedContent,image:updatedImage,lastedited:new Date().toLocaleTimeString()}:note))
  }


  // note search filter
  const filteredNotes=notes.filter((note)=>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
)
  // separte pin and unpin notes
  const pinnedNotes=filteredNotes.filter((note)=>note.isPinned)
  const unpinnedNotes=filteredNotes.filter((note)=>!note.isPinned)
  console.log(notes)
  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery}/>
      <div className='main-content'>
      <Sidebar/>
      <div className='content' >
      <CreateNote addNote={addNote} />
      {/* {Show pinned notes} */}
      {pinnedNotes.length>0 &&(
        <>
        <h2>pinned</h2>
        <NoteList
          notes= {pinnedNotes}
          deleteNote={deleteNote}
          pinNote={pinNote}
          copyNote={copyNote}
          editNote={editNote}/>
        </>
      )}
      {/* {show unpinned notes} */}
      {pinnedNotes.length>0 && unpinnedNotes.length>0 &&(
        <>
        <h2>Others</h2>
        <NoteList
        notes={unpinnedNotes}
        deleteNote={deleteNote}
        pinNote={pinNote}
        copyNote={copyNote}
        editNote={editNote}/>
        </>
        )}

      {/* unpinned notes */}
      {pinnedNotes.length ===0 && unpinnedNotes.length>0 &&(
      <NoteList
      notes={unpinnedNotes}
      deleteNote={deleteNote}
      pinNote={pinNote}
      copyNote={copyNote}
      editNote={editNote}/>
    )}
     
      </div>
     </div>
     </div>
    
  );
}

export default App;
