import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLabel, deleteLabel } from "../../features/NotesSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import "./EditLabel.css";

const EditLabel = ({ closeModal }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.notes.labels);
  
  // Memoize label keys for performance optimization
  const memoizedLabels = useMemo(() => Object.keys(labels || {}), [labels]);

  const [newLabel, setNewLabel] = useState("");

  const handleAddLabel = () => {
    const labelName = newLabel.trim();

    if (labelName && !memoizedLabels.includes(labelName)) {
      dispatch(addLabel(labelName));
      setNewLabel(""); 
      // Reset input after adding label
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Labels</h2>
          <button className="close-button" onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Create new label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <button className="add-button" onClick={handleAddLabel}>
            <AddIcon />
          </button>
        </div>
        <ul className="label-list">
          {memoizedLabels.map((label) => (
            <li key={label} className="label-item">
              <span>{label}</span>
              <button
                className="delete-button"
                onClick={() => dispatch(deleteLabel(label))}
              >
                <DeleteIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditLabel;
