import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react';


function App() {
  const [notes, setNotes] = useState([{}])

function fetchNotes() {
  axios.get('https://fullstack-notes-imyu.onrender.com/api/notes').then(response => {
    setNotes(response.data.notes);
  }).catch(error => {
    console.error("Error fetching notes:", error);
  });
}

useEffect(() => {
  fetchNotes();
}, []);

function handleSubmit(event) {
  event.preventDefault();
  const title = event.target[0].value;
  const description = event.target[1].value;

  if (!title || !description) {
    alert("Please fill in both fields");
    return;
  }

  axios.post('https://fullstack-notes-imyu.onrender.com/api/notes', { title, description }).then(response => {
    fetchNotes(); // Refresh the notes list after adding a new note
    event.target[0].value = '';
    event.target[1].value = '';
  })}

  function handleDelete(id) {
    axios.delete(`https://fullstack-notes-imyu.onrender.com/api/notes/${id}`).then(response => {
      fetchNotes(); // Refresh the notes list after deleting a note
    }) }

    function handleEdit(id) {
      const newDescription = prompt("Enter new description:");
      if (newDescription) {
        axios.patch(`https://fullstack-notes-imyu.onrender.com/api/notes/${id}`, { description: newDescription }).then(response => {
          fetchNotes(); // Refresh the notes list after editing a note
        }) 
      }
    }
  return (
    <>
  <form onSubmit={(event) => handleSubmit(event)}>
      <input type="text" placeholder="Title" />
      <input type="text" placeholder="Description" />
      <button type="submit">Add Note</button>
    </form>
     <div className="notes">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <div className="buttons">
              <button onClick={() => handleDelete(note._id)}>Delete</button>
              <button onClick={() => handleEdit(note._id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
