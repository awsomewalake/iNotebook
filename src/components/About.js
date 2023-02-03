import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
export default function About() {
    const a = useContext(noteContext);

  return (
    <div>
      This is About {a.name} and he is in class {a.class}
    </div>
  )
}
