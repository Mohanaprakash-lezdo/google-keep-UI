// import React, { useMemo } from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./Sidebar.css";

// const Sidebar = ({ openModal }) => {
//   const labels = useSelector((state) => state.labels); // Get labels Names
//   const labelNames = useMemo(() => Object.keys(labels || {}), [labels]);
//   // const navigate=useNavigate();
//   return (
//     <div className="sidebar">
//       <ul>
//         <li>
//           <NavLink
//             to="/"
//             end
//             className={({ isActive }) =>
//               isActive ? "active sidebar-link" : "sidebar-link"
//             }
//           >
//             Notes
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/Reminder"
//             className={({ isActive }) =>
//               isActive ? "active sidebar-link" : "sidebar-link"
//             }
//           >
//             Reminders
//           </NavLink>
//         </li>
//         {labelNames.length > 0 && (
//           <div className="sidebar-labels">
//             {/* <h4>Labels</h4> */}
//             {labelNames.map((label) => (
//               <li key={label} className="label-item">
//                 <NavLink
//                   to={`/label/${label}`}
//                   className={({ isActive }) =>
//                     isActive ? "active sidebar-link" : "sidebar-link"
//                   }
//                   aria-label={`view notes  for ${label}`}
//                 >
//                   {label}
//                 </NavLink>
//               </li>
//             ))}
//           </div>
//         )}
//         <li onClick={openModal} className="edit-labels">
//           Edit Labels
//         </li>
//         <li>
//           <NavLink
//             to="/Archive"
//             className={({ isActive }) =>
//               isActive ? "active sidebar-link" : "sidebar-link"
//             }
//           >
//             Archive
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/Trash"
//             className={({ isActive }) =>
//               isActive ? "active sidebar-link" : "sidebar-link"
//             }
//           >
//             Trash
//           </NavLink>
//         </li>
//         {/* {Dynamic Labels Section} */}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React,{useMemo} from "react";
import { NavLink } from "react-router-dom";
import { useSelector} from "react-redux";
// import { addLabel } from "../../features/NotesSlice";
import "./Sidebar.css";

const Sidebar = ({ openModal }) => {
  // const dispatch=useDispatch();
  const labels = useSelector((state) => (state.notes.labels)); // Convert label object keys to array
  const memoizedLabels=useMemo(()=>Object.keys(labels),[labels])

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")}>
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink to="/Reminder" className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")}>
            Reminders
          </NavLink>
        </li>
        {/* display labels */}
        {memoizedLabels.length > 0 && (
          <div className="sidebar-labels">
            {memoizedLabels.map((label) => (
              <li key={label} className="label-item">
                <NavLink to={`/label/${label}`} className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")}>
                  {label}
                </NavLink>
              </li>
            ))}
          </div>
        )}

        <li onClick={openModal} className="edit-labels">Edit Labels</li>

        <li>
          <NavLink to="/Archive" className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")}>
            Archive
          </NavLink>
        </li>
        <li>
          <NavLink to="/Trash" className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")}>
            Trash
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
