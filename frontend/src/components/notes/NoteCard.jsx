import React from "react";
import { FiEdit2, FiTrash2, FiArchive, FiStar, FiRotateCcw } from "react-icons/fi";

const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onArchive,
  onTogglePin,
  archiveMode = "archive",
  showPin = true,
  showEdit = true,
}) => {
  const getTextColor = (hex) => {
    const value = (hex || "#0f172a").replace("#", "");
    const r = parseInt(value.substring(0, 2), 16);
    const g = parseInt(value.substring(2, 4), 16);
    const b = parseInt(value.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? "#111827" : "#f9fafb";
  };

  const textColor = getTextColor(note.color);

  return (
    <div
      className="relative bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
      style={{
        backgroundColor: note.color || "#0f172a",
        color: textColor,
      }}
    >
      {/* Pin */}
      {showPin && onTogglePin && (
        <button
          type="button"
          onClick={() => onTogglePin(note)}
          className="absolute top-3 right-3 transition"
          aria-label="Toggle pin"
        >
          <FiStar
            className={`${
              note.isPinned
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-400 hover:text-yellow-400"
            }`}
          />
        </button>
      )}

      {/* Title */}
      <h3 className="text-md font-semibold mb-2">
        {note.title}
      </h3>

      {/* Content */}
      <p className="text-sm opacity-90 line-clamp-4">
        {note.content}
      </p>

      {note.image && (
        <img
          src={note.image}
          alt={note.title || "Note image"}
          className="mt-3 w-full h-40 object-cover rounded-lg"
        />
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
        {showEdit && (
          <button type="button" onClick={() => onEdit(note)}>
            <FiEdit2 className="opacity-80 hover:opacity-100" />
          </button>
        )}
        <button type="button" onClick={() => onArchive(note)}>
          {archiveMode === "restore" ? (
            <FiRotateCcw className="opacity-80 hover:opacity-100" />
          ) : (
            <FiArchive className="opacity-80 hover:opacity-100" />
          )}
        </button>
        <button type="button" onClick={() => onDelete(note)}>
          <FiTrash2 className="opacity-80 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
