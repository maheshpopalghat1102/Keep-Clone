import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/notes
 * @desc    Create new note
 * @access  Private
 */
router.post("/", protect, createNote);

/**
 * @route   GET /api/notes
 * @desc    Get all notes for logged-in user
 * @access  Private
 */
router.get("/", protect, getNotes);

/**
 * @route   GET /api/notes/:id
 * @desc    Get single note
 * @access  Private
 */
router.get("/:id", protect, getNoteById);

/**
 * @route   PUT /api/notes/:id
 * @desc    Update note
 * @access  Private
 */
router.put("/:id", protect, updateNote);

/**
 * @route   DELETE /api/notes/:id
 * @desc    Delete note
 * @access  Private
 */
router.delete("/:id", protect, deleteNote);

export default router;