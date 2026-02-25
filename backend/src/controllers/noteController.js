import Note from "../models/Note.js";

/**
 * @desc    Create new note
 * @route   POST /api/notes
 * @access  Private
 */
export const createNote = async (req, res, next) => {
  try {
    const { title, content, color, isPinned, image } = req.body;

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      color,
      isPinned: isPinned ?? false,
      image: image ?? "",
    });

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all notes for logged-in user
 * @route   GET /api/notes
 * @access  Private
 */
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single note
 * @route   GET /api/notes/:id
 * @access  Private
 */
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    res.json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update note
 * @route   PUT /api/notes/:id
 * @access  Private
 */
export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    note.title = req.body.title ?? note.title;
    note.content = req.body.content ?? note.content;
    note.color = req.body.color ?? note.color;
    note.image = req.body.image ?? note.image;
    note.isPinned = req.body.isPinned ?? note.isPinned;
    note.isArchived = req.body.isArchived ?? note.isArchived;
    note.isTrashed = req.body.isTrashed ?? note.isTrashed;

    const updatedNote = await note.save();

    res.json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete note
 * @route   DELETE /api/notes/:id
 * @access  Private
 */
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    await note.deleteOne();

    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
