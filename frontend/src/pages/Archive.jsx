import React, { useEffect, useState } from "react";
import NoteGrid from "../components/notes/NoteGrid";
import NoteEditor from "../components/notes/NoteEditor";
import { sortNotes } from "../utils/helpers";
import {
  fetchNotes,
  updateNote as updateNoteService,
} from "../services/noteService";

const Archive = ({ searchQuery = "" }) => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);

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

  const handleTrash = async (note) => {
    const shouldDelete = window.confirm("Move this archived note to Trash?");
    if (!shouldDelete) return;
    try {
      const response = await updateNoteService(note._id, {
        isTrashed: true,
        isArchived: false,
      });
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? response.data : n))
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to move note to trash");
    }
  };

  const handleUnarchive = async (note) => {
    try {
      const response = await updateNoteService(note._id, {
        isArchived: false,
      });
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? response.data : n))
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to restore note");
    }
  };

  const handleTogglePin = async (note) => {
    try {
      const response = await updateNoteService(note._id, {
        isPinned: !note.isPinned,
      });
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? response.data : n))
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update note");
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setEditorOpen(false);
    setEditingNote(null);
  };

  const handleSave = async (updatedNote) => {
    try {
      const response = await updateNoteService(updatedNote._id, updatedNote);
      setNotes((prev) =>
        prev.map((n) =>
          n._id === updatedNote._id ? response.data : n
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save note");
    }
  };

  const sortedNotes = sortNotes(notes);
  const archivedNotes = sortedNotes.filter(
    (note) => note.isArchived && !note.isTrashed
  );
  const filteredNotes = archivedNotes.filter((note) => {
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
        Archived Notes
      </h2>

      <NoteGrid
        notes={filteredNotes}
        onEdit={handleEdit}
        onDelete={handleTrash}
        onArchive={handleUnarchive}
        onTogglePin={handleTogglePin}
        archiveMode="restore"
      />

      <NoteEditor
        key={editingNote?._id || "archive-note-editor"}
        isOpen={editorOpen}
        onClose={handleCloseEditor}
        note={editingNote}
        onSave={handleSave}
      />
    </div>
  );
};

export default Archive;
