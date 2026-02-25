import React, { useState } from "react";
import { FiImage, FiX } from "react-icons/fi";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const colors = [
  "#0f172a",
  "#1f2937",
  "#334155",
  "#1d4ed8",
  "#166534",
  "#9a3412",
];

const NoteEditor = ({ isOpen, onClose, note, onSave }) => {
  const defaultForm = {
    title: "",
    content: "",
    color: "#0f172a",
    image: "",
  };

  const [form, setForm] = useState({
    ...(note || defaultForm),
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="space-y-4 rounded-xl p-3"
        style={{ backgroundColor: form.color, color: textColor }}
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full text-lg font-semibold bg-transparent focus:outline-none"
        />

        <textarea
          name="content"
          placeholder="Write your note..."
          value={form.content}
          onChange={handleChange}
          rows={5}
          className="w-full bg-transparent resize-none focus:outline-none"
        />

        {form.image && (
          <div className="relative">
            <img
              src={form.image}
              alt="Note preview"
              className="max-h-56 w-full object-cover rounded-lg"
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

        {/* Color Picker */}
        <div className="flex gap-2 items-center flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setForm({ ...form, color })}
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
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
          <label
            className="p-2 rounded-lg hover:bg-black/10 transition cursor-pointer"
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
        </div>

        <div className="flex justify-end gap-2 sm:gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteEditor;
