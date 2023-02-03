// import react from "react";
import { useState } from "react";
import noteContext from "./noteContext";


const NoteState= (props)=>{
    

    const notesInitial = [
        {
          "_id": "63dbc6940173ac39a80f0dae",
          "user": "63da7cc75d9d9b1164b01792",
          "title": "First Note",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2023-02-02T14:20:04.219Z",
          "__v": 0
        },
        {
          "_id": "63dcb33dcdcf0a2e12eecf75",
          "user": "63da7cc75d9d9b1164b01792",
          "title": "Second note Note",
          "description": "Please do not wake up early",
          "tag": "personal",
          "date": "2023-02-03T07:09:49.493Z",
          "__v": 0
        },
        {
          "_id": "63dcb33dcdcf0a2e12eecf75",
          "user": "63da7cc75d9d9b1164b01792",
          "title": "Second note Note",
          "description": "Please do not wake up early",
          "tag": "personal",
          "date": "2023-02-03T07:09:49.493Z",
          "__v": 0
        },
        {
          "_id": "63dcb33dcdcf0a2e12eecf75",
          "user": "63da7cc75d9d9b1164b01792",
          "title": "Second note Note",
          "description": "Please do not wake up early",
          "tag": "personal",
          "date": "2023-02-03T07:09:49.493Z",
          "__v": 0
        },
        {
          "_id": "63dcb33dcdcf0a2e12eecf75",
          "user": "63da7cc75d9d9b1164b01792",
          "title": "Second note Note",
          "description": "Please do not wake up early",
          "tag": "personal",
          "date": "2023-02-03T07:09:49.493Z",
          "__v": 0
        },
        {
          "_id": "63dcb33dcdcf0a2e12eecf75",
          "user": "63da7cc75d9d9b1164b01792",
          "title": "Second note Note",
          "description": "Please do not wake up early",
          "tag": "personal",
          "date": "2023-02-03T07:09:49.493Z",
          "__v": 0
        },
        {
          "_id": "63dcb33dcdcf0a2e12eecf75",
          "user": "63da7cc75d9d9b1164b01792",
          "title": "Second note Note",
          "description": "Please do not wake up early",
          "tag": "personal",
          "date": "2023-02-03T07:09:49.493Z",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(notesInitial);
    return (

        <noteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
