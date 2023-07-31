const express = require("express");
const {
    createNote,
    getNoteById,
    getNotesByUser,
    getNotes,
    editNote,
    deleteNote,
    getNoteByName,
} = require("../controllers/noteController");
const { protect } = require("../MiddleWares/authMiddleware");
const router = express.Router();
router.get("/all", getNotes); // Get all notes by user ID
router.get("/",protect, getNotesByUser); // Get all notes
router.get("/:id", protect, getNoteById); // Get a single note
router.get("/:title", protect, getNoteByName); // Get a single note
router.post("/create", protect, createNote); // Create a note
router.put("/:id", protect, editNote); // Edit a Note
router.delete("/:id", protect, deleteNote); // Edit a Note

module.exports = router;
