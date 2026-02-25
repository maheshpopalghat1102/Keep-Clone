/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading] = useState(false);

  /**
   * Create Note
   */
  const createNote = async (noteData) => {
    const newNote = {
      _id: Date.now().toString(),
      ...noteData,
      isPinned: false,
      isArchived: false,
    };

    setNotes((prev) => [newNote, ...prev]);
  };

  /**
   * Update Note
   */
  const updateNote = async (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
  };

  /**
   * Delete Note
   */
  const deleteNote = async (id) => {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  /**
   * Toggle Pin
   */
  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note._id === id
          ? { ...note, isPinned: !note.isPinned }
          : note
      )
    );
  };

  const value = {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
  };

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};
