import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    content: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "white",
    },

    isPinned: {
      type: Boolean,
      default: false,
      index: true,
    },

    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },

    isTrashed: {
      type: Boolean,
      default: false,
      index: true,
    },

    labels: [
      {
        type: String,
        trim: true,
      },
    ],

    checklist: [checklistSchema],
  },
  {
    timestamps: true,
  }
);

/**
 * Compound index for better querying
 */
noteSchema.index({ user: 1, createdAt: -1 });

const Note = mongoose.model("Note", noteSchema);

export default Note;
