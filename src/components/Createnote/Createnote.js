import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addNote, addReminderNote } from "../../features/NotesSlice";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import "./Createnote.css";

const Createnote = ({ labelName }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isReminderPath = location.pathname === "/reminder";

  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    image: "",
    reminderTime: isReminderPath ? new Date().toLocaleString() : null,
    labels: labelName ? [labelName] : [],
  });

  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const expand = () => {
    setIsExpanded(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNote((prevNote) => ({
          ...prevNote,
          image: reader.result, // Store base64 image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const submitNote = (event) => {
    event.preventDefault();
    if (note.title.trim()) {
      if (isReminderPath) {
        dispatch(
          addReminderNote({
            title: note.title,
            reminderTime: new Date().toLocaleString(),
          })
        );
      } else {
        dispatch(addNote(note));
      }
    }
    resetForm();
  };

  const resetForm = () => {
    setNote({
      title: "",
      content: "",
      image: "",
      reminderTime: isReminderPath ? new Date().toLocaleString() : null,
      labels: labelName ? [labelName] : [],
    });
    setIsExpanded(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="create-note-container">
      <form className="create-note" ref={formRef}>
        {isExpanded && (
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
          />
        )}
        {!isReminderPath && (
          <textarea
            type="text"
            name="content"
            placeholder="Take a note..."
            onClick={expand}
            onChange={handleChange}
            value={note.content}
          />
        )}
        {isExpanded && !isReminderPath && (
          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <IconButton onClick={handleIconClick} color="primary">
              <ImageIcon />
            </IconButton>
          </div>
        )}
        {note.image && !isReminderPath && (
          <img src={note.image} alt="preview" className="image-preview" />
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote} className="add-buttons">
            +
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default Createnote;
