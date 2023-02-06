import React from "react";
import AddNote from "./AddNote";
// import { useContext } from "react";
// import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";
export default function Home(props) {
  const {showAlert} = props;
  return (
    <>
    
      <Notes showAlert={showAlert}></Notes>
    </>
  );
}
