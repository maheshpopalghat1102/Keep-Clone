import React, { useEffect, useState } from "react";
import NoteForm from "../components/notes/NoteForm";
import NoteGrid from "../components/notes/NoteGrid";
import NoteEditor from "../components/notes/NoteEditor";
import { sortNotes } from "../utils/helpers";
import {
  fetchNotes,
  createNote as createNoteService,
  updateNote as updateNoteService,
} from "../services/noteService";

const Dashboard = ({ searchQuery = "" }) => {
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

  const handleCreate = async (newNote) => {
    try {
      const response = await createNoteService(newNote);
      setNotes((prev) => [response.data, ...prev]);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create note");
    }
  };

  const handleDelete = async (note) => {
    const shouldDelete = window.confirm("Move this note to Trash?");
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

  const handleArchive = async (note) => {
    try {
      const response = await updateNoteService(note._id, {
        isArchived: true,
        isTrashed: false,
      });
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? response.data : n))
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to archive note");
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
  const activeNotes = sortedNotes.filter(
    (note) => !note.isArchived && !note.isTrashed
  );
  const filteredNotes = activeNotes.filter((note) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      note.title?.toLowerCase().includes(q) ||
      note.content?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto">
      <NoteForm onCreate={handleCreate} />

      <NoteGrid
        notes={filteredNotes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onTogglePin={handleTogglePin}
        archiveMode="archive"
      />

      <NoteEditor
        key={editingNote?._id || "note-editor"}
        isOpen={editorOpen}
        onClose={handleCloseEditor}
        note={editingNote}
        onSave={handleSave}
      />
    </div>
  );
};

export default Dashboard;
