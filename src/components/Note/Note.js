import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import './Note.css'
const Note = (props) => {
  const handleClick=()=>{
    props.deleteNote(props.id)
  }
  
  return (
    <div className='note'>
      {/* {displays uploaded image } */}
      {props.image && <img src={props.image} alt='uploaded' className='note-image'/>}
      <h2>{props.title}</h2>
      <span>{props.content}</span>
      {/* {icon container(hidden)} */}
      <div className='icons'>
        <button className='pin-icon'>
          <PushPinIcon/>
        </button>
        <button className='delete-icon' onClick={handleClick}>
        <DeleteIcon/>

      </button>
      </div>
    </div>
  )
}

export default Note