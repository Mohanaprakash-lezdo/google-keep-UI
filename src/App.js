import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header'
import CreateNote from './components/Createnote/Createnote'
import NoteList from './components/NoteList/NoteList'
import Sidebar from './components/Sidebar/Sidebar'


function App() {
  const [notes, setNotes]=useState([])

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
  
  return (
    <div className="App">
      <Header/>
      <div className='main-content'>
      <Sidebar/>
      <div className='content' >
      <CreateNote addNote={addNote} />
      <NoteList notes={notes} deleteNote={deleteNote}/>
     
      </div>
     </div>
     </div>
    
  );
}

export default App;
