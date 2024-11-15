require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.connectionString);

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authentication } = require("./utilities");

const Note = require("./models/note.model");

app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ data: "hello world" });
});

app.get("/api/notes/all", async (req, res) => {
  try {
    const notes = await Note.find().sort({ isPinned: -1, date: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve notes" });
  }
});

app.get("/api/notes/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ]
    }).sort({ isPinned: -1, date: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to search notes" });
  }
});

app.post("/api/note/create", async (req, res) => {
  const { title, content, tags = [] } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const newNote = new Note({
      title,
      content,
      isPinned: false,
      tags,
      date: new Date(),
    });

    const createdNote = await newNote.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

app.put("/api/note/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, isPinned } = req.body;

  if (!title && !content && !tags && isPinned === undefined) {
    return res.status(400).json({ error: "At least one field (title, content, tags, isPinned) is required to update" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, tags, isPinned },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

app.delete("/api/note/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

app.listen(3000);

module.exports = app;
