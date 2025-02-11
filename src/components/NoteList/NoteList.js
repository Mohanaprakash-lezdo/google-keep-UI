import React from 'react'
import Note from '../Note/Note'

const NoteList = ({notes,deleteNote,pinNote}) => {
  return (
    <div className='note-list'>
        {notes.map((note,index)=>(
                <Note key={index} 
                id={index} 
                title={note.title} 
                content={note.content}
                image={note.image}
                isPinned={note.isPinned}
                deleteNote={deleteNote}
                pinNote={pinNote}
                />
            ))}
        </div>
  )
}

export default NoteList