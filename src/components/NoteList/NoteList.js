import React from 'react'
import Note from '../Note/Note'

const NoteList = ({notes,deleteNote}) => {
  return (
    <div className='note-list'>
        {notes.map((note,index)=>(
                <Note key={index} 
                id={index} 
                title={note.title} 
                content={note.content}
                image={note.image}
                deleteNote={deleteNote}/>
            ))}
        </div>
  )
}

export default NoteList