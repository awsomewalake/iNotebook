import React, { useEffect, useRef } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const ref = useRef(null);
  let history = useNavigate();
  const refClose = useRef(null);
  const { notes, getAllNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getAllNotes();
    }
    else{
      history('/login'); 
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote)
  };

  const [note,setNote] = useState({title:'', description:"", tag:"default"});

  const handleClick = (e) => {
    editNote(note._id , note.title, note.description , note.tag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully" , "success");    
    // addNote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="row my-3">
      <AddNote showAlert={props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input value={note.title}
                  required minLength={5}
                    type="text"
                    onChange={onChange}
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                  />
                  {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input value={note.description}
                    required minLength={5}
                    onChange={onChange}
                    type="text"
                    name="description"
                    className="form-control"
                    id="Description"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input value={note.tag}
                    
                    onChange={onChange}
                    type="text"
                    name="tag"
                    className="form-control"
                    id="tag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      <div className="container mx-2">{notes.length===0 && 'No Notes to Display'}</div>
      {notes.map((note) => {
        return <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />;
      })}
    </div>
  );
};

export default Notes;
