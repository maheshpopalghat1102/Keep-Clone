import React, { useState } from "react";
import { FiImage, FiStar, FiX } from "react-icons/fi";
import Button from "../ui/Button";

const colors = [
  "#0f172a",
  "#1f2937",
  "#334155",
  "#1d4ed8",
  "#166534",
  "#9a3412",
];

const NoteForm = ({ onCreate }) => {
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    color: "#0f172a",
    isPinned: false,
    image: "",
  });

  const getTextColor = (hex) => {
    const value = hex.replace("#", "");
    const r = parseInt(value.substring(0, 2), 16);
    const g = parseInt(value.substring(2, 4), 16);
    const b = parseInt(value.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? "#111827" : "#f9fafb";
  };

  const textColor = getTextColor(form.color);

  const handleSubmit = () => {
    if (!form.content.trim() && !form.image) return;

    onCreate(form);
    setForm({
      title: "",
      content: "",
      color: "#0f172a",
      isPinned: false,
      image: "",
    });
    setExpanded(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: String(reader.result) }));
      setExpanded(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-6 transition"
      style={{ backgroundColor: form.color, color: textColor }}
    >
      
      {expanded && (
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full mb-2 bg-transparent focus:outline-none font-semibold"
        />
      )}

      <textarea
        placeholder="Take a note..."
        value={form.content}
        onFocus={() => setExpanded(true)}
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
        className="w-full bg-transparent resize-none focus:outline-none"
        rows={expanded ? 3 : 1}
      />

      {form.image && (
        <div className="mt-2 relative">
          <img
            src={form.image}
            alt="Note upload preview"
            className="max-h-48 w-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => setForm({ ...form, image: "" })}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white"
            aria-label="Remove image"
          >
            <FiX size={14} />
          </button>
        </div>
      )}

      {expanded && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setForm({ ...form, color })}
                className="w-5 h-5 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                aria-label={`Select note color ${color}`}
              />
            ))}
            <input
              type="color"
              value={form.color}
              onChange={(e) =>
                setForm({ ...form, color: e.target.value })
              }
              className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer"
              aria-label="Choose custom note color"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              aria-label="Upload note image"
            >
              <FiImage />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <button
              type="button"
              onClick={() =>
                setForm({ ...form, isPinned: !form.isPinned })
              }
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle pin"
            >
              <FiStar
                className={
                  form.isPinned
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-200"
                }
              />
            </button>

            <Button size="sm" onClick={handleSubmit}>
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteForm;
