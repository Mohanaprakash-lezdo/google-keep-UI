// import React from 'react'

// const Home = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Home
import React from "react";
import CreateNote from "../../components/Createnote/Createnote";
import NoteList from "../../components/NoteList/NoteList";

const Home = () => {
  return (
    <div className="home-container">
      <CreateNote />
      <NoteList noteType="home" />
    </div>
  );
};

export default Home;
