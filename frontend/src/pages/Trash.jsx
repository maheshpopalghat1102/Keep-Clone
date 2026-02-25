import React, { useEffect, useState } from "react";
import NoteGrid from "../components/notes/NoteGrid";
import { sortNotes } from "../utils/helpers";
import {
  fetchNotes,
  updateNote as updateNoteService,
  deleteNote as deleteNoteService,
} from "../services/noteService";

const Trash = ({ searchQuery = "" }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetchNotes();
        setNotes(response.data || []);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to load notes");
      }
    };

    loadNotes();
  }, []);

  const handlePermanentDelete = async (note) => {
    const shouldDelete = window.confirm(
      "Delete this note permanently? This cannot be undone."
    );
    if (!shouldDelete) return;
    try {
      await deleteNoteService(note._id);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete note");
    }
  };

  const handleRestore = async (note) => {
    try {
      const response = await updateNoteService(note._id, {
        isTrashed: false,
        isArchived: false,
      });
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? response.data : n))
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to restore note");
    }
  };

  const sortedNotes = sortNotes(notes);
  const trashedNotes = sortedNotes.filter((note) => note.isTrashed);
  const filteredNotes = trashedNotes.filter((note) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      note.title?.toLowerCase().includes(q) ||
      note.content?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Trash
      </h2>

      <NoteGrid
        notes={filteredNotes}
        onEdit={() => {}}
        onDelete={handlePermanentDelete}
        onArchive={handleRestore}
        onTogglePin={null}
        archiveMode="restore"
        showPin={false}
        showEdit={false}
      />
    </div>
  );
};

export default Trash;
