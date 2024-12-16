const express = require("express");
const router = express.Router();

// Helper function to handle errors
const handleError = (res, error) => res.status(500).json({ error: error.message });

// GET /authors: Fetch all authors
router.get("/", async (req, res) => {
  const db = req.db;
  try {
    const authors = await db.all("SELECT * FROM Authors");
    res.json(authors);
  } catch (error) {
    handleError(res, error);
  }
});

// POST /authors: Add a new author
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const db = req.db;
  try {
    const result = await db.run("INSERT INTO Authors (Name) VALUES (?)", [name]);
    res.status(201).json({ authorId: result.lastID });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
