import React, { useState,useEffect,useRef } from "react";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "./Createnote.css";

// expand fn
const Createnote = (props) => {
  const [isexpanded, setisExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  // updated code
  const formRef = useRef(null); 

  const expand = () => {
    setisExpanded(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };
  const submitNote=(event)=>{
    event.preventDefault();
    props.addNote(note);
    setNote({
      title:'',
      content:''
    })
    setisExpanded(false)
  }
  // Function to detect clicks outside the form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setisExpanded(false);
      }
    };
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(note);

  return (
    <div >
      <form className="create-note" ref={formRef}>
        {isexpanded && (
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
          />
        )}
        <textarea
          type="text"
          name="content"
          placeholder="Take a note..."
          onClick={expand}
          onChange={handleChange}
          rows={isexpanded?3:1}
          value={note.content}
        />

        <Zoom in={isexpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default Createnote;
