import React, { useState } from 'react';
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
      return [...prevNotes,newNote]
    })
  }

  const deleteNote=(id)=>{
    setNotes((prevNotes)=>{
      return prevNotes.filter((noteItem,index)=>{
        return index!==id
      })
      
    })
  }

  // pin  or unpin a note
  const pinNote=(id,isPinned)=>{
    setNotes((prevNotes)=>
      prevNotes.map((note,index)=>
      index===id?{...note,isPinned}:note)
    )
  }
  // note search filter
  const filteredNotes=notes.filter((note)=>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
)
  // separte pin and unpin notes
  const pinnedNotes=filteredNotes.filter((note)=>note.isPinned)
  const unpinnedNotes=filteredNotes.filter((note)=>!note.isPinned)
  
  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery}/>
      <div className='main-content'>
      <Sidebar/>
      <div className='content' >
      <CreateNote addNote={addNote} />
      {/* {Render pinned notes first,then unpin notes} */}
      <NoteList notes={[...pinnedNotes,...unpinnedNotes]} deleteNote={deleteNote} pinNote={pinNote}/>
     
      </div>
     </div>
     </div>
    
  );
}

export default App;
