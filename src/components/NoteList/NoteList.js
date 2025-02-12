import React from 'react'
import Note from '../Note/Note'
import './NoteList.css'

const NoteList = ({notes,deleteNote,pinNote,copyNote}) => {
  return (
    <div className='note-list'>
        {notes.map((note)=>(
                <Note key={note.id} 
                id={note.id} 
                title={note.title} 
                content={note.content}
                image={note.image}
                isPinned={note.isPinned}
                deleteNote={deleteNote}
                pinNote={pinNote}
                copyNote={copyNote}
                // pass a copy function
                />
            ))}
        </div>
  )
}

export default NoteList