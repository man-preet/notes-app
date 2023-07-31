const Note = require("../models/noteModel");
// const asyncHandler = require("express-async-handler");

const getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
    console.log(notes.length)
};
const createNote = async (req, res) => {
    const { title, description } = req.body;

    try {
        // Create a new note using the user ID from the authenticated user
        const note = await Note.create({
            title,
            description,
            user: req.user._id,
        });

        res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
        res.status(500).json({ message: "Failed to create note", error });
    }
};
const getNoteById = async (req, res) => {
    const noteId = req.params.id;

    try {
        // Find the note by its ID and the associated user ID
        const note = await Note.findOne({ _id: noteId, user: req.user._id });

        if (!note) {
            res.status(404).json({ message: "Note not found" });
            return;
        }

        res.json({ note });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch note", error });
    }
};
const getNoteByName = async (req, res) => {
    const searchChar = req.params.name; // Use req.params.name to access the search character
    try {
      const searchRegex = new RegExp(searchChar, "i"); // Create a case-insensitive regular expression for search
  
      const notes = await Note.find({ title: { $regex: searchRegex } });
  
      res.json({ notes });
    } catch (error) {
      res.status(500).json({ message: 'Failed to search', error });
    }
  };
  

  
const getNotesByUser = async (req, res) => {
    try {
        // Find all notes with the associated user ID
        const notes = await Note.find({ user: req.user._id });
        res.json({ notes });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notes", error });
    }
};
const editNote = async (req, res) => {
    const noteId = req.params.id;
    const { title, description } = req.body;

    try {
        // Find the note by its ID and the associated user ID
        const note = await Note.findOneAndUpdate(
            { _id: noteId, user: req.user._id }, // Find the note based on noteId and associated user ID
            { title, description }, // Update the title and description with the new values
            { new: true } // Return the updated note as the result
        );

        if (!note) {
            res.status(404).json({ message: "Note not found" });
            return;
        }

        res.json({ message: "Note updated successfully", note });
    } catch (error) {
        res.status(500).json({ message: "Failed to update note", error });
    }
};
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });
        if(!note){
            res.status(404).json({message: "Note not found!"});
        }
        res.json({message:"Note deleted successfully...", note})
    } catch (error) {
        res.status(500).json({ message: "Failed to delete note ", error });
    }
};

module.exports = {
    getNotes,
    createNote,
    getNoteById,
    getNoteByName,
    getNotesByUser,
    editNote,
    deleteNote
};
