// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header'
import CreateNote from './components/Createnote/Createnote'
import Note from './components/Note/Note'
import { useState } from 'react';


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
      <CreateNote addNote={addNote} />
      {notes.map((note,index)=>{
        return(
          <Note id={index} title={note.title} content={note.content} deleteNote={deleteNote}/>      
        )
      })}
      
    </div>
  );
}

export default App;
