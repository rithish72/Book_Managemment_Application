const express = require("express");
const router = express.Router();

// Helper function to handle errors
const handleError = (res, error) => res.status(500).json({ error: error.message });

// GET /genres: Fetch all genres
router.get("/", async (req, res) => {
  const db = req.db;
  try {
    const genres = await db.all("SELECT * FROM Genres");
    res.json(genres);
  } catch (error) {
    handleError(res, error);
  }
});

// POST /genres: Add a new genre
router.post("/", async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const db = req.db;
  try {
    const result = await db.run("INSERT INTO Genres (Name, Description) VALUES (?, ?)", [name, description]);
    res.status(201).json({ genreId: result.lastID });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
