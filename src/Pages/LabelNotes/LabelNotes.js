import React from 'react'
import { useParams } from 'react-router-dom'
import NoteList from '../../components/NoteList/NoteList';
const LabelNotes = ({notes}) => {
    const {labelName}=useParams();
    const filteredNotes = notes.filter((note) => note.labels && note.labels.includes(labelName));

  return (
    <div className='label-notes-container'> 

    
        <h2>Notes for {labelName}</h2>
        {filteredNotes.length>0 ?(
            <NoteList notes={filteredNotes}/>
        ):(
            <p>No Notes for this label</p>
        )}
        

    </div>
  )
}

export default LabelNotes