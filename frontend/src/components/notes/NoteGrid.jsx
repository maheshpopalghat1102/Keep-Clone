import React from "react";
import NoteCard from "./NoteCard";

const NoteGrid = ({
  notes,
  onEdit,
  onDelete,
  onArchive,
  onTogglePin,
  archiveMode = "archive",
  showPin = true,
  showEdit = true,
}) => {
  if (!notes.length) {
    return (
      <div className="text-center py-20 text-gray-400 dark:text-gray-600">
        No notes found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onTogglePin={onTogglePin}
          archiveMode={archiveMode}
          showPin={showPin}
          showEdit={showEdit}
        />
      ))}
    </div>
  );
};

export default NoteGrid;
