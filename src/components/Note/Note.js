import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './Note.css'
const Note = (props) => {
  const handleClick=()=>{
    props.deleteNote(props.id)
  }
  
  return (
    <div className='note'>
      <h2>{props.title}</h2>
      <span>{props.content}</span>
      <button onclick={handleClick}>
        <DeleteIcon/>

      </button>

    </div>
  )
}

export default Note