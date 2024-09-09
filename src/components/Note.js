import React from 'react';

function Note({ note, deleteNote }) {
  return (
    <div className="note">
      <p>{note.text}</p>
      <button className='delete-single' onClick={() => deleteNote(note.id)}>Supprimer</button>
    </div>
  );
}

export default Note;
