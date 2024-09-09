import React, { useState } from 'react';

function NoteForm({ addNote }) {
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      addNote(noteText);
      setNoteText(''); // Clear the input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Ajouter une nouvelle note..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button type="submit">Ajouter une note</button>
    </form>
  );
}

export default NoteForm;
