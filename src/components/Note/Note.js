import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import './Note.css'

const Note = (props) => {
  const  {id,title,content,image,isPinned,deleteNote,pinNote}=props

  // delete notes
  const handleClick=()=>{
    deleteNote(id)
  }

  // handle the pin
  const handlePin=()=>{
    
    pinNote(id,!isPinned)
  } 
  
  return (
    <div className={`note ${isPinned ? 'pinned':''}`}>
      {/* {displays uploaded image } */}
      {image && <img src={image} alt='uploaded' className='note-image'/>}
      <h2>{title}</h2>
      <span>{content}</span>
      {/* {icon container(hidden)} */}
      <div className='icons'>
        <button className='pin-icon' onClick={handlePin} style={{color:isPinned?'gold':'gray'}}>
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