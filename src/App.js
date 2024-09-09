import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import Note from './components/Note';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

function App() {
  const [notes, setNotes] = useState([
    { id: '1', text: 'Task 1' },
    { id: '2', text: 'Task 2' },
    { id: '3', text: 'Task 3' },
  ]);

  // Load notes from local storage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to local storage when they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteText) => {
    const newNote = {
      id: Date.now().toString(), // ID should be a string
      text: noteText, // Use text as the field to display
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const deleteAllNotes = () => {
    if (window.confirm('Voulez-vous vraiment supprimer toutes les notes ?')) {
      setNotes([]);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, do nothing
    const reorderedNotes = Array.from(notes);
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);
    setNotes(reorderedNotes);
  };

  return (
    <div className="App">
      <h1>Application de prise de notes</h1>
      <NoteForm addNote={addNote} />
      <button
        className="delete-all"
        onClick={deleteAllNotes}
      >
        Supprimer Toutes Les Notes
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notesList">
          {(provided) => (
            <div
              className="notes-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {notes.map((note, index) => (
                <Draggable
                  key={note.id}
                  draggableId={note.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: '5px',
                        margin: '0 0 8px 0',
                        ...provided.draggableProps.style,
                      }}
                    >
                      <Note note={note} deleteNote={deleteNote} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
