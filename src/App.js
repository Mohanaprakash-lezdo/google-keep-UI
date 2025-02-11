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
  // note search filter
  const filteredNotes=notes.filter((note)=>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
)
  
  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery}/>
      <div className='main-content'>
      <Sidebar/>
      <div className='content' >
      <CreateNote addNote={addNote} />
      <NoteList notes={filteredNotes} deleteNote={deleteNote}/>
     
      </div>
     </div>
     </div>
    
  );
}

export default App;
