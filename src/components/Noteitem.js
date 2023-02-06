import React from "react";
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const {notes, deleteNote} = context;
  return (
    <>
      <div className="col-md-3 my-3">
        {/* {note.title} */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);
    props.showAlert("Note Deleted Successfully" , "success");
  }}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);
  }}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
