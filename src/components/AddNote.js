import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note Added Successfully" , "success");
    setNote({
        title: "",
        description: "",
        tag: "",
      })
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
value={note.title}
            required
            minLength={5}
            onChange={onChange}
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            required
            value={note.description}
            minLength={5}
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
          <input
            value={note.tag}
            onChange={onChange}
            type="text"
            name="tag"
            className="form-control"
            id="tag"
          />
        </div>

        <button type="submit" disabled={note.title.length<5 || note.description.length<5} onClick={handleClick} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
